/* eslint-env jest */

import {
    App
} from '../src/types';

import {
    wait,
    trimHtmlComments,
    getSupportedFrameworks
} from './utils';

import NewKeyDispatchExample from './components/NewKeyDispatchExample';

jest.useFakeTimers();

// Test
const _testSuite = ( name: string, createApp: Function ): void =>
    describe( `NewKeyDispatchExample test on ${name}`, () => {
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
