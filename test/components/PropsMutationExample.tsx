import { ComponentDef, Model } from '../../src/types';
import { defineComponent } from '../../src/utils';

const PropsDomWidget = defineComponent( {
    name: 'PropsDomWidget',
    view: h => ( { ref } ): JSX.Element =>
        <div ref={ref( 'el' )}></div>,
    init: () => ( {} ),
    watchers: ( { props, actions } ) => [ {
        watch: true,
        action: actions.createDomComponent
    }, {
        watch: props.prop.color,
        action: actions.updateColor
    } ],
    actions: {
        createDomComponent: ( { ref } ): void => {
            ref.el.innerHTML = '<code>This is a DOM component</code>';
        },
        updateColor: ( { ref, props } ): void => {
            ref.el.style.color = props.prop.color as string;
        }
    }
} as ComponentDef );

export default {
    name: 'PropsDomExample',
    view: h => ( { model, actions } ): JSX.Element =>
        <div>
            <PropsDomWidget prop={model.prop} />
            <button id='switchColor' onClick={actions.switchColor}>Switch Color</button>
        </div>,
    init: () => ( {
        prop: {
            color: 'green'
        },
        color: 'green'
    } ),
    actions: {
        switchColor: ( { model, dispatch } ): void => {
            const prop = model.prop as Model;
            dispatch( 'prop.color', prop.color === 'green' ? 'black' : 'green' );
            /*
            Blow is working too bu a different effect
            dispatch( 'prop', {
                color: prop.color === 'green' ? 'black' : 'green'
            } );
            */
        }
    }
} as ComponentDef;
