/* eslint-env jest */
/**
 * https://github.com/testing-library/dom-testing-library/blob/master/src/event-map.js
 *
 * 3 ways to simulate click:
 * - buttonElem.click();
 *
 * - buttonElem.onclick( new MouseEvent( 'click' ) );
 *
 * - buttonElem.dispatchEvent( new MouseEvent( 'click', {
 *       bubbles: true,
 *       cancelable: true,
 *       button: 0,
 *       composed: true
 */
import { wait } from './utils';

import {
    createApp as createReactApp
} from '../src/reactPolyfill';

import {
    createApp as createVueApp
} from '../src/vuePolyfill';

import ActionExample from '../src/components/ActionExample';


describe( 'Component test', () => {
    let app;
    let containerElem;

    beforeEach( () => {
        containerElem = document.createElement( 'div' );
        document.body.appendChild( containerElem );
    } );

    afterEach( () => {
        if( app ) {
            app.unmount( containerElem );
        }
        document.body.removeChild( containerElem );
    } );

    it( 'ActionExample (react)', async() => {
        app = createReactApp( ActionExample );
        app.mount( containerElem );
        expect( containerElem.innerHTML ).toEqual( '<div><div>current number: 7</div><button>+1</button></div>' );

        const buttonElem = containerElem.getElementsByTagName( 'button' )[0];

        // await is not required for react case
        buttonElem.click();
        await wait();

        expect( containerElem.innerHTML ).toEqual( '<div><div>current number: 8</div><button>+1</button></div>' );
    } );

    it( 'ActionExample (vue)', async() => {
        app = createVueApp( ActionExample );
        app.mount( containerElem );
        expect( containerElem.innerHTML ).toEqual( '<div><div>current number: 7</div><button>+1</button></div>' );

        const buttonElem = containerElem.getElementsByTagName( 'button' )[0];
        buttonElem.click();
        await wait();

        expect( containerElem.innerHTML ).toEqual( '<div><div>current number: 8</div><button>+1</button></div>' );
    } );

    // not sure how vue still supports reactivity when dom node is not attached on document???
    it( 'ActionExample (vue, invalid setup)', async() => {
        const elem = document.createElement( 'div' );
        app = createVueApp( ActionExample );
        app.mount( elem );
        expect( elem.innerHTML ).toEqual( '<div><div>current number: 7</div><button>+1</button></div>' );

        const buttonElem = elem.getElementsByTagName( 'button' )[0];
        buttonElem.click();
        await wait();

        expect( elem.innerHTML ).toEqual( '<div><div>current number: 8</div><button>+1</button></div>' );
    } );
} );

