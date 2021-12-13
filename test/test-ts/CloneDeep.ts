import { type } from "os";
import isObject from "./isObject";
// Map和Object的区别
// 一个Object 的键只能是字符串或者 Symbols，但一个Map 的键可以是任意值。
// Map中的键值是有序的（FIFO 原则），而添加到对象中的键则不是。
// Map的键值对个数可以从 size 属性获取，而 Object 的键值对个数只能手动计算。
// Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。
// Map对象的属性
// size：返回Map对象中所包含的键值对个数
// Map对象的方法
// set(key, val): 向Map中添加新元素
// get(key): 通过键值查找特定的数值并返回
// has(key): 判断Map对象中是否有Key所对应的值，有返回true,否则返回false
// delete(key): 通过键值从Map中移除对应的数据
// clear(): 将这个Map中的所有元素删除
// 遍历方法为对象原型方法
// 常与数组、对象间转换、 JSON.parse 然后再按对象进行处理

export default function cloneDeep(obj) {
    const nMap = new Map()
    function clone(obj) {
        let cloneObj = null;
        if (!isObject(obj)) return obj;
        if (nMap.has(obj)) return nMap.get(obj)
        const Constructor = obj.constructor;
        if (Constructor === Date) {
            cloneObj = new Date(obj.getTime());
        } else if (Constructor === RegExp) {
            cloneObj = new RegExp(obj);
        } else if (Constructor === Function) {
            // eslint-disable-next-line no-eval
            cloneObj = eval(`${obj.toString()}`)
            Reflect.setPrototypeOf(cloneObj, Reflect.getPrototypeOf(obj));
        } else {
            cloneObj = new Constructor();
            for (const [key, value] of Object.entries(obj)) {
                cloneObj[key] = clone(value);
            }
        }
        nMap.set(cloneObj, obj);
        return cloneObj;
    }
    return clone(obj)
}