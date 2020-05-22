import {
    ComponentDef
} from '../types';

import FirstComponent from './FirstComponent';
import SecondComponent from './SecondComponent';
import ThirdComponent from './ThirdComponent';


const EntryComponent: ComponentDef = {
    name: 'SecondComponent',
    // h( 'div', null, 'current number: ', model.name ) is working too
    view: ( { h } ) =>
        h( 'div', null, [
            h( FirstComponent ),
            h( SecondComponent ),
            h( ThirdComponent )
        ] ),
    init: () => ( {} )
};

export default EntryComponent;
