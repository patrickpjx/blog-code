---
title: ts中的装饰器
date: 2020-08-06 18:43:51
tags:
---


###### Decorator Type

``````
declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;

declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;

declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;

declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;

``````

* 类装饰器应用于构造函数之上，会在运行时当作函数被调用，类的构造函数作为其唯一的参数。

* 属性装饰器
 * 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * 成员的key。

* 方法装饰器 (注意descriptor.value中的指向问题)
 * 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * 成员的名字。
 * 成员的属性描述符 descriptor。

* 访问器装饰器 (TypeScript 不允许同时装饰一个成员的get和set访问器,一个成员的所有装饰的必须应用在文档顺序的第一个访问器上)
 * 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * 成员的名字。
 * 成员的属性描述符。

* 参数装饰器(加载时期调用而非运行时期，方法装饰器可进行拦截)
 * 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * 成员的名字。
 * 参数在函数参数列表中的索引


###### 装饰器工厂
 `````
 // 装饰器工厂
    function(){
        return function(){

        }
    }
 `````

 ###### 加载顺序
 
 parameterDecorator => methodDecorator,propertyDecorator => classDecorator;