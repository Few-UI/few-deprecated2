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
- For sync it returns { data }

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
## ELM
```
init : () -> (Model, Cmd Msg)
init _ =
  ( Loading
  , Http.get
      { url = "https://elm-lang.org/assets/public-opinion.txt"
      , expect = Http.expectString GotText
      }
  )
```

## React
```
const ProductDisplay = () => {
 const {
   state: product,
   dispatch
 } = React.useContext(ProductsContext);

 useEffect(() => updateProductBackend(product, dispatch));

 return <Product data={product} />;
};
```

# Props as Ref
## AngularJS
- AngularJS will put all props under $scope as direct children
- When u modify `$scope.myProp1.a`, because AngularJS implicit `$scope.$apply`, it will update all the view which refers to that data.

## React
- React's props object by default is read-only for all direct children.
  https://stackoverflow.com/questions/27519836/uncaught-typeerror-cannot-assign-to-read-only-property
- but if u pass the prop to other structure, there is no block to do mutation.
### How to make the prop read only and still support JSON spread
- Roughly practice like below:
```javascript
const book = {
    x: 3,
    y: 5
};
Object.defineProperties( book, {
    x: { writable: false },
    y: { writable: false }
} );
/*
bject.getOwnPropertyDescriptor(book, 'x') ==>
{
    configurable: true
    enumerable: true
    value: 3
    writable: false
    __proto__: Object
}
*/
```

## Vue
- vue is similar like react but with a different  error:
```
https://stackoverflow.com/questions/59187284/is-there-a-reason-why-this-proxy-always-throws-set-on-proxy-trap-returned-fal
```
