import {
    ComponentDef
} from '../types';


const PropExample: ComponentDef = {
    name: 'PropExample',
    // eslint-disable-next-line react/display-name
    view: ( { h }, { firstName, lastName } ) => <div>Hello {firstName || 'Jane'} {lastName || 'Dole'}!</div>,
    init: () => ( {} )
};

export default PropExample;