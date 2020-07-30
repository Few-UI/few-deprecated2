import type {
    H,
    App,
    Ref,
    Props,
    Component,
    ComponentDef,
    DispatchInput,
    CreateAppFunction
} from './types';

import {
    createElement,
    useEffect,
    useRef,
    useState,
    Fragment
} from 'react';

import store from './store';

import ReactDOM from 'react-dom';

import lodashSet from 'lodash/set';

import {
    AsyncH,
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
const h = ( type: string | ComponentDef, props?: Props | null, ...children: React.ReactNode[] ): JSX.Element => {
    if ( !type ) {
        return createElement( Fragment, props, ...children );
    } else if ( isComponentDef( type ) ) {
        if ( !type._compiled || !type._compiled.react ) {
            type._compiled = {
                ...type._compiled,
                react: polyfill.createComponent( type )
            };
        }
        return createElement( type._compiled.react, props, ...children );
    }
    return createElement( type, props, ...children );
};
h.Fragment = Fragment;
h.await = ( fn: Function ): JSX.Element => {
    return h( AsyncH, { fn } );
};

/**
 * create platform specific component from few component
 * @param componentDef few component
 * @returns platform specific component
 */
export function createComponent( componentDef: ComponentDef ): { ( props: Props ): JSX.Element } {
    // we can do better bindings later
    const renderFn = componentDef.view( polyfill.createElement as H );

    const RenderFn = ( props: Props ): JSX.Element => {
        const initPromise = useRef( null );

        const [ vm, setState ] = useState( () => {
            const model = componentDef.init ? componentDef.init( { props } ) : {};
            if ( isPromise( model ) ) {
                initPromise.current = model;
                return {
                    model: {}
                };
            }
            return {
                model
            };
        } );

        const dispatch = store.createDispatch( ( { path, value }: DispatchInput ): void => {
            lodashSet( vm.model, path, value );
            setState( { ...vm } );
        } );

        const component: Component = {
            model: vm.model,
            dispatch,
            ref: ( ( path?: string ) => ( el: HTMLElement ): void => {
                component.ref[path || 'el'] = el;
            } ) as Ref,
            props,
            children: props && props.children
        };

        if ( componentDef.actions ) {
            component.actions = {};
            Object.entries( componentDef.actions ).forEach( ( [ key, value ] ) => {
                component.actions[key] = value.bind( null, component );
            } );
        }

        // async init
        // https://stackoverflow.com/questions/49906437/how-to-cancel-a-fetch-on-componentwillunmount
        useEffect( () => {
            if ( initPromise.current ) {
                // all API be consistent
                Promise.resolve( initPromise.current ).then( model =>
                    // do Object.assign for mutation
                    setState( v => ( ( Object.assign( v.model, model ), { ...v } ) ) )
                    // mount after async init
                ).then( () => {
                    componentDef.mount && componentDef.mount( component );
                } );
            } else {
                componentDef.mount && componentDef.mount( component );
            }

            return (): void => {
                componentDef.unmount && componentDef.unmount( component );
            };
        }, [] );


        // watchers
        const watching = useRef( [] );
        useEffect( () => {
            if ( componentDef.watchers ) {
                const watcherRes = componentDef.watchers( component );
                const lastRes = watching.current;
                watcherRes.forEach( ( curr, idx ) => {
                    const isDefined = lastRes.length > 0;
                    const last = lastRes.length > idx ? lastRes[idx] : undefined;
                    if ( !isDefined || last.watch !== curr.watch ) {
                        curr.action();
                    }
                } );
                watching.current = watcherRes;
            }
        } );

        return renderFn( component );
    };
    RenderFn.displayName = componentDef.name;
    return RenderFn;
}

export const createApp: CreateAppFunction = componentDef => {
    const component = createElement( createComponent( componentDef ) );
    const app: App = {
        mount: ( elem: HTMLElement ) => ( ( ReactDOM.render( component, elem ), app ) ),
        unmount: ( elem: HTMLElement ) => ( ( ReactDOM.unmountComponentAtNode( elem ), app ) )
    };
    return app;
};

polyfill.createComponent = createComponent;
polyfill.createElement = h;


