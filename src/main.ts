/* eslint-env es6 */
import {
    createApp as createReactApp
} from './reactPolyfill';

import {
    createApp as createVueApp
} from './vuePolyfill';

import * as route from './route';

import EntryComponent from './components/EntryComponent';

const entryElem = document.getElementById( 'main-entrypoint' );

let app;

// react
route.register( {
    id: 'react',
    path: '/react',
    parent: undefined,
    enter: () => {
        app = createReactApp( EntryComponent );
        app.mount( entryElem );
    },
    leave: () => {
        app.unmount( entryElem );
    }
} );

// vue
route.register( {
    id: 'vue',
    path: '/vue',
    parent: undefined,
    enter: () => {
        app = createVueApp( EntryComponent );
        app.mount( entryElem );
    },
    leave: () => {
        app.unmount( entryElem );
    }
} );

// about
route.register( {
    id: 'about',
    path: '/about',
    parent: undefined,
    data: {
        testUrl: 'aboutData'
    },
    params: {
        param1: 'aa'
    },
    enter: () => {
        // eslint-disable-next-line no-console
        console.log( 'about: enter' );
    },
    leave: () => {
        // eslint-disable-next-line no-console
        console.log( 'about: leaving' );
    }
} );
