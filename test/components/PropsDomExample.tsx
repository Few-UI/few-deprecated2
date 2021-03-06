import { defineComponent } from '@/utils';

const PropsDomWidget = defineComponent( {
    name: 'PropsDomWidget',
    view: h => ( { ref } ): JSX.Element =>
        <div ref={ref( 'el' )}></div>,
    init: () => ( {} ),
    watchers: ( { props, actions } ) => [ {
        watch: true,
        action: actions.createDomComponent
    }, {
        watch: props.color,
        action: actions.updateColor
    } ],
    actions: {
        createDomComponent: ( { ref } ): void => {
            ref.el.innerHTML = '<code>This is a DOM component</code>';
        },
        updateColor: ( { ref, props } ): void => {
            ref.el.style.color = props.color as string;
        }
    }
}  );

export default defineComponent( {
    name: 'PropsDomExample',
    view: h => ( { model, actions } ): JSX.Element =>
        <div>
            <PropsDomWidget color={model.color} />
            <button id='switchColor' onClick={actions.switchColor}>Switch Color</button>
        </div>,
    init: () => ( {
        color: 'green'
    } ),
    actions: {
        switchColor: ( { model, dispatch } ): void => {
            dispatch( { path: 'color', value: model.color === 'green' ? 'black' : 'green' } );
        }
    }
} );
