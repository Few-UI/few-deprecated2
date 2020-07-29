import { defineComponent, wait } from '@/utils';
import { User, UserForm } from './FormExample';

// mock server
const mockServer = {
    _currUser: {
        name: 'John',
        age: 29,
        isAdmin: true
    } as User,
    getCurrUser: async(): Promise<User> => ( ( await wait( 500 ), mockServer._currUser ) ),
    updateCurrUser: async( updateValues: User ): Promise<void> => void ( ( await wait( 500 ), Object.assign( mockServer._currUser, updateValues ) ) )
};

// example
export default defineComponent( {
    name: 'FormEditExample',
    init: () => ( {
        editing: false
    } ),
    view: h => ( { model, actions } ): JSX.Element =>
        <>
            <pre>Current User: {JSON.stringify( model.currUser, null, 2 ) || 'Not Loaded'}</pre>
            <button onClick={actions.loadUser} disabled={model.editing as boolean}>Load</button>
            <button onClick={actions.toggleEdit} disabled={!model.currUser}>
                {model.editing ? 'Cancel Edit' : 'Start Edit'}
            </button>
            {model.editing &&
                <>
                    <UserForm values={model.currUser} action={actions.saveEdit} />
                </>
            }
        </>,
    actions: {
        loadUser: async( { dispatch } ): Promise<void> => {
            dispatch( { path: 'currUser', value: 'loading...' } );
            dispatch( { path: 'currUser', value: await mockServer.getCurrUser() } );
        },
        toggleEdit: ( { dispatch, model } ) => void
            dispatch( { path: 'editing', value: !model.editing } ),
        saveEdit: async( { dispatch, actions }, formValues ): Promise<void> => {
            dispatch( { path: 'editing', value: false } );
            dispatch( { path: 'currUser', value: 'updating...' } );
            await mockServer.updateCurrUser( formValues );
            dispatch( { path: 'currUser', value: 'updating complete' } );

            // reuse action load user
            // TODO: shall we maintain await? how?
            await actions.loadUser();
        }
    }
} );
