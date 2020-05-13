/* eslint-env es6 */
import { createElement } from 'react';
import ReactDOM from 'react-dom';

import FirstComponent from './FirstComponent';
import { createComponent } from './reactPolyfill';

import Vue from 'vue';
import FirstVue from './FirstVue';

// react
ReactDOM.render(
    createElement( createComponent( FirstComponent ) ),
    document.getElementById( 'entry-dom-element' )
);

// vue
// https://github.com/vuejs/vue-cli/issues/1198
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
/*
import App from './App.vue';

createApp( App ).mount( '#vue-test' );
*/

Vue.createApp( FirstVue ).mount( '#vue-test' );
