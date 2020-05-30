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


