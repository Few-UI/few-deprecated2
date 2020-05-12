import React from 'react';

import {
    Component
} from './types';

export const createComponent: { ( component: Component ): { (): JSX.Element } } = component => {
    const renderFn = (): JSX.Element => {
        const [ model ] = React.useState( component.init );

        return component.view( model );
    };
    renderFn.displayName = component.name;
    return renderFn;
};

export const h = React.createElement;

