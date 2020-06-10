// https://medium.com/@mickey.vip/an-approach-to-nested-reusable-view-functions-in-elm-a1531b9abaf3
import { ComponentDef } from '../types';
import { wait } from '../utils';

const PropSubscriptionWidget = {
    name: 'PropSubscriptionWidget',
    view: h => ( { firstName, lastName }: { [key: string]: string }, { model, actions } ): JSX.Element =>
        <div>
            <div>Name: {firstName || 'Jane'} {lastName || 'Dole'}</div>
            <div>Address: {model.address}</div>
            {/*
                <div>{( actions.getAddress(), '' )}</div>
            */}
        </div>,
    init: () => ( {
        address: 'loading...'
    } ),
    watchers: ( { model, actions } ) => [ {
        watch: model.lastName,
        action: actions.getAddress
    } ],
    actions: {
        getAddress: async( { model, dispatch } ): Promise<void> => {
            await wait( 1000 );
            if ( model.address !== 'winter fall' ) {
                dispatch( 'address', 'winter fall' );
            }
        }
    }
} as ComponentDef;

export default {
    name: 'PropSubscriptionExample',
    init: () => ( {
        lastName: 'Stark'
    } ),
    // elm style of upedate
    actions: {
        changeFamily: ( { model, dispatch } ) => void dispatch( 'lastName', 'Tully' )
    },
    view: h => ( _, { model, actions } ): JSX.Element =>
        h( 'div', null,
            h( PropSubscriptionWidget, {
                firstName: 'Ed',
                lastName: model.lastName
            } ),
            h( 'button', {
                onClick: actions.changeFamily
            }, 'change' )
        )
} as ComponentDef;

