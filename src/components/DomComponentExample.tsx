import { ComponentDef } from '../types';

export default {
    name: 'DomComponentExample',
    view: h => (): JSX.Element => <div></div>,
    init: () => ( {
        color: 'black'
    } ),
    watchers: ( { actions } ) => [ {
        watch: true,
        action: actions.createDomComponent
    } ],
    actions: {
        createDomComponent: ( { elem } ): void => {
            elem.innerHTML = '<code>This is a DOM component</code>';
        }
    }
} as ComponentDef;
