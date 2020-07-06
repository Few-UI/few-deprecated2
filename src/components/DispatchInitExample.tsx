// NOTE: this example is in incomplete status
import {
    ComponentDef,
    DispatchInput
} from '../types';
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
        const dispatch = ( { path, value }: DispatchInput ): void =>
            console.log( `${name}:${value}` );

        // actions.loadMockData??
        wait( 2000 ).then( () => {
            dispatch( { path: 'asyncPath', value: 'asyncValue' } );
        } );

        // sync return
        return {
            syncValue: 'syncValue'
        };
    },
    // elm style of upedate
    actions: {
        plusOne: ( { model, dispatch } ) => void dispatch( { path: 'value', value: model.value as number + 1 } ),
        loadMockData: ( { dispatch } ) => void
            setTimeout( () => dispatch( { path: 'asyncPath', value: 'asyncPath' } ), 1000 )
    },
    view: h => ( { model } ): JSX.Element =>
        <pre>
           {JSON.stringify( model, null, 2 )}
        </pre>
} as ComponentDef );
