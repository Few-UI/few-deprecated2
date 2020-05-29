/* eslint-env es6 */

// available frame work
import {
    CreateAppFunction
} from '../src/types';

import { createApp as createReactApp } from '../src/reactPolyfill';
import { createApp as createVueApp } from '../src/vuePolyfill';

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
    return new Promise( resolve => setTimeout( () => {
        resolve( null );
    }, elapsed ) );
};

/**
 * trim comments in HTML string
 * @param str HTML string
 * @returns HTML string without comments
 */
export const trimHtmlComments = ( str: string ): string =>
    str.replace( /<!--.*?-->/g, '' );


