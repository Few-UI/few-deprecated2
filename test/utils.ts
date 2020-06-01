/* eslint-env jest */

// available frame work
import {
    CreateAppFunction
} from '../src/types';

import { createApp as createReactApp } from '../src/reactPolyfill';
import { createApp as createVueApp } from '../src/vuePolyfill';

import { act } from 'react-dom/test-utils';

export const getSupportedFrameworks = (): { [key: string]: CreateAppFunction } => ( {
    react: createReactApp,
    vue: createVueApp
} );

/**
 * wait for elapsed time and return a promise
 * @param elapsed elapsed time
 * @returns promise
 */
export const wait = ( elapsed = 0 ): Promise<{}> => {
    // act is react-dom/jest specific but harmless to other framework
    act( () => jest.advanceTimersByTime( elapsed ) );
    return Promise.resolve( {} );
    /*
    native impl
    return new Promise( resolve => setTimeout( () => {
        resolve( null );
    }, elapsed ) );
    */
};

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
