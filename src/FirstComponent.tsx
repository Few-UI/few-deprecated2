import React from 'react';

import {
    Component
} from './types';

const FirstComponent: Component = {
    init: () => ( {
        name: 'MonsterHunter'
    } ),
    // eslint-disable-next-line react/display-name
    view: model => <div>Hello {model.name}</div>,
    name: 'FirstComponent'
};


const createReactComponent: { ( component: Component ): { (): JSX.Element } } = component => {
    const renderFn = (): JSX.Element => {
        // react part
        const [ model ] = React.useState( component.init );

        return component.view( model );
    };
    renderFn.displayName = component.name;
    return renderFn;
};

export default createReactComponent( FirstComponent );
