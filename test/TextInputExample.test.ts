/* eslint-env jest */

import {
    wait,
    setupComponentTest,
    typeToInputElement,
    getSupportedFrameworks
} from './utils';
import Component from './components/TextboxExample';

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

            // await is not required for react case
            const textElem = document.getElementById( 'text' ) as HTMLInputElement;
            const resultElem = document.getElementById( 'result' );

            // not checking innerHTML since different framework presents input.value
            // attribute in different way.
            expect( textElem.value ).toEqual( 'Monster Hunter' );
            expect( resultElem.innerHTML ).toEqual( 'Monster Hunter' );

            typeToInputElement( textElem, 'b' );
            await wait();

            expect( textElem.value ).toEqual( 'Monster Hunterb' );
            expect( resultElem.innerHTML ).toEqual( 'Monster Hunterb' );
        } );
    } );

// debug: comment this line
Object.entries( getSupportedFrameworks() ).forEach( ( [ name, createApp ] ) => _testSuite( name, createApp ) );
