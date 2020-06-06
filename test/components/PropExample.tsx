import { ComponentDef } from '../../src/types';

const PropWidget = {
    name: 'PropWidget',
    view: h => ( { firstName, lastName }: { [key: string]: string } ): JSX.Element =>
        <div>Hello {firstName || 'Jane'} {lastName || 'Dole'}!</div>,
    init: () => ( {} )
} as ComponentDef;

export default {
    name: 'PropEample',
    init: () => ( {
        value: 7
    } ),
    // elm style of upedate
    actions: {
        plusOne: ( { model, dispatch } ) => void dispatch( 'value', model.value as number + 1 )
    },
    view: h => ( _, { model, actions } ): JSX.Element =>
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

