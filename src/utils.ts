/* eslint-env es6 */

import type {
    ComponentDef,
    ComponentElement,
    Primitive,
    Props,
    Model,
    DispatchInput,
    Component,
    ActionMap,
    ActionDef,
    ActionDefMap
} from './types';

import lodashGet from 'lodash/get';
import { vModelCheckbox } from 'vue';

export const BaseIndent = '  ';

// DOM Node type in browser
export const Node = {
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11
};

export const get = lodashGet;

/**
 * escape string as regex input
 * https://stackoverflow.com/questions/6828637/escape-regexp-strings
 *
 * @param str input string
 * @returns output string with regular expression escaped
 */
export const escapeRegExp = ( str: string ): string => {
    return str.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' ); // $& means the whole matched string
};

/**
 * convert string like 'MyButton' to 'my-button'
 *
 * @param str input string as 'MyButton'
 * @returns output string as 'my-button'
 */
export const camelCaseToHyphen = ( str: string ): string => {
    return str.replace( /^./, str[0].toLowerCase() ).replace( /([A-Z])/g, ( fullMatch, firstMatch ) => `-${firstMatch.toLowerCase()}` );
};

/**
 * convert sting like 'my-button' to 'MyButton'
 *
 * @param str input string as 'my-button'
 * @returns output string as 'MyButton'
 */
export const hyphenToCamelCase = ( str: string ): string => {
    return str.replace( /^./, str[0].toUpperCase() ).replace( /-(.)/g, ( fullMatch, firstMatch ) => firstMatch.toUpperCase() );
};


/**
 * Parse view string as DOM without interpret it. Browser version
 *
 * @param input view template as string
 * @returns DOM Node as result
 */
export const parseView = ( input: string ): Node => {
    const parser = new DOMParser();
    const fragment = document.createDocumentFragment();
    fragment.appendChild( parser.parseFromString( `<div>${input}</div>`, 'text/html' ).body.firstChild || document.createElement( 'div' ) );
    return fragment.firstChild || document.createElement( 'div' );
};

/**
 * Bind arguments starting after however many are passed in.
 * https://stackoverflow.com/questions/27699493/javascript-partially-applied-function-how-to-bind-only-the-2nd-parameter
 *
 * @param fn function needs to bind with arguments
 * @param boundArgs arguments will be bound at then end of the function interface
 * @returns new function with bindings
 */
export const bindTrailingArgs = ( fn: Function, ...boundArgs: unknown[] ): Function => {
    return function( ...args: unknown[] ): unknown {
        return fn( ...args, ...boundArgs );
    };
};

/**
 * Polyfill to match dynamic import result back to ES5 supported module
 *
 * @param obj - function to evaluate after loading the dependencies.
 * @returns ES5 module object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const interopES6Default = ( obj: any ): any => {
    return obj && obj.__esModule && obj.default ? obj.default : obj;
};


/**
 * format dom node with indentoin
 * https://stackoverflow.com/questions/26360414/javascript-how-to-correct-indentation-in-html-string
 *
 * @param node DOM Node
 * @param level indention level
 * @returns element has been beautified
 */
const formatNode = ( node: Node, level = 0 ): Node => {
    /*
    var indentBefore = new Array( level++ + 1 ).join( '  ' );
        var indentAfter  = new Array( level - 1 ).join( '  ' );
        var textNode;
    */
    const tmpNode = ( level && node.parentNode ? node.parentNode : node ).cloneNode() as Element;
    tmpNode.innerHTML = `\n${BaseIndent.repeat( level + 1 )}<div></div>\n${BaseIndent.repeat( level )}`;
    const indentBefore = tmpNode.firstChild;
    const indentAfter = tmpNode.lastChild;

    let childCount = node.childNodes.length;
    if ( childCount > 0 && indentBefore && indentAfter ) {
        let idx = 0;
        while ( idx < childCount ) {
            const currNode = node.childNodes[idx];
            if ( currNode.nodeType === Node.ELEMENT_NODE ) {
                node.insertBefore( indentBefore.cloneNode(), currNode );
                formatNode( currNode, level + 1 );
                if ( node.lastChild === currNode ) {
                    node.appendChild( indentAfter.cloneNode() );
                    idx = childCount;
                } else {
                    idx += 2;
                    childCount++;
                }
            } else if ( currNode.nodeType === Node.TEXT_NODE ) {
                const textContent = ( currNode.nodeValue || '' ).trim();
                if ( textContent ) {
                    node.insertBefore( indentBefore.cloneNode(), currNode );
                    currNode.nodeValue = textContent;
                    if ( node.lastChild === currNode ) {
                        node.appendChild( indentAfter.cloneNode() );
                        idx = childCount;
                    } else {
                        idx += 2;
                        childCount++;
                    }
                } else {
                    currNode.nodeValue = textContent;
                    if ( node.lastChild === currNode ) {
                        node.appendChild( indentAfter.cloneNode() );
                    }
                    idx++;
                }
            } else {
                idx++;
            }
        }
    }
    return node;
};

/**
 * print dom node to string for display purpose
 * TODO:
 * - it may break <pre> tag for now, we can tune it later
 * - For text node with \n it is not handled correctly
 *
 * @param node DOM Node
 * @returns HTML as String
 */
export const printDomNode = ( node: Node ): string => {
    const elem = formatNode( node ) as Element;
    return elem.outerHTML;
};


/**
 * simple http get.
 *
 * @param theUrl url as string
 * @returns promise with response text
 */
