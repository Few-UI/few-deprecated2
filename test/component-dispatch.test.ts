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

import {
    App
} from '../src/types';

import {
    wait,
    trimHtmlComments,
    getSupportedFrameworks
} from './utils';

import NewKeyDispatchExample from './components/NewKeyDispatchExample';

// Test
const _testSuite = ( name: string, createApp: Function ): void =>
    describe( `Component test on ${name}`, () => {
        let app: App;
        let containerElem: HTMLElement;

        beforeEach( () => {
            containerElem = document.createElement( 'div' );
            document.body.appendChild( containerElem );
        } );

        afterEach( () => {
            if ( app ) {
                app.unmount( containerElem );
            }
            document.body.removeChild( containerElem );
        } );

        it( `SyncActionExample on ${name}`, async() => {
            app = createApp( NewKeyDispatchExample ).mount( containerElem );
            expect( trimHtmlComments( containerElem.innerHTML ) ).toEqual( '<div><div>Hello !</div><button>set name</button></div>' );

            // await is not required for react case
            const buttonElem = containerElem.getElementsByTagName( 'button' )[0];
            buttonElem.click();
            await wait();

            expect( containerElem.innerHTML ).toEqual( '<div><div>Hello Monster Hunter!</div><button>set name</button></div>' );
        } );
    } );

Object.entries( getSupportedFrameworks() ).forEach( ( [ name, createApp ] ) => _testSuite( name, createApp ) );
