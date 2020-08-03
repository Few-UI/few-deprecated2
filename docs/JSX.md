# JSX Patterns
- `( props: Props ) => JSX.Element` is a contract for functional component.

- The function will be executed at `h(Func)` to create a new `instance`.

- All other descriptors like `state` and `watch` will be inside the function.

- For sure u need sort of `state` to keep the local state inside a function.

- The component diff will still based on the outer function (at least in react), so that should be consistent.

# Requirement
- `h` should be bind later for the RT loading, as `h => ( props: Props ) => JSX.Element`.
  - Or can we push it to build time and compile different flavor

# Symptom
- Even logically `h` supports both `componentDef` and `renderFn`, the `JSX` may not be compiled to `renderFn` correctly since it has its own build config assumption.
  - If the `renderFn` is in different repo, we can try to pre-build that repo, which should be the common assumption for JSX usage.
  - If the `renderFn` is in the same repo, it needs to follow the pollyFill to get the h function.
