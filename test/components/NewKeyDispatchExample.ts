import {
    ComponentDef
} from '../../src/types';

const NewKeyDispatchExample: ComponentDef = {
    name: 'NewKeyDispatchExample',
    // h( 'div', null, 'current number: ', model.name ) is working too
    view: h => ( _, { model, dispatch } ): JSX.Element =>
        h( 'div', null,
            h( 'div', null,
                'Hello ',
                model.name,
                '!'
            ),
            h( 'button', {
                onClick: () => dispatch( 'name', 'Monster Hunter' )
            },
                'set name'
            )
        ),
    // the name key dosen't exist in init data
    init: () => ( {} )
};

export default NewKeyDispatchExample;
