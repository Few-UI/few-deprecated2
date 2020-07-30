import { defineComponent, wait } from '@/utils';

export default defineComponent( {
    name: 'AsyncViewExample',
    init: () => ( {
        currNum: 7
    } ),
    view: h => ( { model, dispatch } ): JSX.Element =>
        <>
            <div id='asyncElem'>
                {h.await( async(): Promise<JSX.Element> => ( ( await wait( 500 ), <code>Async String</code> ) ) )}
            </div>
            <div id='plusPanel'>
                <div>{model.currNum}</div>
                <button id='plus' onClick={() => void
                    dispatch( { path: 'currNum', value: ( model.currNum as number ) + 1 } )
                }>+1</button>
            </div>
        </>
} );
