import { ComponentDef } from '../../src/types';

export default {
    name: 'NewKeyDispatchExample',
    // h( 'div', null, 'current number: ', model.name ) is working too
    view: h => ( { model, dispatch } ): JSX.Element =>
        h( 'div', null,
            h( 'div', null,
                'Hello ',
                model.name,
                '!'
            ),
            h( 'button', {
                onClick: () => dispatch( { path: 'name', value: 'Monster Hunter' } )
            },
                'set name'
            )
        ),
    // the name key dosen't exist in init data
    init: () => ( {} )
} as ComponentDef;
