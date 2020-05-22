import { createElement, useState, ReactPropTypes, ReactNode } from 'react';

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
 * create platform specific component from few component
 * @param component few component
 * @returns platform specific component
 */
export function createComponent( component: ComponentDef ): { (): JSX.Element } {
    const renderFn = (): JSX.Element => {
        const [ model, setState ] = useState( component.init );

        const dispatch = ( path, value ): void => {
            lodashSet( model, path, value );
            setState( { ...model } );
        };

        return component.view( { model, dispatch, h: polyfill.createElement } );
    };
    renderFn.displayName = component.name;
    return renderFn;
}

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
export const h = ( type: string | ComponentDef, props?: any | null, ...children: ReactNode[] ): JSX.Element => {
    if( isComponentDef( type ) ) {
        return createElement( polyfill.createComponent( type ), props, children );
    }
    return createElement( type, props, children );
};

polyfill.createComponent = createComponent;
polyfill.createElement = h;


