import {
    Component,
    ComponentDef
} from '../types';

import ViewExample from './ViewExample';
import ActionExample from './ActionExample';
import AsyncExample from './AsyncExample';
import ThirdExample from './ThirdExample';


const EntryComponent: ComponentDef = {
    name: 'EntryComponent',
    // h( 'div', null, 'current number: ', model.name ) is working too, but
    // it is not friendly for jsbeautify
    view: ( { h }: Component ) =>
        h( 'div', {}, [
            h( ViewExample ),
            h( ActionExample ),
            h( AsyncExample ),
            h( ThirdExample )
        ] ),
    init: () => ( {} )
};

export default EntryComponent;
