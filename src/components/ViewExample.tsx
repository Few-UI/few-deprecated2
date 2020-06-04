import {
    ComponentDef
} from '../types';


const ViewExample: ComponentDef = {
    name: 'ViewExample',
    // eslint-disable-next-line react/display-name
    view: h => ( props, { model } ) => <div>Hello {model.name}!</div>,
    init: () => ( {
        name: 'Monster Hunter'
    } )
};

export default ViewExample;
