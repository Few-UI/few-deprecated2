import {
    ComponentDef
} from '../types';


const ViewExample: ComponentDef = {
    name: 'ViewExample',
    view: h => ( _, { model } ): JSX.Element => <div>Hello {model.name}!</div>,
    init: () => ( {
        name: 'Monster Hunter'
    } )
};

export default ViewExample;
