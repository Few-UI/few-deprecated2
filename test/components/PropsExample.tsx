import { ComponentDef } from '../../src/types';

const PropWidget = {
    name: 'PropWidget',
    view: h => ( { props: { firstName, lastName } } ): JSX.Element =>
        <div>Hello {firstName || 'Jane'} {lastName || 'Dole'}!</div>,
    init: () => ( {} )
} as ComponentDef;

export default {
    name: 'PropExample',
    init: () => ( {
        value: 7
    } ),
    // elm style of upedate
    actions: {
        plusOne: ( { model, dispatch } ) => void dispatch( { path: 'value', value: model.value as number + 1 } )
    },
    view: h => ( { model, actions } ): JSX.Element =>
        h( 'div', null,
            h( PropWidget, {
                firstName: 'value',
                lastName: model.value.toString()
            } ),
            h( 'button', {
                id: 'button',
                onClick: actions.plusOne
            }, '+1' )
        )
} as ComponentDef;

