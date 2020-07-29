---
title: callstack
date: 2020-07-29 10:44:05
tags: 
  - javascript
  - computer science
categories: 
  - javascript
top_img: https://raw.githubusercontent.com/patrickpjx/i/master/img/timg.jpeg
cover: https://raw.githubusercontent.com/patrickpjx/i/master/img/633.jpg
---

###### call stack

In computer science, a call stack is a stack data structure that stores information about the active subroutines of a computer program.


This kind of stack is also known as an execution stack, program stack, control stack, run-time stack, or machine stack, and is often shortened to just "the stack"


main reason:
    keep track of the point to which each active subroutine should return control when it finishes executing

###### call frames

A call stack is composed of stack frames (also called activation records or activation frames)

These are machine dependent and ABI-dependent data structures containing subroutine state information.


![](https://raw.githubusercontent.com/patrickpjx/i/master/img/666.gif)


###### Tail call

In computer science, a tail call is a subroutine call performed as the final action of a procedure

Tail calls can be implemented without adding a new stack frame to the call stack

Most of the frame of the current procedure is no longer needed, and can be replaced by the frame of the tail call, modified as appropriate (similar to overlay for processes, but for function calls

``````
function f(x){
  return g(x); // 最后一步调用另一个函数并且使用return
}
function f(x){
  g(x); // 没有return 不算尾调用 因为不知道后面还有没有操作
  // return undefined; // 隐式的return
}
``````

``````

a() // 1 添加a到调用栈
function a(){
    return b(); // 在调用栈中删除a 添加b
}
function b(){
    return c() // 删除b 添加c
}
``````

ES6:

``````
function restricted() {
  'use strict';
  restricted.caller;    // 报错
  restricted.arguments; // 报错
}
restricted();


``````

some special : 

``````
function a(){
    var aa = 1;
    let b = val => aa + val // 使用了外层函数的参数aa
    return b(2) // 无法进行尾调用优化
}
``````


The special case of tail recursive calls, when a function calls itself, may be more amenable to call elimination than general tail calls

====> will stackoverflow

``````

function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10) // 89
Fibonacci(100) // 超时
Fibonacci(500) // 超时

``````



###### debug

1.bugger

2.console.trace