import { ComponentDef } from '../types';
import { defineComponent } from '../utils';

export default defineComponent( {
    name: 'ViewExample',
    view: h => ( { model } ): JSX.Element => <div>Hello {model.name}!</div>,
    init: () => ( {
        name: 'Monster Hunter'
    } )
} as ComponentDef );
