/**
 * call
 */
function myCall(func, thisArg, args) {
    if (thisArg === null || thisArg === undefined) {
        return func(...args);
    }
    const tempFunc = Symbol('temp Func');
    thisArg[tempFunc] = func;
    const result = thisArg[tempFunc](...args);
    Reflect.deleteProperty(thisArg, tempFunc);
    return result;
}

/**
 * apply 区别参数数组
 * @param func
 * @param thisArg
 * @param args
 * @returns
 */
function myApply(func, thisArg, args = []) {
    return myCall.call(func, thisArg, ...args)
}

/**
 * bind
 * 1.返回新函数
 * 2.处理原型
 * 3.处理函数属性：name，length
 */
function myBind(fn, thisArg, ...boundArgs) {
    function boundFn(...otherArgs) {
        // 被使用 new 调用时 this 应该就是被指定的 this
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        const ctx = new.target ? this : thisArg;
        return fn.call(ctx, ...boundArgs, ...otherArgs);
    }

    // 这一步是为了 boundFn 被当作构造函数使用时，其实例能正常访问 fn 原型链上的属性
    boundFn.prototype = Object.create(fn.prototype);
    boundFn.prototype.constructor = boundFn;

    // 默认就是 writeable: false，所以 name 和 length 都被设置为不可写了
    Object.defineProperties(boundFn, {
        name: {
            // 被绑定 this 的新函数的 name 都是原函数前面加 bound
            value: `bound ${fn.name}`,
        },
        length: {
            // boundFn 的 length 是剩余需要传递的参数
            value: Math.max(fn.length - boundArgs.length, 0),
        },
    });
    return boundFn;
}