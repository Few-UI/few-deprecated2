# Notes
## Component Contract
### Function Based (React Hook)
- The function will be executed at `h(Func)` to create a new `instance`.

- All other descriptors like `state` and `watch` will be inside the function.

- For sure u need sort of `state` to keep the local state inside a function.

- The component diff will still based on the outer function (at least in react), so that should be consistent.
```javascript
const MyComponent = ( { props } ) => {
    const [ state, setState ] = useState({
        // state
    });

    return renderFn( { props, state, setState } );
}
MyComponent.displayName = 'MyComponent';
```

### Component Based (Vue/ELM/Angular/React Class)
``` javascript
const MyComponent = {
    name: 'MyComponent',
    props: {
        // props
    },
    data: () => ({
        // state
    }),
    action: {
        setState: v => this.data = v;
        myAction
    },
    render: h => renderFn(h)({this.props, this.data, this.setState, this.setState})
}
```

## Component Reuse
- It has no difference for these 2 practice:
```JSX
    <MyComponent prop1='a' prop2={var} />
```

## Component Composition
### Function Based (React Hook)
- First u might need to decouple the old component a bit, which is not hard:
```jsx
const useMyComponentState = () => useState({
    // state
});

const myConponentRenderFn = ( { props, state, setState } ) =>
    <>
        {/* render something */}
    </>;

const MyComponent = ( { props } ) => {
    const [ state, setState ] = useMyComponentState();

    return myComponentRenderFn( { props, state, setState } );
}
MyComponent.displayName = 'MyComponent';
```

- Then in the composition, u can compose it as a normal function callback:
```jsx
const NewComponent = ( { newProps } ) => {
    const [ state, setState ] = useMyComponentState();

    const [ newState, setNewState ] = useState( {
        // state in new component
    })

    // compose state + dispatch
    const composeState  = composeObject( state, newState );
    const composeSetState = composeFunction( setState, setNewState );

    // somehow call myComponentRenderFn inside
    return renderFn( { newProps, composeState, composeSetState } );
}
```
- It is not DECL, but it is a clean solution based on JS
- Everything is function, no fixed pattern at all
- `useState` is only available under `h` context, it is not a `free JS API`.

### Component Based (Vue/ELM/Angular/React Class)
- In Component Based Architecture (especially for ELM), Below is a nice compose approach:
```javascript
const NewComponent = {
    name: 'NewComponent',
    props: {
        // new props anyway
    },
    data: () => ({
        // new data
        newData: createNewData(),
        // data in my component
        myData: Component.data(),
    }),
    action: {
        setState: v => this.data = v;
        myAction: mapAction(Component.actions.myAction)
    },
    // use Component.render inside
    render: h => renderFn(h)({this.props, this.data, this.setState, myAction })
}
```
- With some more abstraction it can easily achieve DECL
- It has clear definition for constructing a UI ( state, render, action, data )
- `Action` can be abstracted as sort of `message` to not tieing up with implementation

## Component Derive
### Function Based (React Hook)
```jsx
const NewComponent = ( { newProps } ) => {
    const [ state, setState ] = useMyComponentState();

    // same state different behavior
    const newSetState = compose(setState);

    // somehow call myComponentRenderFn inside
    return renderFn( { newProps, composeState, newSetState } );
}
```

### Component Based (Vue/ELM/Angular/React Class)
- In Component Based Architecture (especially for ELM), Below is a nice compose approach:
```javascript
const NewComponent = {
    name: 'NewComponent',
    props: {
        // new props anyway
    },
    data: () => Component.data(),
    action: {
        // new action same state
        myAction: mapAction(Component.actions.myAction)
    },
    // use Component.render inside
    render: h => renderFn(h)({this.props, this.data, this.setState, myAction })
}
```

# New Design?
- No doubt, for pure component, it is:
```javascript
// view = f(props)
const view = ( props ) => { /* Render Function */ };
const Component = { view };
```

- When state is involved, it becomes:
```javascript
// model = f(props)
const model = init( props );

// dispatch = f(model)
const dispatch = composeDispatch( model, setAPI );

// action = f( props, model, dispatch )
const action = ( { props, model, dispatch } ) => {
    // ...
    dispatch( 'somePath', value );
}

// view = f( props, model, dispatch, action )
const view = ( { props, model, dispatch, action } ) => {
    // render function
}

const Component = { view, model, dispatch, action };
```

- To simplify the compose design, we can try:
  - merge props, model and action, so that `view = f( object )` could be reused between pure component and stateful component
  - props cannot be overwrite by actions and model, so that pure component will be always at bottom, and stateful component can reuse
    pure component or refactor out pure component in reuse scenario.
  - hide dispatch api for external usage, so that all `callback` will be done through action which is not coupling with `model`.

# Other Notes
- Component = RenderFn + State

- `h` should be bind later for the RT loading, as `h => ( props: Props ) => JSX.Element`.
  - Or can we push it to build time and compile different flavor

- Even logically `h` supports both `componentDef` and `renderFn`, the `JSX` may not be compiled to `renderFn` correctly since it has its own build config assumption.
  - If the `renderFn` is in different repo, we can try to pre-build that repo, which should be the common assumption for JSX usage.
  - If the `renderFn` is in the same repo, it needs to follow the pollyFill to get the h function.

- Difference between ELM Component and React Component:
  - In ELM, the Component is a pure function `view: Model -> Html Msg`, in composition it is used as function `[ button [ onClick Increment ] [ text '+' ] ]`
  - In React, the Component is function but holds the state, in composition it is used as factory method `h( Button, { onClick: Increment }, [ '+' ])`. `Button` itself will be used for vDOM compare.
    - It supports `Button( { onClick: Increment, children: [ '+' ] } )` too. In this case Button will just get evaluated directly, which is more close to ELM

