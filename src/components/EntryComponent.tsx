import {
    ComponentDef
} from '../types';

import ViewExample from './ViewExample';
import ActionExample from './ActionExample';
import ThirdExample from './ThirdExample';


const EntryComponent: ComponentDef = {
    name: 'EntryComponent',
    // h( 'div', null, 'current number: ', model.name ) is working too, but
    // it is not friendly for jsbeautify
    view: ( { h } ) =>
        h( 'div', {}, [
            h( ViewExample ),
            h( ActionExample ),
            h( ThirdExample )
        ] ),
    init: () => ( {} )
};

export default EntryComponent;
