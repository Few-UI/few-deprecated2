import { createElement, useState } from 'react';

import {
    Component
} from './types';

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
export const createComponent: { ( component: Component ): { (): JSX.Element } } = component => {
    const renderFn = (): JSX.Element => {
        const [ model ] = useState( component.init );

        return component.view( model, createElement );
    };
    renderFn.displayName = component.name;
    return renderFn;
};


