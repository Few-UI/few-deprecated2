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
    view: h => ( { props, model, dispatch } ): JSX.Element =>
        <div>
            {props.name}: {model.val}
            <button onClick={() => void
                dispatch( { path: 'val', value: model.val as number + 1 } )
            }>+</button>
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
    view: h => ( { props, model, dispatch } ): JSX.Element =>
        <>
            <h4>{props.name}</h4>
            {Var.view( h )( {
                props: { name: 'x' },
                model: model.varX as Model,
                dispatch: ( { path, value }: DispatchInput ) => dispatch( {
                    path: `varX.${path}`,
                    value
                } )
            } )}
            {Var.view( h )( {
                props: { name: 'y' },
                model: model.varY as Model,
                dispatch: ( { path, value }: DispatchInput ) => dispatch( {
                    path: `varY.${path}`,
                    value
                } )
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
