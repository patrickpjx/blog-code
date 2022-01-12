import isObject from './isObject';

/**
 * 1.返回 实例对象或者函数返回值
 * 2.处理入参是否为对象或者函数
 * @param func
 * @param args
 * @returns
 */
function myNew(func, ...args) {
	const target = Object.create(func);
	const result = func.call(target, ...args);
	const isObjectOrFunction = isObject(func) || typeof func === 'function';
	return isObjectOrFunction ? result : target;
}

/**
 * 返回一个实例原型指向入参数
 * @param o
 * @returns
 */
function myCreate(o) {
	const F = function () {};
	F.prototype = o;
	return new F();
}
