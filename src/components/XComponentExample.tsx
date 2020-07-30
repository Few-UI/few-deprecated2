import { defineComponent } from '@/utils';

const Var = defineComponent( {
    name: 'Var',
    init: () => ( {
        val: 0
    } ),
    view: h => ( { props, model, dispatch } ): JSX.Element =>
        <div>
            {props.name}: {model.val}
            <button onClick={() => void dispatch( { path: 'val', value: model.val as number + 1 } ) }>+</button>
            <button onClick={() => void dispatch( { path: 'val', value: model.val as number - 1 } ) }>-</button>
        </div>
} );

const Position = defineComponent( {
    name: 'Position',
    view: h => ( { props } ): JSX.Element =>
        <>
            <h4>{props.name}</h4>
            <Var name='x' />
            <Var name='y' />
        </>
} );

export default defineComponent( {
    name: 'XComponentExample',
    view: h => ( { model } ): JSX.Element =>
        <>
            <Position name='Point A'/>
            <Position name='Point B'/>
        </>,
    init: () => ( {
        name: 'Monster Hunter'
    } )
} );
