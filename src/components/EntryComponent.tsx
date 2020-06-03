import {
    ComponentDef
} from '../types';

import ViewExample from './ViewExample';
import AsyncInitExample from '../../test/components/AsyncInitExample';
// import DispatchInitExample from './DispatchInitExample';

const EntryComponent: ComponentDef = {
    name: 'EntryComponent',
    // h( 'div', null, 'current number: ', model.name ) is working too, but
    // it is not friendly for jsbeautify
    view: ( { h } ) =>
        h( 'div', {},
            h( ViewExample ),
            h( AsyncInitExample )
            // h( DispatchInitExample )
        ),
    init: () => ( {} )
};

export default EntryComponent;
