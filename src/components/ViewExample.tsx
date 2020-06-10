import { ComponentDef } from '../types';

export default {
    name: 'ViewExample',
    view: h => ( { model } ): JSX.Element => <div>Hello {model.name}!</div>,
    init: () => ( {
        name: 'Monster Hunter'
    } )
} as ComponentDef;
