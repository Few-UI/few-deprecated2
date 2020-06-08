// vue
// https://github.com/vuejs/vue-cli/issues/1198
// https://learnvue.co/2020/03/how-to-use-lifecycle-hooks-in-vue3/
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
/*
import App from './App.vue';
*/

import Vue from 'vue/dist/vue';
import {
    App,
    Component,
    ComponentDef,
    CreateAppFunction
} from './types';

import {
    h as createElement,
    createApp as createVueApp,
    reactive,
    onMounted
} from 'vue';

import lodashSet from 'lodash/set';

import {
    isPromise,
    isComponentDef
} from './utils';

// resolve cross reference
const polyfill: {
    createComponent?: Function;
    createElement?: Function;
} = {};

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
    // align on input behavior with react
    if( type === 'input' && props.onChange ) {
        props.onInput = props.onChange;
        delete props.onChange;
    }

    if ( isComponentDef( type ) ) {
        if( !type._compiled || !type._compiled.vue ) {
            type._compiled = {
                ...type._compiled,
                vue: polyfill.createComponent( type )
            };
        }
        return createElement( type._compiled.vue, props, children );
    }
    return createElement( type, props, children );
};

/**
 * create platform specific component from few component
 * @param componentDef few component
 * @returns platform specific component
 */
export const createComponent = ( componentDef: ComponentDef ): Vue.Component => ( {
    name: componentDef.name,
    // in Vue render is deined as loose as 'Function'
    // in typeScript by default JSX returns JSX.Element
    // so here even for Vue we use JSX.Element
    render: ( component: Component & Vue.ComponentOptions ): JSX.Element => {
        return componentDef.view( polyfill.createElement )( component.$attrs, component );
    },
    setup: (): object => {
        const model = componentDef.init();
        const component: Component = {
            model: reactive( isPromise( model ) ? {} : model ),
            dispatch: ( path: string, value: unknown ): void => {
                lodashSet( component.model, path, value );
            },
            h: polyfill.createElement
        };


        if ( componentDef.actions ) {
            component.actions = {};
            Object.entries( componentDef.actions ).forEach( ( [ key, value ] ) => {
                component.actions[key] = value.bind( null, component );
            } );
        }

        onMounted( () => {
            if( isPromise( model ) ) {
                Promise.resolve( model ).then( model =>{
                    Object.assign( component.model, model );
                } );
            }
        } );

        return component;
    }
} );

/**
 * Create app for specific component def
 * @param componentDef component definition
 * @returns web app object
 */
export const createApp: CreateAppFunction = componentDef => {
    const vueApp = createVueApp( createComponent( componentDef ) );
    const app: App = {
        mount: ( elem: HTMLElement ) => ( ( vueApp.mount( elem ), app ) ),
        unmount: ( elem: HTMLElement ) => ( ( vueApp.unmount( elem ), app ) )
    };
    return app;
};

polyfill.createComponent = createComponent;
polyfill.createElement = h;

