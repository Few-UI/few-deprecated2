/* eslint-env jest */
// https://github.com/testing-library/dom-testing-library/blob/master/src/event-map.js
import {
    createApp as createReactApp
} from '../src/reactPolyfill';

import {
    createApp as createVueApp
} from '../src/vuePolyfill';

import ActionExample from '../src/components/ActionExample';


import { render, fireEvent, screen } from '@testing-library/react';

const wait = ( elapsed = 0 ): Promise<{}> => {
    return new Promise( resolve => setTimeout( () => {
        resolve( null );
    }, elapsed ) );
};


describe( 'Test dummy', () => {
    xit( 'ActionExample (react)', async() => {
        const elem = document.createElement( 'dix' );
        const app = createReactApp( ActionExample );
        app.mount( elem );
        expect( elem.outerHTML ).toEqual( '<dix><div><div>current number: 7</div><button>+1</button></div></dix>' );

        const buttonElem = elem.getElementsByTagName( 'button' )[0];
        buttonElem.dispatchEvent( new MouseEvent( 'click', {
            bubbles: true,
            cancelable: true,
            button: 0,
            composed: true
        } ) );
        // buttonElem.click();
        // buttonElem.onclick( new MouseEvent( 'click' ) );

        await wait();

        expect( elem.outerHTML ).toEqual( '<dix><div><div>current number: 8</div><button>+1</button></div></dix>' );
    } );

    it( 'ActionExample (vue)', async() => {
        const elem = document.createElement( 'dix' );
        const app = createVueApp( ActionExample );
        app.mount( elem );
        expect( elem.outerHTML ).toEqual( '<dix><div><div>current number: 7</div><button>+1</button></div></dix>' );

        const buttonElem = elem.getElementsByTagName( 'button' )[0];
        buttonElem.dispatchEvent( new MouseEvent( 'click', {
            bubbles: true,
            cancelable: true,
            button: 0,
            composed: true
        } ) );
        // buttonElem.click();
        // buttonElem.onclick( new MouseEvent( 'click' ) );

        await wait( 0 );

        expect( elem.outerHTML ).toEqual( '<dix><div><div>current number: 8</div><button>+1</button></div></dix>' );
    } );

    it( 'DOM test example', () => {
        const elem = document.createElement( 'dix' );
        elem.innerHTML = '<input type="checkbox" >';

        const checkElem = elem.firstChild as HTMLInputElement;
        expect( checkElem.checked ).toEqual( false );
        /*
        this is working too
        checkElem.dispatchEvent( new MouseEvent( 'click', {
            bubbles: true,
            cancelable: true,
            button: 0,
            composed: true
        } ) );
        */
       checkElem.click();

        expect( checkElem.checked ).toEqual( true );
    } );
} );

