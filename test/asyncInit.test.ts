/* eslint-env jest */


import {
    App
} from '../src/types';

import {
    wait,
    enableMockTimer,
    getSupportedFrameworks
} from './utils';

import AsyncInitExample from './components/AsyncInitExample';

enableMockTimer();

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

    it( `AsyncInitExample on ${name}`, async() => {
        app = createApp( AsyncInitExample ).mount( containerElem );
        expect( containerElem.innerHTML ).toEqual( [
            '<pre>{}</pre>'
        ].join( '' ) );

        await wait( 1000 );

        expect( containerElem.innerHTML ).toEqual( [
            '<pre>{"asyncVal":"asyncVal"}</pre>'
        ].join( '' ) );
    } );
} );

Object.entries( getSupportedFrameworks() ).forEach( ( [ name, createApp ] ) => _testSuite( name, createApp ) );
