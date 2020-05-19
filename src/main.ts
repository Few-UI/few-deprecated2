/* eslint-env es6 */
import FirstComponent from './FirstComponent';
import { createComponent as createReactComponent } from './reactPolyfill';
import { createComponent as createVueComponent } from './vuePolyfill';

import { createApp } from 'vue';
import { createElement } from 'react';
import ReactDOM from 'react-dom';


// react
ReactDOM.render(
    createElement( createReactComponent( FirstComponent ) ),
    document.getElementById( 'react-entrypoint' )
);

// vue
// https://github.com/vuejs/vue-cli/issues/1198
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
/*
import App from './App.vue';
*/
createApp( createVueComponent( FirstComponent ) ).mount( '#vue-entrypoint' );
