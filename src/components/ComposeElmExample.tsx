import type { Model, DispatchInput, Component, ActionDef, ActionMap } from '@/types';
import { defineComponent, get } from '@/utils';

const mapDispatch = ( dispatch: Function, scope: string ) =>
    ( { path, value }: DispatchInput ): void => dispatch( {
        path: `${scope}.${path}`,
        value
    } );

const mapComponent = ( component: Component<unknown>, actionDefs: { [key: string]: ActionDef<unknown> }  ): Component<unknown> => {
    // TODO: we can have more check like if(!component.actions[key]){ //do map } to provide more flexibility
    component.actions =  Object.entries( actionDefs ).reduce( ( sum, [ key, actionDef ] ) => {
        sum[key] = ( ...args: any[] ): void => actionDef( component, ...args );
        return sum;
    }, {} as ActionMap );
    return component;
};

const Counter = defineComponent( {
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
        }
    },
    view: h => ( { model, dispatch, actions } ): JSX.Element =>
        <>
            <button onClick={actions.insert}>Insert</button>
            <button onClick={actions.remove}>Remove</button>
            {( model.counters as Model[] ).map( ( _, idx ) =>
                h( null, { key: idx }, Counter.view( h )( mapComponent( {
                    model: get( model, `counters[${idx}].counter` ) as Model,
                    dispatch: mapDispatch( dispatch, `counters[${idx}].counter` )
                }, Counter.actions ) ) )
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
