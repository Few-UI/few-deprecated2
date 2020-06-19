import { ComponentDef } from '../types';
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
    name: 'DispatchInitExample',
    // elm returns model and cmd ( call back which will launch dispatch )
    init: () => {
        const dispatch = ( name: string, value: string ): void =>
            console.log( `${name}:${value}` );

        // actions.loadMockData??
        wait( 2000 ).then( () => {
            dispatch( 'asyncPath', 'asyncValue' );
        } );

        // sync return
        return {
            syncValue: 'syncValue'
        };
    },
    // elm style of upedate
    actions: {
        plusOne: ( { model, dispatch } ) => void dispatch( 'value', model.value as number + 1 ),
        loadMockData: ( { dispatch } ) => void
            setTimeout( () => dispatch( 'asyncPath', 'asyncPath' ), 1000 )
    },
    view: h => ( { model } ): JSX.Element =>
        <pre>
           {JSON.stringify( model, null, 2 )}
        </pre>
} as ComponentDef );
