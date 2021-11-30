
import isObject from "./isObject";
/**
 * 简单来说就是判断构造器的 prototype 是否是实例对象的原型
 * @param {obj} object
 * @param {function} constructor
 */

export default function instanceOf(obj, constructor) {
    if (!isObject(constructor)) {
        throw TypeError('not a object')
    } else if (typeof constructor !== 'function') {
        throw TypeError('not a function')
    }
    return constructor.prototype.isPrototypeOf(obj)
}