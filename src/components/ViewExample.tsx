import {
    ComponentDef, Component
} from '../types';


const ViewExample: ComponentDef = {
    name: 'ViewExample',
    // eslint-disable-next-line react/display-name
    view: ( { model, h }: Component ) => <div>Hello {model.name}!</div>,
    init: () => ( {
        name: 'Monster Hunter'
    } )
};

export default ViewExample;
