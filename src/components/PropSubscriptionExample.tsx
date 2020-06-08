import { ComponentDef } from '../types';
import { wait } from '../utils';

const PropSubscriptionWidget = {
    name: 'PropSubscriptionWidget',
    view: h => ( { firstName, lastName }: { [key: string]: string }, { model, actions } ): JSX.Element =>
        <div>
            <div>Name: {firstName || 'Jane'} {lastName || 'Dole'}</div>
            <div>Address: {model.address}</div>
            <div>{( actions.getAddress(), '' )}</div>
        </div>,
    init: () => ( {
        address: 'loading...'
    } ),
    actions: {
        getAddress: async( { model, dispatch } ): Promise<void> => {
            if ( model.address !== 'winter fell' ) {
                await wait( 500 );
                dispatch( 'address', 'winter fell' );
            }
        }
    }
} as ComponentDef;

export default {
    name: 'PropSubscriptionExample',
    init: () => ( {
        value: 7
    } ),
    // elm style of upedate
    actions: {
        plusOne: ( { model, dispatch } ) => void dispatch( 'value', model.value as number + 1 )
    },
    view: h => (): JSX.Element =>
        h( 'div', null,
            h( PropSubscriptionWidget, {
                firstName: 'Ed',
                lastName: 'Stark'
            } )

        )
} as ComponentDef;

