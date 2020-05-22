// vue
// https://github.com/vuejs/vue-cli/issues/1198
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
/*
import App from './App.vue';
*/

import { h as createElement, reactive } from 'vue';

import Vue from 'vue/dist/vue';
import {
    ComponentDef
} from './types';


import lodashSet from 'lodash-es/set';

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
export const h = ( type: string | ComponentDef, props?: Vue.VNodeProps | null, ...children: Vue.VNodeArrayChildren ): Vue.VNode => {
    if( isComponentDef( type ) ) {
        return createElement( polyfill.createComponent( type ), props, children );
    }
    return createElement( type, props, children );
};

/**
 * create platform specific component from few component
 * @param component few component
 * @returns platform specific component
 */
export const createComponent = ( component: ComponentDef ): Vue.Component => ( {
    // in Vue render is deined as loose as 'Function'
    // in typeScript by default JSX returns JSX.Element
    // so here even for Vue we use JSX.Element
    render: ( vm ): JSX.Element => component.view( vm ),
    setup: (): object => {
        const vm = {
            model: reactive( component.init() ),
            dispatch: ( path, value ): void => {
                lodashSet( vm.model, path, value );
            },
            h: polyfill.createElement
        };
        return vm;
    }
} );

polyfill.createComponent = createComponent;
polyfill.createElement = h;


