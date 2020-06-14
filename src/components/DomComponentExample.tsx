import { ComponentDef } from '../types';

export default {
    name: 'DomComponentExample',
    view: h => ( { ref } ): JSX.Element => <div ref={ref( 'el' )}></div>,
    init: () => ( {
        color: 'black'
    } ),
    watchers: ( { actions } ) => [ {
        watch: true,
        action: actions.createDomComponent
    } ],
    actions: {
        createDomComponent: ( { model } ): void => {
            const el = model.el as HTMLElement;
            el.innerHTML = '<code>This is a DOM component</code>';
        }
    }
} as ComponentDef;
