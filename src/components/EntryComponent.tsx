import {
    ComponentDef
} from '../types';

import ViewExample from './ViewExample';
import UpdateExample from './UpdateExample';
import ThirdExample from './ThirdExample';


const EntryComponent: ComponentDef = {
    name: 'SecondComponent',
    // h( 'div', null, 'current number: ', model.name ) is working too, but
    // it is not friendly for jsbeautify
    view: ( { h } ) =>
        h( 'div', {}, [
            h( ViewExample ),
            h( UpdateExample ),
            h( ThirdExample )
        ] ),
    init: () => ( {} )
};

export default EntryComponent;
