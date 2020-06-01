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
    getSupportedFrameworks
} from './utils';
import SyncActionExample from './components/SyncActionExample';

jest.useFakeTimers();

// Test
const _testSuite = ( name: string, createApp: Function ): void =>
    describe( `SyncActionExample test on ${name}`, () => {
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
            app = createApp( SyncActionExample ).mount( containerElem );
            expect( containerElem.innerHTML ).toEqual( '<div><div>current number: 7</div><button>+1</button></div>' );

            // await is not required for react case
            const buttonElem = containerElem.getElementsByTagName( 'button' )[0];
            buttonElem.click();
            await wait();

            expect( containerElem.innerHTML ).toEqual( '<div><div>current number: 8</div><button>+1</button></div>' );
        } );
    } );

Object.entries( getSupportedFrameworks() ).forEach( ( [ name, createApp ] ) => _testSuite( name, createApp ) );
