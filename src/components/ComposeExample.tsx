import type {
    Model
} from '@/types';

import {
    defineComponent,
    mapDispatch,
    mapComponent
} from '@/utils';

interface VarProps {
    name: string;
    initVal: number;
}

const Var = defineComponent<VarProps>( {
    name: 'Var',
    init: ( { props } ) => ( {
        val: props.initVal
    } ),
    actions: {
        plusOne: ( { model, dispatch } ) => void
            dispatch( { path: 'val', value: model.val as number + 1 } )
    },
    view: h => ( { props, model, dispatch, actions } ): JSX.Element =>
        <div>
            {props.name}: {model.val}
            <button onClick={actions.plusOne}>+</button>
            <button onClick={() => void
                dispatch( { path: 'val', value: model.val as number - 1 } )
            }>-</button>
        </div>
} );

const Position = defineComponent<{
    name: string;
    initX: number;
    initY: number;
}>( {
    name: 'Position',
    view: h => ( { props } ): JSX.Element =>
        <>
            <h4>{props.name}</h4>
            <Var name='x' initVal={props.initX} />
            <Var name='y' initVal={props.initY} />
        </>
} );

const ComposePosition = defineComponent<{
    name: string;
    initX: number;
    initY: number;
}>( {
    name: 'ComposePosition',
    init: ( { props } ) => ( {
        varX: Var.init( { props: { initVal: props.initX } as VarProps } ),
        varY: Var.init( { props: { initVal: props.initY } as VarProps } )
    } ),
    view: h => ( { props, model, dispatch } ): JSX.Element =>
        <>
            <h4>{props.name}</h4>
            {Var.view( h )( mapComponent( {
                props: { name: 'x' } as VarProps,
                model: model.varX as Model,
                dispatch: mapDispatch( dispatch, 'varX' )
            }, Var.actions ) )}
            {Var.view( h )( mapComponent( {
                props: { name: 'y' } as VarProps,
                model: model.varY as Model,
                dispatch: mapDispatch( dispatch, 'varY' )
            }, Var.actions ) )}
        </>
} );

export default defineComponent( {
    name: 'ComposeExample',
    view: h => (): JSX.Element =>
        <>
            <Position name='Position' initX={1} initY={2} />
            <ComposePosition name='ComposePosition' initX={3} initY={4} />
        </>
} );
