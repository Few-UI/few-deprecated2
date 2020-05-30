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
import { createApp } from '../src/vuePolyfill';
import { App } from '../src/types';

import SyncActionExample from './components/SyncActionExample';

jest.useFakeTimers();

describe( 'Boundary Test Cases', () => {
    let app: App;
    let containerElem: HTMLElement;

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

    // not sure how vue still supports reactivity when dom node is not attached on document???
    it( 'SyncActionExample (vue with invalid setup)', async() => {
        const elem = document.createElement( 'div' );
        app = createApp( SyncActionExample );
        app.mount( elem );
        expect( elem.innerHTML ).toEqual( '<div><div>current number: 7</div><button>+1</button></div>' );

        const buttonElem = elem.getElementsByTagName( 'button' )[0];
        buttonElem.click();
        await wait();

        expect( elem.innerHTML ).toEqual( '<div><div>current number: 8</div><button>+1</button></div>' );
    } );
} );

