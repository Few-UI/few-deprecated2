import { defineComponent } from '@/utils';

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
    name: 'AsyncInitExample',
    // elm returns model and cmd ( call back which will launch dispatch )
    init: () => wait( 1000 ).then( () => {
        return {
            asyncVal: 'asyncVal'
        };
    } ),
    // elm style of upedate
    actions: {
        plusOne: ( { model, dispatch } ) => void dispatch( { path: 'value', value: model.value as number + 1 } )
    },
    view: h => ( { model } ): JSX.Element =>
        <pre>
            {JSON.stringify( model )}
        </pre>
} );
