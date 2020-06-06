/* eslint-env jest */

import {
    App, ComponentDef
} from '../src/types';

import {
    wait,
    enableMockTimer,
    getSupportedFrameworks
} from './utils';
import PropExample from './components/PropExample';

enableMockTimer();

// Test
const _testSuite = ( name: string, createApp: Function ): void =>
    describe( `PropExample test on ${name}`, () => {
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

        it( `PropExample on ${name}`, async() => {
            app = createApp( PropExample ).mount( containerElem );

            const buttonElem = document.getElementById( 'button' );
            const resultElem = buttonElem.parentElement.firstElementChild;

            expect( resultElem.textContent ).toEqual( 'Hello value 7!' );

            buttonElem.click();
            await wait();

            // it is creating a new DOM which may be wrong
            const resultElem2 = buttonElem.parentElement.firstElementChild;
            expect( resultElem2.textContent ).toEqual( 'Hello value 8!' );
        } );
    } );

Object.entries( getSupportedFrameworks() ).forEach( ( [ name, createApp ] ) => _testSuite( name, createApp ) );
