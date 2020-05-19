/* eslint-env es6 */
import { createElement } from 'react';
import ReactDOM from 'react-dom';

import FirstComponent from './FirstComponent';
import { createComponent } from './reactPolyfill';
import { createComponent as createVueComponent } from './vuePolyfill';

import { createApp } from 'vue';

// react
ReactDOM.render(
    createElement( createComponent( FirstComponent ) ),
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
