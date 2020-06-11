/* eslint-env jest */

import {
    wait,
    setupComponentTest,
    getSupportedFrameworks
} from './utils';
import Component from './components/PropsSubscriptionExample';

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

            // init
            expect( containerElem.innerHTML ).toEqual( [
                '<div>',
                  '<div>',
                    '<div>Name: Ed Stark</div>',
                    '<div>Address: undefined</div>',
                  '</div>',
                  '<button id="changeFamily">change</button>',
                '</div>'
            ].join( '' ) );

            // loading
            await wait();
            expect( containerElem.innerHTML ).toEqual( [
                '<div>',
                  '<div>',
                    '<div>Name: Ed Stark</div>',
                    '<div>Address: loading...</div>',
                  '</div>',
                  '<button id="changeFamily">change</button>',
                '</div>'
            ].join( '' ) );

            // load complete
            await wait( 1000 );
            expect( containerElem.innerHTML ).toEqual( [
                '<div>',
                  '<div>',
                    '<div>Name: Ed Stark</div>',
                    '<div>Address: winter fall</div>',
                  '</div>',
                  '<button id="changeFamily">change</button>',
                '</div>'
            ].join( '' ) );

            // click switch click button
            const button = document.getElementById( 'changeFamily' );
            button.click();
            await wait();
            expect( containerElem.innerHTML ).toEqual( [
                '<div>',
                  '<div>',
                    '<div>Name: Ed Tully</div>',
                    '<div>Address: loading...</div>',
                  '</div>',
                  '<button id="changeFamily">change</button>',
                '</div>'
            ].join( '' ) );

            // change done
            await wait( 1000 );
            expect( containerElem.innerHTML ).toEqual( [
                '<div>',
                  '<div>',
                    '<div>Name: Ed Tully</div>',
                    '<div>Address: river run</div>',
                  '</div>',
                  '<button id="changeFamily">change</button>',
                '</div>'
            ].join( '' ) );
        } );
    } );

// debug: comment this line
Object.entries( getSupportedFrameworks() ).forEach( ( [ name, createApp ] ) => _testSuite( name, createApp ) );
