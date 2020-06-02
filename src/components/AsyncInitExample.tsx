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

const AsyncInitExample: ComponentDef = {
    name: 'AsyncInitExample',
    // elm returns model and cmd ( call back which will launch dispatch )
    init: () => wait( 2000 ).then( () => ( {
        asyncVal: 'asyncVal'
    } ) ),
    // elm style of upedate
    actions: {
        plusOne: ( { model, dispatch } ) => void dispatch( 'value', model.value as number + 1 )
    },
    // eslint-disable-next-line react/display-name
    view: ( { model, h } ) =>
        <pre>
           {JSON.stringify( model, null, 2 )}
        </pre>
};

export default AsyncInitExample;
