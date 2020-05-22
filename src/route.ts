/* eslint-env es6 */
/**
 * Routing Service
 * https://github.com/Few-UI/few-custom-element/blob/master/src/few-route-service.js
 * https://github.com/riot/route/blob/master/src/index.js
 */
import { getBaseURL } from './utils';

let _started = false;
const RE_ORIGIN = /^.+?\/\/+[^/]+/;
const win = typeof window !== 'undefined' && window;
const loc = win && win.location; // see html5-history-api

const POPSTATE = 'popState';
const HASHCHANGE = 'hashchange';
const HASH = '#';

let _routingUnits = [];
let states;

let currState;


/**
 * Default parser. You can replace it via router.parser method.
 * @param {string} path - current path (normalized)
 * @returns {array} array
 */
function DEFAULT_PARSER( path ) {
    return path.split( /[/?#]/ );
}

/**
 * Get the part after domain name
 * @param href - fullpath
 * @returns path from root
 */
const getPathFromRoot = ( href: string ): string => {
    return ( href || loc.href ).replace( RE_ORIGIN, '' );
};


/**
 * Get the part after base
 * @param href - fullpath
 * @returns path from base
 */
export const getPathFromBase = ( href: string ): string => {
    const base = '#';
    return base[ 0 ] === '#' ?
        ( href || loc.href || '' ).split( base )[ 1 ] || '' :
        ( loc ? getPathFromRoot( href ) : href || '' ).replace( base, '' );
};

/**
 * Match state with pre-defined pattern
 * @param allMatchedState allMatchedState
 * @param state state
 * @param states states
 */
const updateStateHierarchy = ( allMatchedState: string[], state: any, states: any[] ): string[] => {
    if( !states[ state.parent ] ) {
        allMatchedState.push( state );
        return;
    }
    updateStateHierarchy( allMatchedState, states[ state.parent ], states );
    allMatchedState.push( state );
};

/**
 * math url with pre-defined pattern
 * @param pattern pattern as string
 * @param urlParamStr input url
 * @returns true if url matches
 */
export function matchUrl( pattern: string, urlParamStr: string ): boolean {
    return pattern === urlParamStr;
}

/**
 * Get Updated query params from url
 * @param url url
 * @param params query params
 * @returns updated params
 */
const getUpdatedQueryParams = ( url: string, params: any ): any => {
    if( url.includes( '?' ) ) {
        const paramsArr = url.split( '?' )[ 1 ].split( '&' );
        const res = {};
        paramsArr.forEach( paramStr => {
            const paramKey = paramStr.split( '=' )[ 0 ];
            const paramValue = paramStr.split( '=' )[ 1 ];
            if( params[ paramKey ] ) {
                res[ paramKey ] = paramValue;
            }
        } );
        return res;
    }
    return params;
};


/**
 * Match state with pre-defined pattern
 * @param states states
 * @param urlParamStr input url
 * @returns result
 */
export const getMatchedStateData = ( states: any[], urlParamStr: string ): any => {
    for( const state in states ) {
        const result: any = {};
        const allMatchedState = [];
        updateStateHierarchy( allMatchedState, states[ state ], states );
        const finalURL = allMatchedState.map( ( elem ) => elem.path ).join( '' );
        result.stateHierarchies = allMatchedState;
        result.currentState = states[ state ];
        result.finalURL = finalURL;
        //handle query_params and update params
        let urlToMatch = urlParamStr;
        if( urlParamStr && result.currentState.params ) {
            urlToMatch = urlParamStr.split( '?' )[ 0 ];
            if( matchUrl( finalURL, urlToMatch ) ) {
                result.currentState.params = getUpdatedQueryParams( urlParamStr, result.currentState.params );
            }
        }
        if( matchUrl( finalURL, urlToMatch ) ) {
            return result;
        }
    }
};

/**
 * Navigate to state
 * https://ui-router.github.io/ng1/docs/0.3.1/index.html#/api/ui.router.state.$state#methods_go
 * @param to state name
 * @param params params
 * @param options options
 */
export function go( to: string, params: string[], options: any ): void {
    //build URL
    const allMatchedState = [];
    if( states[ to ] ) {
        updateStateHierarchy( allMatchedState, states[ to ], states );
        let toURL = allMatchedState.map( ( elem ) => elem.path ).join( '' );
        toURL = `${getBaseURL()}${HASH}${toURL}`;
        states[ to ].params = states[ to ].params ? states[ to ].params : {};
        // handle params
        if( params ) {
            //query params
            if( states[ to ].params && !states[ to ].path.includes( '/:' ) ) {
                toURL += '?';
                for( const key in params ) {
                    toURL += key + '=' + params[ key ];
                }
                //resolve query params
                states[ to ].params = getUpdatedQueryParams( toURL, states[ to ].params );
            }

            //TODO lets resolve the params in URL.. example- "url": "/:parentCategory/:category"
            if( states[ to ].path.split( '/:' ).length > 1 ) {
                states[ to ].path.split( '/:' ).forEach( param => {
                    if( param ) {
                        toURL = toURL.replace( `:${param}`, params[ param ] );
                        states[ to ].params[ param ] = params[ param ];
                    }
                } );
            }
        }

        win.history.pushState( {}, to, toURL );

        //handle options
        if( options && options.reload ) {
            location.reload();
        }
    } else {
        // state not found
    }
}

/**
 * internal method to process URL
 * @param url current URL transit to
 */
const _processURL = ( url: string ): void => {
    // let urlStruct = DEFAULT_PARSER( getPathFromBase( url ) );
    const urlParam = getPathFromBase( url );
    for( const unit in _routingUnits ) {
        const routingComponent = _routingUnits[ unit ];
        if( states && Object.keys( states ).length > 0 ) {
            if( !urlParam ) {
                //TODO: get the default state name from workspace
                const defaultStateName = Object.keys( states )[ 0 ];
                currState = states[ defaultStateName ];
                go( defaultStateName, currState.params, { reload:true } );
            } else {
                let newState = null;
                const params = {};
                const matchedStateData = getMatchedStateData( states, urlParam );

                if( matchedStateData ) {
                    newState = matchedStateData.currentState;
                }

                // process state
                if( newState ) {
                    // TODO: we can do view based routing:
                    // - if currState.view === newState.view, update data
                    // - else switch view
                    if( currState === newState ) {
                        // TODO: update param and set state
                        // this._component.updateModel( params );
                    } else {
                        const model = {};
                        for( const key in params ) {
                            // set( model, key, params[key] );
                        }
                        const prevState = currState;
                        currState = newState;
                        routingComponent.updateState( { currState, prevState, urlParam } );
                    }
                } else {
                    // state not found
                }
            }
        }
    }
};

/**
 * internal handler for locationChange event
 * @param event event raised by location change
 * @returns void...looks like a eslint bug for () => expr
 */
const locationChangeHandler = ( event: CustomEvent ): void => _processURL( event.detail.newURL );

/**
 * Set the window listeners to trigger the routes
 * @param autoExec - see route.start
 */
const addWindowListener = (): void => {
    history.pushState = ( f => function pushState( ...args: any[] ): any {
        const ret = f.apply( this, args );
        // win.dispatchEvent( new Event( 'pushstate' ) );
        win.dispatchEvent( new CustomEvent( 'locationchange', { detail: { oldURL: location.href, newURL: location.origin + args[ 2 ] } } ) );
        return ret;
    } )( history.pushState );

    history.replaceState = ( f => function replaceState( ...args: any[] ): any {
        const ret = f.apply( this, args );
        // win.dispatchEvent( new Event( 'replacestate' ) );
        win.dispatchEvent( new CustomEvent( 'locationchange', { detail: { oldURL: location.href, newURL: location.origin + args[ 2 ] } } ) );
        return ret;
    } )( history.replaceState );

    // instead of popstate hashchange gives the old and new url information.
    // win.addEventListener( 'popstate', () => {
    //     win.dispatchEvent( new Event( 'locationchange' ) );
    // } );

    // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onhashchange
    win.addEventListener( HASHCHANGE, ( e ) => {
        win.dispatchEvent( new CustomEvent( 'locationchange', { detail: { oldURL: e.oldURL, newURL: e.newURL } } ) );
    } );

    win.addEventListener( 'locationchange', locationChangeHandler );
};


/**
 * Start client router service
 */
const start = (): void => {
    if( !_started ) {
        if( win ) {
            if( document.readyState === 'interactive' || document.readyState === 'complete' ) {
                addWindowListener( /*autoExec*/ );
            } else {
                document.onreadystatechange = (): void => {
                    if( document.readyState === 'interactive' ) {
                        // the timeout is needed to solve
                        // a weird safari bug https://github.com/riot/route/issues/33
                        setTimeout( function() { addWindowListener( /*autoExec*/ ); }, 1 );
                    }
                };
            }
        }
        _started = true;
    }
};

/**
 * Stop client router service
 */
const stop = (): void => {
    if( _started ) {
        if( win ) {
            // win.removeEventListener( POPSTATE, _processURL );
            win.removeEventListener( 'locationchange', locationChangeHandler );
        }
        _started = false;
    }
};

/**
 * register router element
 * @param unit route unit
 * @param allStates unknown....
 */
export const register = ( unit: any, allStates: any ): void => {
    if( _routingUnits.length === 0 ) {
        start();
    }
    states = allStates;
    _routingUnits.push( unit );

    // init current element
    _processURL( document.URL );
};

/**
 * unregister router element
 * @param {Element} unit router process unit
 */
export const unregister = ( unit: any ): void => {
    // do nothing
    _routingUnits = _routingUnits.filter( u => u !== unit );

    if( _routingUnits.length === 0 ) {
        stop();
    }
};


