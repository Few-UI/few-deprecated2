# How can we share states between component gradually?
- The answer from redux is global, the state will be global and unique
- The answer from ELM is global, all the 'function' will be composed at app level as a monolithic state

# Use case
- Two Point Component, each of them has their own coordination states and has control inside to change it.
- At application level, there is an option to bind those two points y value.
- Application level has no knowledge to point bindings

# Facts
- React dosen't support custom event


## Step 1 - Point Component
- Point
```JSX
<>
    <h4>{props.name}</h4>
    <Var name='x' val={props.x} />
    <Var name='y' val={props.y} />
</>
```
- Var
```JSX
<div>
    {props.name}: {model.val}
    <button onClick={() => void dispatch( { path: 'val', value: model.val as number + 1 } ) }>+</button>
    <button onClick={() => void dispatch( { path: 'val', value: model.val as number - 1 } ) }>-</button>
</div>
```
