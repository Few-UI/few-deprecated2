import {
    ComponentDef
} from '../types';

import ViewExample from './ViewExample';
import TextboxExample from '../../test/components/TextboxExample';

const EntryComponent: ComponentDef = {
    name: 'EntryComponent',
    // h( 'div', null, 'current number: ', model.name ) is working too, but
    // it is not friendly for jsbeautify
    view: ( { h } ) =>
        h( 'div', {},
            h( ViewExample ),
            h( TextboxExample )
        ),
    init: () => ( {} )
};

export default EntryComponent;
