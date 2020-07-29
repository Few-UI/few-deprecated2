
/**
 * https://github.com/SunshowerC/blog/issues/7
 * https://github.com/microsoft/TypeScript/issues/1897
 * https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md#type
 * https://stackoverflow.com/questions/53718296/index-d-ts-vs-normal-type-file
 *
 * // for now just sit on react
 */

export interface Props {
    [key: string]: any;
}

// Model
export interface Model {
    [key: string]: object | string | number | boolean | Model;
}

// Ref
export interface Ref {
    ( key: string ): ( el: HTMLElement ) => void;
    [key: string]: HTMLElement;
}

// Component
export interface Component {
    // props
    props: Props;

    // local store
    model: Model;
    dispatch: Function;

    // action
    actions?: {
        [key: string]: ( event?: unknown ) => void;
    };

    // JSX
    ref: Ref;
    children?: any;
}

// View
export type RenderFn = ( component: Component ) => JSX.Element;
export type View = ( h: Function ) => RenderFn;

export type InitFn = ( _: { props: Props } ) => Model | Promise<Model>;

// ComponentDef
export interface ComponentDef {
    name: string;
    view: View;
    init?: InitFn;
    actions?: {
        [key: string]: ActionDef;
    };
    watchers?: WatchersDef;
    _compiled?: {
        [platform: string]: () => JSX.Element;
    };
    mount?: ActionDef;
    unmount?: ActionDef;
}

export type ComponentElement = ComponentDef & { ( props: any ): JSX.Element }

// Action Def
export type ActionDef = ( vm: Component, ...args: any[] ) => void

// Watch
export interface Watcher {
    action: ( event?: unknown ) => void;
    when?: boolean;
    watch?: unknown;
}

export type WatchersDef = ( vm: Component, ...args: any[] ) => Watcher[]

// dispatch input
export interface DispatchInput {
    path: string;
    value: unknown;
}

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
