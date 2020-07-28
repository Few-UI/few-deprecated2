# Code Flow
- When create form, inject fields to construct dynamic form object
  - It should be one-time creation
  - When rerender happens, the field should not change in common use case

# Widget Reset
- Given `<MyWidget prop={prop1}>`, with a internal state:
```jsx
<>
    <div>{internalState}</div>
    <button onClick={() => setState(internalState++)}>+1</button>
</>
```
- If prop changed, shall we reset the `internalState`?
  - It depends on the design:
    - If `internalState` has no relation ship with `prop`, u can ignore the re-render.
    - If `internalState` is initialized by `prop` or `prop.value`, u can setup a watcher/useEffect to monitor and update it.
