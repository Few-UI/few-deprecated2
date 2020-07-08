import { defineComponent } from '../utils';

interface Position {
    x: number;
    y: number;
}

const StatelessCarComponent = defineComponent( {
    name: 'StatelessCarComponent',
    init: () => ( {} ),
    view: h => ( { props } ): JSX.Element =>
        <>
            <div>X: {props.position.x}, Y: {props.position.y}</div>
        </>
} );

const StatefulCarComponent = defineComponent( {
    name: 'StatefulCarComponent',
    init: ( { props } ) => ( {
        ...props
    } ),
    actions: {
        moveForward: ( { model, dispatch } ): void => void
            dispatch( { path: 'position.x', value: ( model.position as Position ).x + 1 } )
    },
    view: h => ( { model, actions } ): JSX.Element =>
        <>
            <div>X: {( model.position as Position ).x}, Y: {( model.position as Position ).y}</div>
            <button onClick={actions.moveForward}>+1 in Stateful Component</button>
        </>
} );

export default defineComponent( {
    name: 'ObjPropExample',
    init: () => ( {
        position: {
            x: 0,
            y: 0
        }
    } ),
    // elm style of upedate
    actions: {
        moveForward: ( { model, dispatch } ): void => {
            const position = model.position as Position;
            dispatch( { path: 'position.x', value: position.x + 1 } );
        }
    },
    view: h => ( { model, actions } ): JSX.Element =>
        <>
            <StatelessCarComponent position={model.position} />
            <button onClick={actions.moveForward}>+1 in parent</button>
            <StatefulCarComponent position={model.position} />
        </>
} );

