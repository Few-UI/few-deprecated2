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

