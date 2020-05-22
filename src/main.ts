/* eslint-env es6 */
import { createComponent as createReactComponent } from './reactPolyfill';
import { createComponent as createVueComponent } from './vuePolyfill';

import { createApp } from 'vue';
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import * as route from './route';

import FirstComponent from './FirstComponent';
import SecondComponent from './SecondComponent';
import ThirdComponent from './ThirdComponent';

const entryElem = document.getElementById( 'react-entrypoint' );

// react
route.register( {
    id: 'react',
    path: '/react',
    parent: undefined,
    enter: () => {
        ReactDOM.render(
            createElement( createReactComponent( SecondComponent ) ),
            entryElem
        );
    },
    leave: () => {
        ReactDOM.unmountComponentAtNode( entryElem );
    }
} );

// vue
let vueApp;
route.register( {
    id: 'vue',
    path: '/vue',
    parent: undefined,
    enter: () => {
        vueApp = createApp( createVueComponent( SecondComponent ) );
        vueApp.mount( entryElem );
    },
    leave: () => {
        vueApp.unmount( entryElem );
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
        console.log( 'about: enter' );
    },
    leave: () => {
        console.log( 'about: leaving' );
    }
} );
