import type {
    Model
} from '@/types';

import {
    defineComponent,
    mapDispatch
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
            dispatch( { path: 'val', value: model.val as number + 1 } ),
        minusOne: ( { model, dispatch } ) => void
            dispatch( { path: 'val', value: model.val as number - 1 } )
    },
    render: h => ( { name, val, plusOne, minusOne } ): JSX.Element =>
        <div>
            {name}: {val}
            <button onClick={() => void ( plusOne as Function )()}>+</button>
            <button onClick={() => void ( minusOne as Function )()}>-</button>
        </div>
} );

const Position = defineComponent<{
    name: string;
    initX: number;
    initY: number;
}>( {
    name: 'Position',
    render: h => ( { name, initX, initY } ): JSX.Element =>
        <>
            <h4>{name}</h4>
            <Var name='x' initVal={initX} />
            <Var name='y' initVal={initY} />
        </>
} );

const ComposePosition = defineComponent<{
    name: string;
    initX: number;
    initY: number;
}>( {
    name: 'ComposePosition',
    init: ( { props } ) => ( {
        varX: {
            ...Var.init( { props: { initVal: props.initX } as VarProps } ),
            name: 'x'
        },
        varY: {
            ...Var.init( { props: { initVal: props.initY } as VarProps } ),
            name: 'y'
        }
    } ),
    actions: {
        plusOne: ( { model, dispatch }, key ): void => Var.actions.plusOne( {
            model: model[key] as Model,
            dispatch: mapDispatch( dispatch, key )
        } ),
        minusOne: ( { model, dispatch }, key ): void => Var.actions.minusOne( {
            model: model[key] as Model,
            dispatch: mapDispatch( dispatch, key )
        } )
        /*
        plusX: ( { model, dispatch } ): void => Var.actions.plusOne( {
            model: model.varX as Model,
            dispatch: mapDispatch( dispatch, 'varX' )
        } ),
        plusY: ( { model, dispatch } ): void => Var.actions.plusOne( {
            model: model.varY as Model,
            dispatch: mapDispatch( dispatch, 'varY' )
        } ),
        minusX: ( { model, dispatch } ): void => Var.actions.minusOne( {
            model: model.varX as Model,
            dispatch: mapDispatch( dispatch, 'varX' )
        } ),
        minusY: ( { model, dispatch } ): void => Var.actions.minusOne( {
            model: model.varY as Model,
            dispatch: mapDispatch( dispatch, 'varY' )
        } )
        */
    },
    render: h => ( { name, varX, varY, plusOne, minusOne } ): JSX.Element =>
        <>
            <h4>{name}</h4>
            {/* ( { name, val, dispatch, plusOne } ) */}
            {Var.render( h )( {
                ...varX as Model,
                plusOne: () => plusOne( 'varX' ),
                minusOne: () => minusOne( 'varX' )
            } )}
            {Var.render( h )( {
                ...varY as Model,
                plusOne: () => plusOne( 'varY' ),
                minusOne: () => minusOne( 'varY' )
            } )}
        </>
} );

export default defineComponent( {
    name: 'ComposeExample',
    render: h => (): JSX.Element =>
        <>
            <Position name='Position' initX={1} initY={2} />
            <ComposePosition name='ComposePosition' initX={3} initY={4} />
        </>
} );
