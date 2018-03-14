# Bugs

## Implicit any type 

Makes a function accept types which it should not accept. E.g. pad(str, padding) is meant to take a string and a number, but accepts being called with a string and a string. Fix with --noImplicitAny. 

## No implicit returns

A switch statement which does not handle all cases, has an implicit return. The function returns undefined, and the program crashes, or misbehaves. Fix with --noImplicitReturns. 

## Strict null checks

A function f : Number -> Number -> Number, e.g. add, accepts two numbers and returns a number. It also accepts null, which crashes the program. Fix with --strictNullChecks.

## --strict

--strict turns the compiler on in strict mode. Should probably always be used. 


