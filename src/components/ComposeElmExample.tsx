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
        uid: 0,
        counters: [ {
            id: 0,
            counter: Counter.init()
        } ]
    } ),
    view: h => ( { model } ): JSX.Element =>
        <>
            <button>Insert</button>
            <button>Remove</button>
            { ( model.counters as Model[] ).map( ( m ) =>
                Counter.view( h )( {
                    model: m.counter as Model,
                    actions: {
                        plusOne: () => console.log( 'plusOne' )
                    },
                    dispatch: () => console.log( 'dispatch' )
                } )
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
