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

export default defineComponent( {
    name: 'MountActionExample',
    // elm returns model and cmd ( call back which will launch dispatch )
    init: () => (  {
        mountVal: 'loading...'
    } ),
    mount: async( { dispatch } ) => {
        await wait( 1000 );
        dispatch( { path: 'mountVal', value: 'mountVal' } );
    },
    /*
    unmount: ( { model: { id } } ) => {
        console.log( id );
    },
    */
    view: h => ( { model } ): JSX.Element =>
        <pre>
            {JSON.stringify( model )}
        </pre>
} );
