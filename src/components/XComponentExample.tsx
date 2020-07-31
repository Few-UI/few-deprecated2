import { defineComponent } from '@/utils';

const Var = defineComponent( {
    name: 'Var',
    init: () => ( {
        val: 0
    } ),
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
            <Var name='x' />
            <Var name='y' onChange={props.onChange} />
        </>
} );

const Link = defineComponent( {
    name: 'Link',
    view: h => ( { children } ): JSX.Element =>
        <>
            {children}
            <code>link</code>
        </>
} );

export default defineComponent( {
    name: 'XComponentExample',
    view: h => ( { model } ): JSX.Element =>
        <>
            <Link>
                <Position name='Point A' onChange={
                    ( v: number ): void => console.log( v )
                } />
                <Position name='Point B' />
            </Link>
        </>,
    init: () => ( {
        name: 'Monster Hunter'
    } )
} );
