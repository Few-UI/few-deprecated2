import {
    App,
    Model,
    Component,
    ComponentDef,
    CreateAppFunction
} from './types';

import {
    createElement,
    useEffect,
    useRef,
    useState
} from 'react';

import ReactDOM from 'react-dom';

import lodashSet from 'lodash/set';

import {
    isPromise,
    isComponentDef
} from './utils';
import { watch } from 'fs';

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
const h = ( type: string | ComponentDef, props?: React.Attributes | null, ...children: React.ReactNode[] ): JSX.Element => {
    if ( isComponentDef( type ) ) {
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

/**
 * create platform specific component from few component
 * @param componentDef few component
 * @returns platform specific component
 */
export function createComponent( componentDef: ComponentDef ): { ( props: React.Attributes ): JSX.Element } {
    const RenderFn = ( props: React.Attributes ): JSX.Element => {
        const initPromise = useRef( null );

        const [ vm, setState ] = useState( () => {
            const model = componentDef.init();
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


        const dispatch = ( path: string, value: unknown ): void => {
            lodashSet( vm.model, path, value );
            setState( { ...vm } );
        };

        const component: Component = {
            model: vm.model,
            dispatch,
            props,
            h: polyfill.createElement
        };

        if ( componentDef.actions ) {
            component.actions = {};
            Object.entries( componentDef.actions ).forEach( ( [ key, value ] ) => {
                component.actions[key] = value.bind( null, component );
            } );
        }

        // async init
        useEffect( () => {
            if ( initPromise.current ) {
                Promise.resolve( initPromise.current ).then( model => {
                    vm.model = model as Model;
                    setState( { ...vm } );
                } );
            }
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

        // we can do better bindings later
        const renderFn = componentDef.view( polyfill.createElement );

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


