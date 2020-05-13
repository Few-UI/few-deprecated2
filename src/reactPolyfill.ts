import { createElement, useState } from 'react';

import {
    Component
} from './types';

export const createComponent: { ( component: Component ): { (): JSX.Element } } = component => {
    const renderFn = (): JSX.Element => {
        const [ model ] = useState( component.init );

        return component.view( model, createElement );
    };
    renderFn.displayName = component.name;
    return renderFn;
};

export const h = createElement;

