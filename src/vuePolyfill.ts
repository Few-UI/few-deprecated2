// vue
// https://github.com/vuejs/vue-cli/issues/1198
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
/*
import App from './App.vue';
*/

import {
    h as createElement,
    createApp as createVueApp,
    reactive
} from 'vue';

import Vue from 'vue/dist/vue';
import {
    Component,
    ComponentDef
} from './types';


import lodashSet from 'lodash-es/set';


// resolve cross reference
const polyfill = {
    createElement: null,
    createComponent: null
};

/**
 * check if type is ComponentDef. use ComponentDef.init() to detect
 * @param type component type
 * @returns true if type is component def.
 */
const isComponentDef = ( type: string | ComponentDef ): type is ComponentDef => {
    const componeDef = type as ComponentDef;
    return typeof componeDef.init === 'function';
};

/**
 * Virtual DOM API as h
 *
 * bridge tsc jsx to vue3
 * https://www.ctolib.com/topics-143214.html
 *
 * @param type component type
 * @param props component properties
 * @param children child components
 * @returns virtual DOM component
 */
const h = ( type: string | ComponentDef, props?: Vue.VNodeProps | null, ...children: Vue.VNodeArrayChildren ): Vue.VNode => {
    if( isComponentDef( type ) ) {
        return createElement( polyfill.createComponent( type ), props, children );
    }
    return createElement( type, props, children );
};

/**
 * create platform specific component from few component
 * @param componentDef few component
 * @returns platform specific component
 */
export const createComponent = ( componentDef: ComponentDef ): Vue.Component => ( {
    // in Vue render is deined as loose as 'Function'
    // in typeScript by default JSX returns JSX.Element
    // so here even for Vue we use JSX.Element
    render: ( component ): JSX.Element => componentDef.view( component ),
    setup: (): object => {
        const component: Component = {
            model: reactive( componentDef.init() ),
            dispatch: ( path, value ): void => {
                lodashSet( component.model, path, value );
            },
            h: polyfill.createElement
        };

        if( componentDef.actions ) {
            component.actions = {};
            Object.entries( componentDef.actions ).forEach( ( [ key, value ] ) => {
                component.actions[key] = value.bind( null, component );
            } );
        }

        return component;
    }
} );

/**
 * Create app for specific component def
 * @param componentDef component definition
 * @returns web app object
 */
export const createApp = ( componentDef: ComponentDef ): Vue.App => {
    return createVueApp( createComponent( componentDef ) );
};

polyfill.createComponent = createComponent;
polyfill.createElement = h;

