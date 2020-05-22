/* eslint-env es6 */
import { createComponent as createReactComponent } from './reactPolyfill';
import { createComponent as createVueComponent } from './vuePolyfill';

import { createApp } from 'vue';
import { createElement } from 'react';
import ReactDOM from 'react-dom';

import FirstComponent from './FirstComponent';
import SecondComponent from './SecondComponent';
import ThirdComponent from './ThirdComponent';

// rout test
import * as route from './route';

// react
ReactDOM.render(
    createElement( createReactComponent( SecondComponent ) ),
    document.getElementById( 'react-entrypoint' )
);

// vue
// https://github.com/vuejs/vue-cli/issues/1198
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
/*
import App from './App.vue';
*/
createApp( createVueComponent( SecondComponent ) ).mount( '#vue-entrypoint' );

// routing test code
const states = {
    about: {
        component: () => {
            console.log( 'about' );
        },
        path: '/about',
        parent: undefined,
        data: {
            testUrl: 'aboutData'
        },
        params: {
            param1: 'aa'
        }
    }
};

const listener = {
    updateState: ( val ) => {
        console.log( `updateState: ${JSON.stringify( val )}` );
    }
};

route.register( listener, states );

// route.unregister( listener );
