import {
    ComponentDef,
    Component
} from '../types';

const ThirdExample: ComponentDef = {
    name: 'ThirdExample',
    // h( 'div', null, 'current number: ', model.name ) is working too
    // eslint-disable-next-line react/display-name
    view: ( { model, dispatch, h }: Component ) =>
        h( 'div', null, [
            h( 'div', null, [
                'Hello ',
                model.name,
                '!'
            ] ),
            h( 'button', {
                onClick: (): void => dispatch( 'name', 'Monster Hunter' )
            }, [
                'set name'
            ] )
        ] ),
    init: () => ( {} )
};

export default ThirdExample;
