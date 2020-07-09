import { defineComponent } from '../../src/utils';

const PositionComponent = defineComponent( {
    name: 'PositionComponent',
    init: ( { props } ) => ( {
        ...props
    } ),
    view: h => ( { model } ): JSX.Element =>
        <div>X: {model.x}, Y: {model.y}</div>
} );

export default defineComponent( {
    name: 'PropInitExample',
    view: h => (): JSX.Element =>
        <PositionComponent x={3} y={4} />
} );

