import {
    createElement,
    useEffect,
    useRef,
    useState
} from 'react';

import {
    App,
    Model,
    Component,
    ComponentDef,
    CreateAppFunction
} from './types';


import ReactDOM from 'react-dom';

import lodashSet from 'lodash/set';

// resolve cross reference
const polyfill: {
    createComponent?: Function;
    createElement?: Function;
} = {};

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
 * check if type is ComponentDef. use ComponentDef.init() to detect
 * @param value component type
 * @returns true if type is promise.
 */
const isPromise = ( value: unknown ): value is Promise<unknown> => {
    const val = value as Promise<unknown>;
    return val && val.then && typeof val.then === 'function';
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
const h = ( type: string | ComponentDef, props?: React.Attributes | null, ...children: React.ReactNode[] ): JSX.Element => {
    if( isComponentDef( type ) ) {
        if( !type._compiled || !type._compiled.react ) {
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
    const renderFn = ( props: React.Attributes ): JSX.Element => {
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

        useEffect( ()=> {
            if( initPromise.current ) {
                Promise.resolve( initPromise.current ).then( model => {
                    vm.model = model as Model;
                    setState( { ...vm } );
                } );
            }
        }, [] );

        const dispatch = ( path: string, value: unknown ): void => {
            lodashSet( vm.model, path, value );
            setState( { ...vm } );
        };

        const component: Component = { model: vm.model, dispatch, h: polyfill.createElement };

        if( componentDef.actions ) {
            component.actions = {};
            Object.entries( componentDef.actions ).forEach( ( [ key, value ] ) => {
                component.actions[key] = value.bind( null, component );
            } );
        }

        // we can do better bindings later
        const renderFn = componentDef.view( polyfill.createElement );

        return renderFn( props, component );
    };
    renderFn.displayName = componentDef.name;
    return renderFn;
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


