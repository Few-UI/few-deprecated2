import {
    ComponentDef
} from '../../src/types';

const ThirdExample: ComponentDef = {
    name: 'ThirdExample',
    // h( 'div', null, 'current number: ', model.name ) is working too
    // eslint-disable-next-line react/display-name
    view: ( { model, dispatch, h } ) =>
        h( 'div', null, [
            h( 'div', null, [
                'Hello ',
                model.name,
                '!'
            ] ),
            h( 'button', {
                onClick: () => dispatch( 'name', 'Monster Hunter' )
            }, [
                'set name'
            ] )
        ] ),
    // the name key dosen't exist in init data
    init: () => ( {} )
};

export default ThirdExample;
