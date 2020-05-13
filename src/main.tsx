/* eslint-env es6 */
import { createElement } from 'react';
import ReactDOM from 'react-dom';

import FirstComponent from './FirstComponent';
import { createComponent } from './reactHelper';

// react
ReactDOM.render(
    createElement( createComponent( FirstComponent ) ),
    document.getElementById( 'entry-dom-element' )
);
