import { defineComponent } from '../../src/utils';

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

const UnmountActionComponent = defineComponent( {
    name: 'UnmountActionComponent',
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

export default defineComponent( {
    name: 'UnmountActionExample',
    init: () => ( {
        enabled: true
    } ),
    actions: {
        toggle: ( { model, dispatch } ) => void dispatch( { path: 'enabled', value: !model.enabled } )
    },
    view: h => ( { model, actions } ): JSX.Element =>
        <>
            { model.enabled ? <UnmountActionComponent /> : '' }
            <button id='toggleButton' onClick={actions.toggle}>toggle</button>
        </>
} );


