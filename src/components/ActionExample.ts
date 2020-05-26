import {
    Component,
    ComponentDef
} from '../types';


const UpdateExample: ComponentDef = {
    name: 'UpdateExample',
    init: () => ( {
        value: 7
    } ),
    // elm style of upedate
    actions: {
        plusOne: ( component: Component ): void => {
            const { model, dispatch } = component;
            dispatch( 'value', model.value as number + 1 );
        }
    },
    // h( 'div', null, 'current number: ', model.name ) is working too
    view: ( { model, actions, h } ) =>
        h( 'div', null, [
            h( 'div', null, [
                'current number: ',
                model.value
            ] ),
            h( 'button', {
                onClick: actions.plusOne
            }, [
                '+1'
            ] )
        ] )
};

export default UpdateExample;
