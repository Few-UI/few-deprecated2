/* eslint-env jest */

import {
    wait,
    setupComponentTest,
    getSupportedFrameworks
} from './utils';
import Component from './components/PropsExample';

// debug: enable this line
// const createApp = getSupportedFrameworks().react;

// debug: comment this line
const _testSuite = ( name: string, createApp: Function ): void =>
    // debug: enable this line
    // describe( 'debug specific suite', () => {
    describe( `${Component.name} test on ${name}`, () => {
        const fixture = setupComponentTest();

        // debug: enable this line
        // it( 'debug specific test', async() => {
        it( `${Component.name} test on ${name}`, async() => {
            const containerElem = fixture.container;
            fixture.app = createApp( Component ).mount( containerElem );

            const buttonElem = document.getElementById( 'button' );
            const resultElem = buttonElem.parentElement.firstElementChild;

            expect( resultElem.textContent ).toEqual( 'Hello value 7!' );

            buttonElem.click();
            await wait();

            // it is creating a new DOM which may be wrong
            expect( resultElem.textContent ).toEqual( 'Hello value 8!' );
        } );
    } );

// debug: comment this line
Object.entries( getSupportedFrameworks() ).forEach( ( [ name, createApp ] ) => _testSuite( name, createApp ) );
