# How to construct a Form Component
## Use HTML Form feature as much as possible
So that u get the native support like native type, required and accesibility.
## Limit local state in field level
When u need to bind a field state for something like validation, try to limit the scope on field level so that when every time onChange is triggered, it will only re-render field, not the whole form
## You don't have to use data binding to get the state
- When u follow HTML form pattern, u can get the 'form state' by input tag directly or form event
- But if u really need a data-binding at form level, u can still try to minimize the rerender impact
## about dynamic form
- For the dynamic form created by a specific schema ( for example user ), u can pre-create the form in the secnario by using something like HOC. U don't have to put everything as props even u can.
## Field and immutable
- Try to keep field as a single flattern object so the we can easily maintain the immutability.
- Try to maintain the immutablility for multi instance use case

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
