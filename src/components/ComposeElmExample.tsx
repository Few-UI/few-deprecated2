import type { Model } from '@/types';
import { defineComponent } from '@/utils';

const Counter = defineComponent<{
    initVal?: number;
}>( {
    name: 'Counter',
    init: () => ( {
        val: 3
    } ),
    actions: {
        plusOne: ( { model, dispatch } ) => void
            dispatch( { path: 'val', value: model.val as number + 1 } )
    },
    view: h => ( { model, actions, dispatch } ): JSX.Element =>
        <div>
            {model.val}
            <button onClick={actions.plusOne}>+</button>
            <button onClick={() => void
                dispatch( { path: 'val', value: model.val as number - 1 } )
            }>-</button>
        </div>
} );

const CounterGroup = defineComponent<{
}>( {
    name: 'CounterGroup',
    init: () => ( {
        uid: 1,
        counters: [ {
            id: 0,
            counter: Counter.init()
        } ]
    } ),
    actions: {
        insert: ( { model, dispatch } ): void => {
            dispatch( {
                path: 'counters',
                value: ( model.counters as Model[] ).concat( [ {
                    id: model.uid,
                    counter: Counter.init()
                } ] )
            } );
            dispatch( {
                path: 'uid',
                value: ( model.uid as number )++
            } );
        },
        remove: ( { model, dispatch } ): void => {
            dispatch( {
                path: 'counters',
                value: ( ( model.counters as Model[] ).splice( -1, 1 ), model.counters )
            } );
            dispatch( {
                path: 'uid',
                value: ( model.uid as number )--
            } );
        }
    },
    view: h => ( { model, actions } ): JSX.Element =>
        <>
            <button onClick={actions.insert}>Insert</button>
            <button onClick={actions.remove}>Remove</button>
            { ( model.counters as Model[] ).map( ( m, idx ) =>
                h( null, { key: idx }, Counter.view( h )( {
                    model: m.counter as Model,
                    actions: {
                        plusOne: () => console.log( 'plusOne' )
                    },
                    dispatch: () => console.log( 'dispatch' )
                } ) )
            )}
        </>
} );

export default defineComponent( {
    name: 'CounterGroupExample',
    view: h => (): JSX.Element =>
        <>
            <CounterGroup />
        </>
} );
