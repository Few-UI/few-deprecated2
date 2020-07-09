import { defineComponent } from '@/utils';

interface Position {
    x: number;
    y: number;
}

const StatelessComponent = defineComponent( {
    name: 'StatelessComponent',
    // init: () => ( {} ),
    view: h => ( { props } ): JSX.Element =>
        <>
            <div>X: {props.position.x}, Y: {props.position.y}</div>
            <button id='clickOnParent' onClick={props.action}>+1 in Stateless Component</button>
        </>
} );

const StatefulComponent = defineComponent( {
    name: 'StatefulComponent',
    init: ( { props } ) => ( {
        ...props
    } ),
    actions: {
        moveForward: ( { model, dispatch } ): void =>
            dispatch( { path: 'position.x', value: ( model.position as Position ).x + 1 } )
    },
    view: h => ( { model, actions } ): JSX.Element =>
        <>
            <div>X: {( model.position as Position ).x}, Y: {( model.position as Position ).y}</div>
            <button id='clickOnSub' onClick={actions.moveForward}>+1 in Stateful Component</button>
        </>
} );

export default defineComponent( {
    name: 'PropByRefExample',
    init: () => ( {
        position: {
            x: 0,
            y: 0
        }
    } ),
    actions: {
        moveForward: ( { model, dispatch } ): void =>
            dispatch( { path: 'position.x', value: ( model.position as Position ).x + 1 } )
    },
    view: h => ( { model, actions } ): JSX.Element =>
        <>
            <StatefulComponent  position={model.position} />
            <StatelessComponent position={model.position} action={actions.moveForward} />
        </>
} );

