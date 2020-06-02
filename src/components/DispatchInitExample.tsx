import {
    ComponentDef
} from '../types';

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

const DispatchInitExample: ComponentDef = {
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
    // eslint-disable-next-line react/display-name
    view: ( { model, h } ) =>
        <pre>
           {JSON.stringify( model, null, 2 )}
        </pre>
};

export default DispatchInitExample;