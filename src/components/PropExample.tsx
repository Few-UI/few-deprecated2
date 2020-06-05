import { ComponentDef } from '../types';

export default {
    name: 'PropExample',
    view: h => ( { firstName, lastName }: { [key: string]: string } ): JSX.Element =>
        <div>Hello {firstName || 'Jane'} {lastName || 'Dole'}!</div>,
    init: () => ( {} )
} as ComponentDef;

