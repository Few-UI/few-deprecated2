import type { Model, DispatchInput } from '@/types';
import { defineComponent } from '@/utils';

const Var = defineComponent<{
    name?: string;
    initVal?: number;
}>( {
    name: 'Var',
    init: ( { props } ) => ( {
        val: props.initVal
    } ),
    actions: {
        plusOne: ( { model, dispatch } ) => void
            dispatch( { path: 'val', value: model.val as number + 1 } )
    },
    view: h => ( { props, model, actions, dispatch } ): JSX.Element =>
        <div>
            {props.name}: {model.val}
            <button onClick={ actions.plusOne}>+</button>
            <button onClick={() => void
                dispatch( { path: 'val', value: model.val as number - 1 } )
            }>-</button>
        </div>
} );

const ComposePosition = defineComponent<{
    name: string;
    initX: number;
    initY: number;
}>( {
    name: 'Position',
    init: ( { props } ) => ( {
        varX: Var.init( { props: { initVal: props.initX } } ),
        varY: Var.init( { props: { initVal: props.initY } } )
    } ),
    actions: {
        dispatchX: ( { dispatch }, { path, value }: DispatchInput ) => void dispatch( {
            path: `varX.${path}`,
            value
        } ),
        dispatchY: ( { dispatch }, { path, value }: DispatchInput ) => void dispatch( {
            path: `varY.${path}`,
            value
        } )
    },
    view: h => ( { props, model, actions } ): JSX.Element =>
        <>
            <h4>{props.name}</h4>
            {Var.view( h )( {
                props: { name: 'x' },
                model: model.varX as Model,
                dispatch: actions.dispatchX,
                actions: {
                    plusOne: ( v: number ) => void Var.actions.plusOne( {
                        model: model.varX as Model,
                        dispatch: actions.dispatchX
                    }, v )
                }
            } )}
            {Var.view( h )( {
                props: { name: 'y' },
                model: model.varY as Model,
                dispatch: actions.dispatchY,
                actions: {
                    plusOne: ( v: number ) => void Var.actions.plusOne( {
                        model: model.varY as Model,
                        dispatch: actions.dispatchY
                    }, v )
                }
            } )}
        </>
} );

const Position = defineComponent<{
    name: string;
    initX: number;
    initY: number;
}>( {
    name: 'ComposePosition',
    view: h => ( { props } ): JSX.Element =>
        <>
            <h4>{props.name}</h4>
            <Var name='x' initVal={props.initX} />
            <Var name='y' initVal={props.initY} />
        </>
} );

export default defineComponent( {
    name: 'XComponentExample',
    view: h => (): JSX.Element =>
        <>
            <Position name='Position' initX={1} initY={2} />
            <ComposePosition name='ComposePosition' initX={3} initY={4} />
        </>
} );
