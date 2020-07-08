import { ComponentDef } from '../types';

import { defineComponent } from '../utils';

interface Position {
    x: number;
    y: number;
}

const CarComponent = {
    name: 'CarComponent',
    init: () => ( {} ),
    actions: {
        plusOne: ( { model, dispatch } ) => void dispatch( { path: 'value', value: model.value as number + 1 } )
    },
    view: h => ( { props, actions } ): JSX.Element =>
        <>
            <div>X: {props.position.x}, Y: {props.position.y}</div>
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
            h( CarComponent, {
                position: model.position
            } ),
            h( 'button', {
                onClick: actions.moveForward
            },
            'Move Forward'
            )
        )
} );

