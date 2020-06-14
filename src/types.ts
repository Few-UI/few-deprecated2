
/**
 * https://github.com/SunshowerC/blog/issues/7
 * https://github.com/microsoft/TypeScript/issues/1897
 * https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md#type
 * https://stackoverflow.com/questions/53718296/index-d-ts-vs-normal-type-file
 *
 * // for now just sit on react
 */

// Model
export interface Model {
    [key: string]: object | string | number | boolean | HTMLElement;
}

// Ref
export interface Ref {
    ( key: string ): ( el: HTMLElement ) => void;
    [key: string]: HTMLElement;
}

// Component
export interface Component {
    model: Model;
    dispatch: Function;
    ref: Ref;
    props: { [key: string]: any};
    h: Function;
    actions?: {
        [key: string]: ( event?: unknown ) => void;
    };
    _init?: Promise<Model>;
}

// View
export type RenderFn = ( component: Component ) => JSX.Element;
export type View = ( h: Function ) => RenderFn;

// ComponentDef
// export interface ComponentDef {
export interface ComponentDef {
    name: string;
    init: () => Model | Promise<Model>;
    update?: Function;
    actions?: {
        [key: string]: ActionDef;
    };
    view: View;
    watchers?: WatchersDef;
    _compiled?: {
        [platform: string]: any;
    };
}


// Action
export type ActionDef = ( vm: Component, ...args: any[] ) => void

// Watch
export interface Watcher {
    action: ( event?: unknown ) => void;
    when?: boolean;
    watch?: unknown;
}

export type WatchersDef = ( vm: Component, ...args: any[] ) => Watcher[]


// Route
export interface RouteState {
    id: string;
    path: string;
    parent: string;
    enter: Function;
    leave: Function;
    data?: object;
    params?: {
        [key: string]: string;
    };
}

export interface RouteTransition {
    prevState: RouteState;
    currState: RouteState;
}

export interface RoutStateMap {
    [key: string]: RouteState;
}

export interface App {
    mount: ( elem: HTMLElement ) => App;
    unmount: ( elem: HTMLElement ) => App;
}

export type CreateAppFunction = ( componentDef: ComponentDef ) => App;