export const httpGet = ( theUrl: string ): Promise<string> => {
    return new Promise( ( resolve, reject ) => {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function(): void {
            if ( xmlHttp.readyState === 4 && xmlHttp.status === 200 ) {
                resolve( xmlHttp.responseText );
            }
        };

        xmlHttp.onerror = function( e ): void {
            reject( e );
        };

        xmlHttp.open( 'GET', theUrl, true ); // true for asynchronous
        xmlHttp.send( null );
    } );
};

/**
 *
 * Returns Base URL for the current application
 *
 * @returns Base URL for the current application's root 'document' without any query or location attributes
 *          and (if otherwise valid) with a trailing '/' assured.
 */
export const getBaseURL: { (): string; _baseURL?: string } = () => {
    if ( !getBaseURL._baseURL ) {
        // strip 'index.html' from end of pathname if present
        const location = window.location;

        const pathname = location.pathname;

        // IE11 on Windows 10 doesn't have 'location.origin' object
        const origin = location.origin || location.protocol + '//' + location.hostname +
            ( location.port ? ':' + location.port : '' );

        getBaseURL._baseURL = origin + pathname.substring( 0, pathname.lastIndexOf( '/' ) + 1 );
    }

    return getBaseURL._baseURL;
};

/**
 * Check value type is primitive or not
 * @param val input value
 * @returns true if input is number or string
 */
export const isPrimitive = ( val: unknown ): boolean => {
    const type = typeof val;
    return type === 'number' || type === 'string' || type === 'boolean';
};

export const isArray = Array.isArray;

export const isObject = ( val: unknown ): boolean => val && !isPrimitive( val ) && !isArray( val );


/**
 * parse expr ${aa.bb}} to get aa.bb
 * @param str input string
 * @returns the expression inside ${}
 */
export const parseExpr = ( str: string ): string => {
    const match = str.match( /^\${(.*)}$/ );
    return match ? match[1] : '';
};

/**
 * fastest way to copy a pure JSON object, use on your own risk
 * https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
 *
 * @param input JSON object as input
 * @returns JSON object
 */
export const cloneJson = ( input: JSON ): JSON => {
    return input ? JSON.parse( JSON.stringify( input ) ) : input;
};

/**
 * check if type is ComponentDef. use ComponentDef.init() to detect
 * @param type component type
 * @returns true if type is component def.
 */
export const isComponentDef = ( type: string | ComponentDef<unknown> ): type is ComponentDef<unknown> => {
    const componeDef = type as ComponentDef<unknown>;
    return componeDef && (
        typeof componeDef.init === 'function' ||
        typeof componeDef.view === 'function' ||
        typeof componeDef.render === 'function' ||
        typeof componeDef.mount === 'function'
    );
};

/**
 * check if type is ComponentDef. use ComponentDef.init() to detect
 * @param value component type
 * @returns true if type is promise.
 */
export const isPromise = ( value: unknown ): value is Promise<unknown> => {
    const val = value as Promise<unknown>;
    return val && val.then && typeof val.then === 'function';
};

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

// magical type script overload.....
export function defineComponent<T extends Props>(
    componentDef: ComponentDef<T>
): ComponentElement<T>


/**
 * Wrapper function for JSX
 * @param componentDef componentDef
 * @returns componentDef
 */
export function defineComponent<T>( componentDef: T ): T {
    return componentDef;
}

// magical type script overload.....
export function defineComponent2<T extends Props>(
    componentDef: ComponentDef<T>
): JSX.Element

/**
 * Wrapper function for JSX
 * @param componentDef componentDef
 * @returns componentDef
 */
export function defineComponent2<T>( componentDef: T ): T {
    return componentDef;
}


export const AsyncH = defineComponent( {
    name: 'AsyncH',
    init: async() => ( {
        content: 'loading...'
    } ),
    mount: async( { props, dispatch } ) => void dispatch( { path: 'content', value: await ( props as { fn: Function} ).fn() } ),
    view: h => ( { model } ): JSX.Element => h( h.Fragment, null, model.content )
} );

/**
 * Get input value from input element
 * @param elem input element
 * @returns input value as either number, string or boolean
 */
export const getInputValue = ( elem: HTMLInputElement ): Primitive => {
    if ( elem.type === 'checkbox' ) {
        return elem.checked;
    } else if ( elem.type === 'number' ) {
        return Number( elem.value );
    }
    return elem.value;
};


export const mapDispatch = ( dispatch: Function, scope: string ) =>
    ( { path, value }: DispatchInput ): void => dispatch( {
        path: `${scope}.${path}`,
        value
    } );

    /*
export const mapAction = <T>(
    model: Model,
    dispatch: {( { path, value }: DispatchInput ): void },
    actionDef: ActionDef<T> ): {( ...args: any[] ): void} => {
    return ( ...args: any[] ): void => actionDef( { model, dispatch }, ...args );
};
*/

export const mapAction = <T>( actionDef: ActionDef<T>, component: Component<T> ): {( ...args: any[] ): void} => {
    return ( ...args: any[] ): void => actionDef( component, ...args );
};

export const mapComponent = <T>( component: Component<T>, actionDefs: ActionDefMap<T> ): Component<T> => {
    // TODO: we can have more check like if(!component.actions[key]){ //do map } to provide more flexibility
    component.actions = Object.entries( actionDefs ).reduce( ( sum, [ key, actionDef ] ) => {
        sum[key] = ( ...args: any[] ): void => actionDef( component, ...args );
        return sum;
    }, {} as ActionMap );
    return component;
};


