import {
    ComponentDef
} from '../types';

import ViewExample from './ViewExample';
import AsyncExample from './AsyncExample';


const EntryComponent: ComponentDef = {
    name: 'EntryComponent',
    // h( 'div', null, 'current number: ', model.name ) is working too, but
    // it is not friendly for jsbeautify
    view: ( { h } ) =>
        h( 'div', {}, [
            h( ViewExample ),
            h( AsyncExample )
        ] ),
    init: () => ( {} )
};

export default EntryComponent;
