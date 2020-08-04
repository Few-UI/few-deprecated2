
/**
 * https://github.com/SunshowerC/blog/issues/7
 * https://github.com/microsoft/TypeScript/issues/1897
 * https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md#type
 * https://stackoverflow.com/questions/53718296/index-d-ts-vs-normal-type-file
 * https://www.tslang.cn/docs/handbook/generics.html
 *
 * // for now just sit on react
 */

/**
 * primitive type in store
 */
export type Primitive = boolean | number | string;

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

export interface ActionMap {
    [key: string]: ( ...args: any[] ) => void;
}

// Component
export interface Component<T> {
    // props
    props?: T;

    // local store
    model?: Model;
    dispatch?: Function;

    // action
    actions?: ActionMap;

    // JSX
    ref?: Ref;
    // children?: any;
}

// View
export type RenderFn<T> = ( component: Component<T> ) => JSX.Element;
export type View<T> = ( h: H ) => RenderFn<T>;

export type InitFn<T> = ( _?: { props: T } ) => Model | Promise<Model>;

// ComponentDef
export interface ComponentDef<T> {
    name: string;
    view: View<T>;
    init?: InitFn<T>;
    actions?: ActionDefMap<T>;
    watchers?: WatchersDef<T>;
    _compiled?: {
        [platform: string]: () => JSX.Element;
    };
    mount?: ActionDef<T>;
    unmount?: ActionDef<T>;
}

export type RenderFunction<T = Props> = ( props: T ) => JSX.Element;

export type ComponentElement<T> = ComponentDef<T> & RenderFunction<T>

// Action Def
export type ActionDef<T> = ( vm: Component<T>, ...args: any[] ) => void

export interface ActionDefMap<T> {
    [key: string]: ActionDef<T>;
}

// Watch
export interface Watcher {
    action: ( event?: unknown ) => void;
    when?: boolean;
    watch?: unknown;
}

export type WatchersDef<T> = ( vm: Component<T>, ...args: any[] ) => Watcher[]

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

export type CreateAppFunction = ( componentDef: ComponentDef<unknown> ) => App;


export interface H {
    <T extends Props>( type: string | ComponentDef<T>, props?: T | null, ...children: any ): any;
    Fragment: string | ComponentDef<unknown>;
    await: Function;
}
