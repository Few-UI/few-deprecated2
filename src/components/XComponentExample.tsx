import { defineComponent } from '@/utils';

const Var = defineComponent( {
    name: 'Var',
    init: ( { props } ) => ( {
        val: props.val
    } ),
    watchers: ( { props, actions } ) => [ {
        watch: props.link,
        action: actions.updateValue
    } ],
    actions: {
        updateValue: ( { dispatch, props } ) => void
            ( props.link !== undefined && dispatch( { path: 'val', value: props.link } ) )
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
            <Var name='x' val={props.x} />
            <Var name='y' val={props.y} onChange={props.onChange} link={props.link} />
        </>
} );

export default defineComponent( {
    name: 'XComponentExample',
    view: h => ( { model, dispatch } ): JSX.Element =>
        <>
            <Position name='Point A' x={1} y={2} onChange={
                ( v: number ): void => dispatch( { path: 'linkVal', value: v + 1 } )
            }/>
            <Position name='Point B' x={3} y={4} link={model.linkVal}/>
        </>
} );
