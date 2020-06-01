/* eslint-env jest */

import {
    App
} from '../src/types';

import {
    wait,
    setValueToInputElement,
    getSupportedFrameworks
} from './utils';
import TextboxExample from './components/TextboxExample';

jest.useFakeTimers();

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

        // https://github.com/jsdom/jsdom/commit/ea6a2e4143cf67e30b528eb32d7b6c0b88595846
        // inputElem.value = 'a' will not change DOM but brower will interpret it correclty
        it( `TextboxExample on ${name}`, async() => {
            app = createApp( TextboxExample ).mount( containerElem );

            // await is not required for react case
            const textElem = document.getElementById( 'text' ) as HTMLInputElement;
            const resultElem = document.getElementById( 'result' );

            // not checking innerHTML since different framework presents input.value
            // attribute in different way.
            expect( textElem.value ).toEqual( 'Monster Hunter' );
            expect( resultElem.innerHTML ).toEqual( 'Monster Hunter' );

            setValueToInputElement( textElem, textElem.value + 'b' );

            textElem.dispatchEvent( new InputEvent( 'input', {
                bubbles: true,
                cancelable: false,
                inputType: 'insertText',
                data: 'b'
            } ) );
            /*
            // change event is OK on react, but not vue
            textElem.dispatchEvent( new Event( 'change', {
                bubbles: true,
                cancelable: false,
                composed: false
            } ) );
            */

            await wait();

            expect( textElem.value ).toEqual( 'Monster Hunterb' );
            expect( resultElem.innerHTML ).toEqual( 'Monster Hunterb' );
        } );
    } );

Object.entries( getSupportedFrameworks() ).forEach( ( [ name, createApp ] ) => _testSuite( name, createApp ) );
