import { ComponentDef } from '../../src/types';

export default {
    name: 'DomComponentExample',
    view: h => ( { ref, actions } ): JSX.Element =>
        <div>
            <div ref={ref( 'el' )}></div>
            <button id='switchColor' onClick={actions.switchColor}>Switch Color</button>
            {/*
            <div>{model.color}</div>
            */}
        </div>,
    init: () => ( {
        color: 'black'
    } ),
    watchers: ( { model, actions } ) => [ {
        watch: true,
        action: actions.createDomComponent
    }, {
        watch: model.color,
        action: actions.updateColor
    } ],
    actions: {
        createDomComponent: ( { ref } ): void => {
            ref.el.innerHTML = '<code>This is a DOM component</code>';
        },
        switchColor: ( { model, dispatch } ): void => {
            dispatch( { path: 'color', value: model.color === 'blue' ? 'black' : 'blue' } );
        },
        updateColor: ( { ref, model: { color } } ): void => {
            ref.el.style.color = color as string;
        }
    }
} as ComponentDef;
