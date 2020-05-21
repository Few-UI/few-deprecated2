import { createElement, useState } from 'react';

import {
    ComponentDef
} from './types';

import lodashSet from 'lodash-es/set';

/**
 * Virtual DOM API as h
 *
 * @param type component type
 * @param props component properties
 * @param children child components
 * @returns virtual DOM component
 */
export const h = createElement;

/**
 * create platform specific component from few component
 * @param component few component
 * @returns platform specific component
 */
export const createComponent: { ( component: ComponentDef ): { (): JSX.Element } } = component => {
    const renderFn = (): JSX.Element => {
        const [ model, setState ] = useState( component.init );

        const dispatch = ( path, value ): void => {
            lodashSet( model, path, value );
            setState( { ...model } );
        };

        return component.view( { model, dispatch, createElement } );
    };
    renderFn.displayName = component.name;
    return renderFn;
};


