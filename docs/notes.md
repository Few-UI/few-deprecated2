# Template
## Goal
- Agnostic
- Bind everything as Glue

## Notes
- Should not have CSS factor -> considering cross-platform
- Does it has too be bootstrap? Based on point 1 it is hard.
- 'executeAction' requires more than just a name
- view driven === client driven
  - view is a function

## Reference
- [Flutter Declarative](https://flutter.dev/docs/get-started/flutter-for/declarative)
- [ELM Concept](https://guide.elm-lang.org/webapps/structure.html)

# ELM
- ELM supports partial function input. For example:
```
> String.repeat
<function> : Int -> String -> String

> String.repeat 4
<function> : String -> String

> String.repeat 4 "ha"
"hahahaha" : String
```

- When define:
```
type Msg = Change String
```
  it is defining function below implicitly:
```
Change: String -> Msg
```
  which Change can used as function at any callback placeses:
```
view model =
  div []
    [ input [ placeholder "Text to reverse", value model.content, onInput Change ] []
    , div [] [ text (String.reverse model.content) ]
    ]
```

- The `update` in ELM is true dispatch - match msg(action), change the model

# Async component
## Vue
```
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```

