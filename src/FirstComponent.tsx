import {
    Component
} from './types';


const FirstComponent: Component = {
    name: 'FirstComponent',
    // eslint-disable-next-line react/display-name
    view: ( model, h ) => <div>Hello {model.name}!!</div>,
    init: () => ( {
        name: 'Monster Hunter'
    } )
};

export default FirstComponent;
