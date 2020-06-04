import {
    ComponentDef
} from '../types';

import ViewExample from './ViewExample';
import PropExample from './PropExample';
// import DispatchInitExample from './DispatchInitExample';

const EntryComponent: ComponentDef = {
    name: 'EntryComponent',
    // h( 'div', null, 'current number: ', model.name ) is working too, but
    // it is not friendly for jsbeautify
    view: h => (): JSX.Element =>
        h( 'div', {},
            h( ViewExample ),
            h( PropExample, {
                firstName: 'Final',
                lastName: 'Fantasy'
            } )
            // h( DispatchInitExample )
        ),
    init: () => ( {} )
};

export default EntryComponent;
