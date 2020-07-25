import { defineComponent, wait } from '@/utils';

interface Item {
    name: string;
    age: number;
    test: boolean;
}

// mock
const mockUser: Item = {
    name: 'John',
    age: 29,
    test: true
};

const getCurrUser = async(): Promise<Item> => {
    await wait( 500 );
    return mockUser;
};

export default defineComponent( {
    name: 'FormEditExample',
    init: () => ( {
        editing: false
    } ),
    view: h => ( { model, actions } ): JSX.Element =>
        <>
            <pre>Current User: {JSON.stringify( model.currUser, null, 2 ) || 'Not Loaded'}</pre>
            <button onClick={actions.loadUser} disabled={model.editing as boolean}>Load</button>
            <button onClick={actions.toggleEdit} disabled={!model.currUser}>{ model.editing ? 'Cancel Edit' : 'Start Edit' }</button>
        </>,
    actions: {
        loadUser: async( { dispatch } ): Promise<void> => {
            dispatch( {
                path: 'currUser',
                value: 'loading...'
            } );
            dispatch( {
                path: 'currUser',
                value: await getCurrUser()
            } );
        },
        toggleEdit: ( { dispatch, model } ): void => {
            dispatch( {
                path: 'editing',
                value: !model.editing
            } );
        }
    }
} );
