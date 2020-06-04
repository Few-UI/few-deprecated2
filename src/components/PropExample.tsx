import {
    ComponentDef
} from '../types';


const PropExample: ComponentDef = {
    name: 'PropExample',
    view: h => ( { firstName, lastName }: { [key: string]: string } ): JSX.Element =>
        <div>Hello {firstName || 'Jane'} {lastName || 'Dole'}!</div>,
    init: () => ( {} )
};

export default PropExample;
