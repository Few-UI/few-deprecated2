import React from 'react';

const FirstComponent = (): JSX.Element => {
    // template
    const renderFn: { ( model: { [key: string]: object | string } ): JSX.Element} = model => <div>Hello {model.name}!</div>;

    // model
    const model = {
        name: 'Monster Hunter'
    };

    // create component
    return renderFn( model );
};

export default FirstComponent;
