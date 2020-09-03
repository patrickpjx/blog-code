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


###### Method decorator

arg:
* target  
* key 
* value Object.getOwnPropertyDescriptor()


编译后的代码

``````
    var C = (function () {
        function C() {
        }
        C.prototype.foo = function (n) {
            return n * 2;
        };
        Object.defineProperty(C.prototype, "foo",
            __decorate([
                log
            ], C.prototype, "foo", Object.getOwnPropertyDescriptor(C.prototype, "foo")));
        return C;
    })();
``````
