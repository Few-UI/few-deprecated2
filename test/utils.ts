/* eslint-env jest */

// available frame work
import {
    App,
    CreateAppFunction
} from '@/types';

import { createApp as createReactApp } from '@/reactPolyfill';
import { createApp as createVueApp } from '@/vuePolyfill';

import { act } from 'react-dom/test-utils';


export const getSupportedFrameworks = (): { [key: string]: CreateAppFunction } => ( {
    react: createReactApp,
    vue3: createVueApp
} );

let _mockTimerEnabled = false;

/**
 * enable mock timer
 */
export const enableMockTimer = (): void => {
    _mockTimerEnabled = true;
    jest.useFakeTimers();
};

export const setupComponentTest = ( skipMockTimer?: boolean ): {
    app: App;
    container: HTMLElement;
} => {
    const fixture = {
        app: null as App,
        container: null as HTMLElement
    };

    beforeEach( () => {
        fixture.container = document.createElement( 'div' );
        document.body.appendChild( fixture.container );
    } );

    afterEach( () => {
        const { app, container } = fixture;
        if ( app ) {
            app.unmount( container );
        }
        document.body.removeChild( container );

        fixture.app = null;
        fixture.container = null;
    } );

    if( !skipMockTimer ) {
        enableMockTimer();
    }

    return fixture;
};

/**
 * wait for elapsed time and return a promise
 * Note: act is react-dom/jest specific but harmless to other framework
 *
 * @param elapsed elapsed time
 * @returns promise
 */
export const wait = ( elapsed = 0 ): Promise<void> => act( (): Promise<void> => {
    if ( _mockTimerEnabled ) {
        jest.advanceTimersByTime( elapsed );
        return Promise.resolve();
    }

    // real timer
    return new Promise( resolve => setTimeout( resolve, elapsed ) );
} );

/**
 * trim comments in HTML string
 * @param str HTML string
 * @returns HTML string without comments
 */
export const trimHtmlComments = ( str: string ): string =>
    str.replace( /<!--.*?-->/g, '' );


/**
 * Set value to input tag
 * https://github.com/testing-library/dom-testing-library/blob/b31c0b9907acab6f1ea2b4f01c6e99f28db19bd6/src/events.js#L83
 * @param element Input Element
 * @param value string
 */
export const setValueToInputElement = ( element: HTMLInputElement, value: string ): void => {
    const {
        set: valueSetter
    } = Object.getOwnPropertyDescriptor( element, 'value' ) || {};
    const prototype = Object.getPrototypeOf( element );
    const {
        set: prototypeValueSetter
    } = Object.getOwnPropertyDescriptor( prototype, 'value' ) || {};

    if ( prototypeValueSetter && valueSetter !== prototypeValueSetter ) {
        prototypeValueSetter.call( element, value );
        /* istanbul ignore next (I don't want to bother) */
    } else if ( valueSetter ) {
        valueSetter.call( element, value );
    } else {
        throw new Error( 'The given element does not have a value setter' );
    }
};
