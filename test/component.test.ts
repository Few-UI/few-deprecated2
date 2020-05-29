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

 // frameworks
import { createApp as createReactApp } from '../src/reactPolyfill';
import { createApp as createVueApp } from '../src/vuePolyfill';
const _frameworks = {
    react: createReactApp,
    vue: createVueApp
};

import { wait } from './utils';
import ActionExample from '../src/components/ActionExample';

const _testSuite = ( name: string, createApp: Function ) => void
    describe( `Component test on ${name}`, () => {
        let app;
        let containerElem;

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

        it( 'ActionExample (react)', async() => {
            app = createApp( ActionExample );
            app.mount( containerElem );
            expect( containerElem.innerHTML ).toEqual( '<div><div>current number: 7</div><button>+1</button></div>' );

            const buttonElem = containerElem.getElementsByTagName( 'button' )[0];

            // await is not required for react case
            buttonElem.click();
            await wait();

            expect( containerElem.innerHTML ).toEqual( '<div><div>current number: 8</div><button>+1</button></div>' );
        } );
    } );

Object.entries( _frameworks ).forEach( ( [ name, createApp ] ) => _testSuite( name, createApp ) );
