import {
    ComponentDef
} from '../types';

import ViewExample from './ViewExample';
import AsyncActionExample from '../../test/components/AsyncActionExample';


const EntryComponent: ComponentDef = {
    name: 'EntryComponent',
    // h( 'div', null, 'current number: ', model.name ) is working too, but
    // it is not friendly for jsbeautify
    view: ( { h } ) =>
        h( 'div', {},
            h( ViewExample ),
            h( AsyncActionExample )
        ),
    init: () => ( {} )
};

export default EntryComponent;
