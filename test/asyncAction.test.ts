/* eslint-env jest */

import {
    App
} from '../src/types';

import {
    wait,
    trimHtmlComments,
    getSupportedFrameworks
} from './utils';
import AsyncActionExample from './components/AsyncActionExample';

jest.useFakeTimers();

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
            app = createApp( AsyncActionExample ).mount( containerElem );
            expect( trimHtmlComments( containerElem.innerHTML ) ).toEqual( [
                '<div>',
                  '<button id="button1">value1</button>',
                  '<div id="value1"></div>',
                  '<button id="button2">value2</button>',
                  '<div id="value2"></div>',
                  '<button id="button3">value3</button>',
                  '<div id="value3"></div>',
                '</div>'
            ].join( '' ) );

            // await is not required for react case
            const buttonElem1 = document.getElementById( 'button1' );
            const buttonElem2 = document.getElementById( 'button2' );
            const buttonElem3 = document.getElementById( 'button3' );

            buttonElem3.click();
            await wait( 1000 );
            buttonElem1.click();
            await wait( 1000 );
            buttonElem2.click();
            await wait( 1500 );

            expect( trimHtmlComments( containerElem.innerHTML ) ).toEqual( [
                '<div>',
                  '<button id="button1">value1</button>',
                  '<div id="value1">value1</div>',
                  '<button id="button2">value2</button>',
                  '<div id="value2">value2</div>',
                  '<button id="button3">value3</button>',
                  '<div id="value3">value3</div>',
                '</div>'
            ].join( '' ) );
        } );
    } );

Object.entries( getSupportedFrameworks() ).forEach( ( [ name, createApp ] ) => _testSuite( name, createApp ) );
