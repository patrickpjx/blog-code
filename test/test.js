// es3
// push、pop
// unshift、shift
// reverse、sort、{join、concat（push区别=>原数组有影响）、slice（返回截取数组）、splice（返回新数组）对原有数组不影响}
// sort >0交换从头再比较（冒泡）、大数组直接二分提高效率

// es5
// indexOf lastIndexOf（===匹配）
// every、some、map、filter、forEach、
// reduce、reduceRight

// es6
// find、findIndex
// fill
// copyWithIn // 返回当前数组（）

// es3
// catch 块级作用域、性能低下

// es5
// () => {}; 1.匿名函数，2.一个参数省略括号 2.5 返回一个值时省略大括号 3.不会创建自己上下文 4没有argments类数组对象

// let _isArray;
// if (!Array.isArray) {
//     _isArray = function (x) {
//         return Object.prototype.toString.call(x) === '[object Array]';
//     };
// } else {
//     _isArray = Array.isArray;
// }
// let isArray = _isArray;

// function objectOrFunction(x) {
//     return typeof x === 'function' || (typeof x === 'object' && x !== null);
// }

// function isFunction(x) {
//     return typeof x === 'function';
// }

// function unique(arr) {
//     const seen = new Map();
//     return arr.filter((a) => !seen.has(a) && seen.set(a, 1));
// }

// function unique(arr) {
//     return Array.from(new Set(arr));
// }

// /**
//  * @param object
//  * @param name
//  * @param func
//  */
// function addMethod(object, name, func) {
//     const old = object[name];
//     object[name] = function () {
//         if (func.length === arguments.length) {
//             return func.apply(this, arguments);
//         } else if (typeof old === 'function') {
//             return old.apply(this, arguments);
//         }
//     };
// }

// async function a() {
//     console.log('a');
// }
// async function b() {
//     console.log('b');
// }
// async function c() {
//     console.log('c');
// }
// a();

// 函数生成器
// function* test() {
//     yield a();
//     yield b();
//     yield c();
//     return;
// }
// const control = test();
// control.next();

// ((a, b) => {
//     console.log(arguments);
// 压缩
// 全局命名冲突
// umd(amd、cmd、commjs)
// （function(fn){
//      fn()
//  }）(fn)
// })(1, 2);

// function createPreson() {
//     let o = {};
//     o.name = '123';
//     o.func = function () {
//         console.log(this.name); // 对象方法和属性调用
//     };
//     return o;
// }

// const p = createPreson();
// p.func();

// function cname() {
// console.log(this.name);
// }

// 构造函数(new 会改变this指向)
// function Person() {
// this.name = '456';
// this.func = cname;
// }

// const person = new Person();
// person.func();

// 每个对象
// 强制指向 apply（参数数组） call（，分隔）
// Person.call(p);

// function Person() {}
// Person.prototype.name = 123;
// let p = new Person();
// console.log(Person.prototype.constructor);
// console.log(Person.__proto__.__proto__);
// console.log({}.__proto__ == Person.__proto__.__proto__);
// 动态原型模式把所有信息都封装在了构造函数中，而通过在构造函数中初始化原型（仅在必要的情况下），又保持了
// 同时使用构造函数和原型的优点；换句话说，可以通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型

// 多继承
// 属性共享、原型方法一般不进行
// let Book = (function () {
//     // 私有静态属性
//     let privateStaticAttribute = 0;
//     // 私有静态方法
//     let privateStaticMethod = function () {};
//     // 构造函数
//     return function (props) {
//         // 私有属性
//         let title;
//         // 私有方法
//         this.getTitle = function () {
//             return title;
//         };
//         this.setTitle = function (title) {};
//     };
// })();
// // 公有静态方法
// Book.staticMethod = function () {};
// // 公有方法
// Book.prototype.publicSharedMethod = function () {};

// 无法传递参数，借用构造函数

// 寄生式继承，原型式继承、完美继承（组合寄生式继承）
// function Parent3() {
//     this.parent3 = 'parent3';
//     this.arr = [1, 2, 3];
// }

// Parent3.prototype.walk = 'I can walk';

