---
title: js-test
date: 2021-08-17 14:49:16
tags:
---

```
原始表达式：常量 es5 定义、变量、直接量（{},[]）、关键字
初始化表达式、
定义表达式、
函数调用表达式、
对象创建表达式、
属性访问表达式、（先判断前置是否为对象，不是转化为对象，再调用属性和方法）

一元操作符(等级最高，乘除、加减、大小于、相等、与或运算、三元运算)

一元加：返回数字（number，NaN，正负无穷）
一元减：先一元加，再加负号
自增、自减操作符：前置（先加减再运算）、后置（先运算再加减）、（递减会有精度问题（先整数再操作再转化为整数））
位运算（一般情况也用不到，冷们点~(~(A) = -(A+1))）
逻辑非(!)

(优先级、结核性、运算顺序)
只有一元操作符号、三目运算法，赋值操作符都是右结核性，其他都是永远从左到右运算
优先级：属性访问表达式(表达式优先等级最高)>赋值操作(操作符最高)>等号

单词一元操作符号：typeof(返回基础类型（function、number、boolean、string、object、undefined(null、bigInt、symbol)）、与typescirpt静态类型区别)、void（禁止跳转）、delete
单词二元操作符：instanceof(不能返回基础类型，返回复杂类型（具体对象、如数组）)、in
typeof 配合 instanceof 复杂实现类型校验

赋值运算符、计算运算符、位运算符
&&、||、！（短路计算）
a？ a：b(三目运算符、一般赋值运算)
a&&b||c(一般条件判断语句)

隐式类型转化

[]+[]:先valueof返回原始值，toString方法
{}:1.对象 2.代码区域
Date原始值直接toString
```

```
isArray
const a = new Array(2)

```

```

// new Function 性能对比

function printValues (obj) {
    for (const key in obj) {
      console.log(obj[key])
    }
}

const printValues2 = new Function('obj', `
  ${Object.keys(obj).map(key => `console.log(obj.${key})`).join('\n')}
`)
```
