---
title: closure
date: 2020-07-21 10:58:14
tags: 
  - javascript
  - computer science
categories: 
  - javascript
top_img: https://raw.githubusercontent.com/patrickpjx/i/master/img/456.jpg
cover: https://raw.githubusercontent.com/patrickpjx/i/master/img/667.jpg
---

###### first class funtion

In computer science, a programming language is said to have first-class functions if it treats functions as first-class citizens

what: This means the language supports passing functions as arguments to other functions, returning them as the values from other functions, and assigning them to variables or storing them in data structures

why: First-class functions are a necessity for the functional programming style, in which the use of higher-order functions is a standard practice. A simple example of a higher-ordered function is the map function, which takes, as its arguments, a function and a list, and returns the list formed by applying the function to each member of the list. For a language to support map, it must support passing a function as an argument.


###### lexically scoped

Lexical scope vs. dynamic scope

`````
  $ # bash language
  $ x=1
  $ function g () { echo $x ; x=2 ; }
  $ function f () { local x=3 ; g ; }
  $ f # does this print 1, or 3?
  3
  $ echo $x # does this print 1, or 2?
  1

`````

Lexical scope: prints 1 and then 2
Dynamic scope: prints 3 and then 1


###### funarg problem 

In computer science, the funarg problem refers to the difficulty in implementing first-class functions (functions as first-class objects) in programming language implementations so as to use stack-based memory allocation of the functions


###### downwards funarg problem

``````

  let x = 10;
  function foo() {
    console.log(x);
  }
  function bar(funArg) {
    let x = 20;
    funArg(); // 10, 而不是20!
  }
  // 将 `foo` 作为实参传给 `bar`。
  bar(foo);

``````

###### upwards funarg problem

``````
  function foo() {
    let x = 10;
    // 闭包，捕获`foo`的环境。
    function bar() {
      return x;
    }
    // 向上funarg。
    return bar;
  }
  let x = 20;
  // 调用`foo`来返回`bar`闭包。
  let bar = foo();
  bar(); // 10，而不是20!

``````

###### closure

In programming languages, a closure, also lexical closure or function closure, is a technique for implementing lexically scoped name binding in a language with first-class functions

what: a technique
why: funarg problem 
How: Unlike a plain function, a closure allows the function to access those captured variables through the closure's copies of their values or references, even when the function is invoked outside their scope


``````
  function foo() {
    var a = { x: 1, y: 2 }; // 对象
    var b = 10; // 基本数据类型
    function bar(param) {
      return param+ b;
    }
    return bar;
  }
  var b = 20;
  var func = foo();
  console.log(func(1));
``````



###### λ（Lambda）

Constraint variable:local variables or parameters of function

Free variables:!Constraint variable

``````
(lambda (x) (+ x 2))

(  (lambda (x) (+ x 2))  7  )

x=>y=>x+y

(λx.(λy.y+x)2)1)

``````

(some interesting question : There's always a bigger fish)