// function Child3() {
//     Parent3.call(this); // 这里执行第一次父类
//     this.child3 = 'child3';
// }

// Child3.prototype = new Parent3(); // 这里执行第二次父类, 原型继承发现只要把父子的原型对象绑定起来就好, 可以写成 Child3.prototype = new Parent3()>__proto__ 也正常
// const child31 = new Child3();
// const child32 = new Child3();

// function Parent() {
//     this.name = 'text';
// }
// Parent.prototype.say = '666';
// function Child() {
//     Parent.call(this);
//     this.money = 'much';
// }
// Child.prototype = Object.create(Parent.prototype);
// Child.prototype.contructor = Child;
// const c = new Child();

// function Parent2() {
//     this.parent2 = 'parent2';
//     this.arr = [1, 2, 3];
// }

// Parent2.prototype.walk = 'I can walk';
// function Child2() {
//     this.child2 = 'child2';
// }
// Child2.prototype = new Parent2();
// const child21 = new Child2();
// const child22 = new Child2();

// function object(o) {
//     function F() {}
//     F.prototype = o;
//     return new F();
// }

// function createAnother(original) {
//     let clone = object(original); // 通过调用函数创建一个新对象
//     clone.sayHi = function () {
//         // 以某种方式增强真个对象
//         alert('hi');
//     };
//     return clone; // 返回这个对象
// }

// function object() {
//     return {};
// }
// function create(params) {
//     return object();
// }

// const b = String(Math.random());
// console.log(b.split(".")[1][0])
// console.log(b.split(".")[1][1])
// console.log(b.split(".")[1][2]/5)

// const fn = function (this: any, ...args: any[]): any {
//     console.log('this', this);
//     return args;
// };

// Function.prototype.myBind = function (thisArg,...args) {
//     const func = this;
//     return function (...otherArgs) {
//       return func.call(thisArg, ...args, ...otherArgs);
//     }
// }

// function Student(name, age) {
//     this.name = name;
//     this.age = age;
// }
// const BoundStudent1 = Student.bind({ name: 'Taylor' }, 'ly');
// console.log(new BoundStudent1(22)); // => Student { name: 'ly', age: 22 }
// const BoundStudent2 = Student.myBind({ name: 'Taylor' }, 'ly');
// console.log(new BoundStudent2(22)); // => {}

// const _new = (fn, ...args) => {
//     const target = Object.create(fn.prototype);
//     const result = fn.call(target, ...args);
//     const isObjectOrFunction = (result !== null && typeof result === 'object') || typeof result === 'function');
//     return isObjectOrFunction ? result : target;
// }

// Function.prototype.myCall = function (thisArg,...args) {
//     const func = this;
//     if (thisArg === null || thisArg === undefined) {
//         return func(...args)
//     }
//     const tempFunc = Symbol('temp func')
//     thisArg[tempFunc] = func;
//     const r = func();
//     return r;
// }

// Function.prototype.myBind = function (thisArg, ...args) {
//     const func = this;
//     const boundFunc = function (...otherArgs) {
//         return func.call(new.target ? this : thisArg, ...args, ...otherArgs);
//     }
//     boundFunc.prototype = Object.create(func.prototype);
//     boundFunc.prototype.constructor = boundFunc;
//     Object.defineProperties(boundFunc, {
//         name: {
//             value: `bound ${func.name}`
//         },
//         length: {
//             value: func.length
//         }
//     });
//     return boundFunc;
// }

// function Student(name, age) {
//     this.name = name;
//     this.age = age;
// }
// const BoundStudent1 = Student.bind({ name: 'Taylor' }, 'ly');
// console.log(new BoundStudent1(22)); // => Student { name: 'ly', age: 22 }
// const BoundStudent2 = Student.myBind({ name: 'Taylor' }, 'ly');
// console.log(new BoundStudent2(22)); // => { name: 'ly', age: 22 }

// // 处理 new
// const _new = (fn,...args) => {
//     const target = Object.create(fn.prototype);
//     const result = fn.call(target, ...args);
//     const isObjectOrFunction = (result !== null && typeof result === 'object') || typeof result === 'function';
//     return isObjectOrFunction ? result : target;
// }

// 处理原型链
