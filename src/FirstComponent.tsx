import React from 'react';

import {
    View,
    Model,
    Component
} from './types';

const FirstComponent: Component = () => {
    // view
    const view: View = model => <div>Hello {model.name}!</div>;

    // model
    const model: Model = {
        name: 'Monster Hunter'
    };

    // create component
    return view( model );
};

export default FirstComponent;
