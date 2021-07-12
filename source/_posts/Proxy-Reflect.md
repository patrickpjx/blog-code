---
title: Proxy-Reflect
date: 2020-09-09 15:15:29
tags:
---

Reflection: In computer science, reflection is the ability of a process to examine, introspect, and modify its own structure and behavior
在计算机科学中，反思是一种能力在运行过程中检查，内省，修改自身结构和行为;

#### Reflect(MDN:它提供拦截 JavaScript 操作的方法。这些方法与 proxy handlers 的方法相同。Reflect 不是一个函数对象，因此它是不可构造的)

1.Reflect 的所有属性和方法都是静态的（就像 Math 对象）。 2.[Comparing Reflect and Object methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/Comparing_Reflect_and_Object_methods),
有着细微的差别。

作用：其实就是 es6 一新封装的 utils 类，以 function 函数形式调用提供简化原来 Object 方法处理，提供更便利，返回更友好的对象。

#### Proxy(MDN:对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）);

1.三个基本概念 handler，traps，target（处理器，捕获器，被代理的对象）；处理器（一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为（捕捉器）。） 2.在使用 Proxy 进行拦截时，如何调用原方法？此时就可以用到 Reflect 对象，这个就是 Proxy 的 handler 的各种捕捉器分别对应 Reflect 上的同名方法。
traps(对于 trap 的翻译，部分文章翻译成陷阱....23333):
handler.getPrototypeOf()
Object.getPrototypeOf 方法的捕捉器。
handler.setPrototypeOf()
Object.setPrototypeOf 方法的捕捉器。
handler.isExtensible()
Object.isExtensible 方法的捕捉器。
handler.preventExtensions()
Object.preventExtensions 方法的捕捉器。
handler.getOwnPropertyDescriptor()
Object.getOwnPropertyDescriptor 方法的捕捉器。
handler.defineProperty()
Object.defineProperty 方法的捕捉器。
handler.has()
in 操作符的捕捉器。
handler.get()
属性读取操作的捕捉器。
handler.set()
属性设置操作的捕捉器。
handler.deleteProperty()
delete 操作符的捕捉器。
handler.ownKeys()
Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器。
handler.apply()
函数调用操作的捕捉器。
handler.construct()
