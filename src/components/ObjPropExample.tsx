import { ComponentDef } from '../types';

import { defineComponent } from '../utils';

interface Position {
    x: number;
    y: number;
}

const StatelessCarComponent = {
    name: 'StatelessCarComponent',
    init: () => ( {} ),
    view: h => ( { props, actions } ): JSX.Element =>
        <>
            <div>X: {props.position.x}, Y: {props.position.y}</div>
        </>
} as ComponentDef;

const StatefulCarComponent = {
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
            <button onClick={actions.moveForward}>+1</button>
        </>
} as ComponentDef;

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
        h( '', null,
            h( StatelessCarComponent, {
                position: model.position
            } ),
            h( 'button', {
                onClick: actions.moveForward
            },
            'Move Forward'
            ),
            h( StatefulCarComponent, {
                position: model.position
            } )
        )
} );

