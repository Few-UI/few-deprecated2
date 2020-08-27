import type {
    Model
} from '@/types';
import {
    defineComponent,
    get,
    mapDispatch
} from '@/utils';

const Counter = defineComponent( {
    name: 'Counter',
    init: () => ( {
        val: 3
    } ),
    actions: {
        plusOne: ( { model, dispatch } ) => void
            dispatch( { path: 'val', value: model.val as number + 1 } ),
        minusOne: ( { model, dispatch } ) => void
            dispatch( { path: 'val', value: model.val as number - 1 } )
    },
    render: h => ( { val, plusOne, minusOne } ): JSX.Element =>
        <div>
            {val}
            <button onClick={plusOne}>+</button>
            <button onClick={minusOne}>-</button>
        </div>
} );

const CounterGroup = defineComponent( {
    name: 'CounterGroup',
    init: () => ( {
        uid: 0,
        counters: []
    } ),
    actions: {
        // local msg
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
        },
        plus: ( { model, dispatch }, idx ): void => {
            Counter.actions.plusOne( {
                model: get( model, `counters[${idx}].counter` ) as Model,
                dispatch: mapDispatch( dispatch, `counters[${idx}].counter` )
            } );
        },
        minus: ( { model, dispatch }, idx ): void => {
            Counter.actions.minusOne( {
                model: get( model, `counters[${idx}].counter` ) as Model,
                dispatch: mapDispatch( dispatch, `counters[${idx}].counter` )
            } );
        }
    },
    render: h => ( { counters, insert, remove, plus, minus } ): JSX.Element =>
        <>
            <button onClick={insert}>Insert</button>
            <button onClick={remove}>Remove</button>
            {( counters as Model[] ).map( ( m, idx ) =>
                h( null, { key: idx }, Counter.render( h )( {
                    ...m.counter as Model,
                    plusOne: () => plus( idx ),
                    minusOne: () => minus( idx )
                } ) )
            )}
        </>
} );

export default defineComponent( {
    name: 'CounterGroupExample',
    render: h => (): JSX.Element =>
        <>
            <CounterGroup />
        </>
} );
