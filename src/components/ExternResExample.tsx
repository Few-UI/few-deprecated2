import { defineComponent } from '../utils';

/**
 * wait for elapsed time and return a promise
 * @param elapsed elapsed time
 * @returns promise
 */
export const wait = ( elapsed = 0 ): Promise<{}> => {
    return new Promise( resolve => setTimeout( () => {
        resolve( null );
    }, elapsed ) );
};

export const mockServer = {
    _server: {} as { [key: string]: string },
    register: async( name: string ): Promise<string> => {
        const id = `GOT_${name}`;
        await wait( 1000 );
        mockServer._server[id] = name;
        return id;
    },
    unregister: ( id: string ): void => void delete mockServer._server[id]
};

export default defineComponent( {
    name: 'ExternResExample',
    // elm returns model and cmd ( call back which will launch dispatch )
    init: async() =>  ( {
        id: await mockServer.register( 'john' )
    } ),
    unmount: ( { model: { id } } ) => {
        mockServer.unregister( id as string );
    },
    actions: {
        plusOne: ( { model, dispatch } ) => void dispatch( { path: 'value', value: model.value as number + 1 } )
    },
    view: h => ( { model } ): JSX.Element =>
        <pre>
            {JSON.stringify( model )}
        </pre>
} );
