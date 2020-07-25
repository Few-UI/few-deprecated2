import { defineComponent, wait } from '@/utils';
import { Form } from '../../test/components/FormExample';

// Types
interface User {
    name: string;
    age: number;
    test: boolean;
}

interface Fields {
    [key: string]: {
        name: string;
        type: 'number' | 'string' | 'boolean';
        check?: ( value: string ) => string;
        required?: boolean;
    };
}

// mock
const mockUser: User = {
    name: 'John',
    age: 29,
    test: true
};

const getCurrUser = async(): Promise<User> => ( ( await wait( 500 ), mockUser ) );

const getEditSchema = async( type: string ): Promise<any> => {
    await wait( 500 );
    return {
        name: {
            name: 'name',
            type: 'string',
            required: true
        },
        age: {
            name: 'age',
            type: 'number',
            check: ( v ): string => v || v === undefined ? '' : 'cannot be empty'
        },
        test: {
            name: 'test',
            type: 'boolean'
        }
    } as Fields;
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
            <button onClick={actions.toggleEdit} disabled={!model.currUser}>{model.editing ? 'Cancel Edit' : 'Start Edit'}</button>
            { /* model.editing ||
                <>
                    <Form fields={model.fields} action={actions.updateResult} />
                </>
            */}
        </>,
    actions: {
        loadUser: async( { dispatch } ): Promise<void> => {
            dispatch( { path: 'currUser', value: 'loading...' } );
            dispatch( { path: 'currUser', value: await getCurrUser() } );
        },
        toggleEdit: ( { dispatch, model } ): void => {
            dispatch( {
                path: 'editing',
                value: !model.editing
            } );
        }
    }
} );
