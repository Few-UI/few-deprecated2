// vue
// https://github.com/vuejs/vue-cli/issues/1198
// https://learnvue.co/2020/03/how-to-use-lifecycle-hooks-in-vue3/

/*
import App from './App.vue';
*/

import {
    App,
    Ref,
    Component,
    Watcher,
    ComponentDef,
    DispatchInput,
    CreateAppFunction
} from './types';

import {
    h as createElement,
    createApp as createVueApp,
    reactive,
    onMounted,
    onUpdated,
    onBeforeUnmount,
    watch,
    Fragment,

    // types
    VNodeArrayChildren,
    VNode,
    Component as VueComponent,
    SetupContext
} from 'vue';

import lodashSet from 'lodash/set';

import {
    isPromise,
    isComponentDef
} from './utils';

import store from './store';

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
const h = ( type: string | ComponentDef, props?: { [key: string]: any } | null, ...children: VNodeArrayChildren ): VNode => {
    // align on input behavior with react
    if ( type === 'input' && props.onChange ) {
        props.onInput = props.onChange;
        delete props.onChange;
    }

    // [Vue warn]: Non-function value encountered for default slot. Prefer function slots for better performance.
    // set children to null if children === []
    children =  children.length > 0  ? children : null;

    if ( !type ) {
        return createElement( Fragment, props, children );
    } else if ( isComponentDef( type ) ) {
        if ( !type._compiled || !type._compiled.vue ) {
            type._compiled = {
                ...type._compiled,
                vue: polyfill.createComponent( type )
            };
        }
        return createElement( type._compiled.vue, props, children );
    }
    return createElement( type, props, children );
};
h.Fragment = Fragment;

/**
 * create platform specific component from few component
 * @param componentDef few component
 * @returns platform specific component
 */
export const createComponent = ( componentDef: ComponentDef ): VueComponent => ( {
    name: componentDef.name,
    inheritAttrs: false,
    // in Vue render is deined as loose as 'Function'
    // in typeScript by default JSX returns JSX.Element
    // so here even for Vue we use JSX.Element
    /*
    render: ( component: Component & Vue.ComponentOptions ): JSX.Element => {
        return componentDef.view( polyfill.createElement )( component );
    },
    */
    /*
    when u declare 'props', then it can be accessed as input of setup function. Otherwise it is attrs
    props: {
        firstName: String
    },
    */
    setup: ( _: never, context: SetupContext ): object => {
        const model = componentDef.init ? componentDef.init( { props: context.attrs } ) : {};

        const watching = {
            current: [] as Watcher[]
        };

        const updateWatchers = ( component: Component ): void => {
            if ( componentDef.watchers ) {
                const watcherRes = componentDef.watchers( component );
                const lastRes = watching.current;
                watching.current = watcherRes;
                watcherRes.forEach( ( curr, idx ) => {
                    const isDefined = lastRes.length > 0;
                    const last = lastRes.length > idx ? lastRes[idx] : undefined;
                    if ( !isDefined || last.watch !== curr.watch ) {
                        curr.action();
                    }
                } );
            }
        };

        const component: Component = {
            model: reactive( isPromise( model ) ? {} : model ),
            dispatch: store.createDispatch( ( { path, value }: DispatchInput ): void => {
                lodashSet( component.model, path, value );
            } ),
            ref: ( ( path?: string ) => ( el: HTMLElement ): void => {
                component.ref[path || 'el'] = el;
            } ) as Ref,
            props: context.attrs,
            h: polyfill.createElement
        };

        if ( componentDef.actions ) {
            component.actions = {};
            Object.entries( componentDef.actions ).forEach( ( [ key, value ] ) => {
                component.actions[key] = value.bind( null, component );
            } );
        }

        onMounted( () => {
            if ( isPromise( model ) ) {
                Promise.resolve( model ).then( model => {
                    Object.assign( component.model, model );
                } ).then( () => {
                    componentDef.mount && componentDef.mount( component );
                } );
            } else {
                componentDef.mount && componentDef.mount( component );
            }

            // for onmount/init
            updateWatchers( component );
        } );

        onBeforeUnmount( () => componentDef.unmount && componentDef.unmount( component ) );

        // for model change to trigger digest or parent attr direct change
        onUpdated( () => {
            updateWatchers( component );
        } );

        // for model change not triggert digest or change inside parent attr
        watch( () => {
            /*
            if( component.props.prop && component.props.prop.color ) {
                return component.props.prop.color;
            }
            */
            return componentDef.watchers && componentDef.watchers( component );
        }, ( /*oldVal, newVal*/ ) => {
            updateWatchers( component );
            // console.log( `${oldVal} => ${newVal}` );
        } );

        const renderFn = componentDef.view( polyfill.createElement );

        // return component;
        return (): JSX.Element => {
            component.children = context.slots.default && context.slots.default();
            return renderFn( component );
        };
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

