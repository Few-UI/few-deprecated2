import type { Props } from '@/types';
import { defineComponent } from '@/utils';

const Var = defineComponent( {
    name: 'Var',
    init: ( { props } ) => ( {
        val: props.initVal
    } ),
    watchers: ( { props, actions } ) => [ {
        watch: props.currVal,
        action: actions.updateValue
    } ],
    actions: {
        updateValue: ( { dispatch, props } ) => void
            ( props.currVal !== undefined && dispatch( { path: 'val', value: props.currVal } ) )
    },
    view: h => ( { props, model, dispatch } ): JSX.Element =>
        <div>
            {props.name}: {model.val}
            <button onClick={() => void
                ( dispatch( { path: 'val', value: model.val as number + 1 } ), props.onChange && props.onChange( model.val ) )
            }>+</button>
            <button onClick={() => void
                ( dispatch( { path: 'val', value: model.val as number - 1 } ), props.onChange && props.onChange( model.val ) )
            }>-</button>
        </div>
} );

const Position = defineComponent( {
    name: 'Position',
    view: h => ( { props } ): JSX.Element =>
        <>
            <h4>{props.name}</h4>
            <Var name='x' initVal={props.initX} />
            <Var name='y' initVal={props.initY} onChange={props.onChange} currVal={props.currY} />
        </>
} );

/*
    'updateB', v => v + 1
    'updateA', v => v - 1
*/
const Link = defineComponent( {
    name: 'Link',
    view: h => ( { props: { children: [ primary, secondary ], forwardFn, backwardFn }, model, dispatch } ): JSX.Element =>
        <>
            {primary( {
                currY: model.backward,
                onChange: ( v: number ): void => forwardFn && dispatch( { path: 'forward', value: forwardFn( v ) } )
            } )}
            {secondary( {
                currY: model.forward,
                onChange: ( v: number ): void => backwardFn && dispatch( { path: 'backward', value: backwardFn( v ) } )
            } )}
        </>
} );

export default defineComponent( {
    name: 'XComponentExample',
    view: h => (): JSX.Element =>
        <Link forwardFn={( v: number ): number => v + 1} backwardFn={( v: number ): number => v - 1}>
            {( rel: Props ): JSX.Element => <Position name='Point A' initX={1} initY={2} {...rel} />}
            {( rel: Props ): JSX.Element => <Position name='Point B' initX={3} initY={4} {...rel} />}
        </Link>
} );
