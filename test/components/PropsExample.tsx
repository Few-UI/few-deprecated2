import { defineComponent } from '@/utils';

const PropWidget = defineComponent( {
    name: 'PropWidget',
    view: h => ( { props: { firstName, lastName } } ): JSX.Element =>
        <div>Hello {firstName || 'Jane'} {lastName || 'Dole'}!</div>,
    init: () => ( {} )
} );

export default defineComponent( {
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
} );

