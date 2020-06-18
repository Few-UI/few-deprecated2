import { ComponentDef } from '../types';

export default {
    name: 'ViewExample',
    view: h => ( { model } ): JSX.Element =>
        <>
            <div>Hello </div>
            <div>{model.name}!</div>
        </>,
    init: () => ( {
        name: 'Monster Hunter'
    } )
} as ComponentDef;
