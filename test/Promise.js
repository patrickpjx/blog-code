// const { isObject } = require("util");

// 1执行器executor(只能是函数) 3状态 2任务列表 3值 value、reason 4是否caught 5 判断是否循环链  6 resolve rejected 外部回调中调用传值
// return new Promise((r,j)=>{}).then((res)=>{})
// then 接受两个方法，pending状态直接推进去，其他状态直接执行回调

// class Promise {
//     static states = Object.freeze({
//         PENDING: Symbol('pending'),
//         FULFULLED: Symbol('fulfillled'),
//         REJECTED: Symbol('rejected')
//     });
//     /**
//      * Promise 构造器，接受一个函数作为参数，这个函数会传递两个函数参数：resolve 和 reject
//      * @param {(resolve: (value) => any, reject: (reason) => any) => any} executor
//      */
//     constructor(executor) {
//         this.state = Promise.states.PENDING;
//         // resolve 的
//         this.value = null;
//         this.reason = null;
//         this.caught = false;
//         this.onFulfilledMicroTasks = [];
//         this.onRejectedMicroTasks = [];

//         // TODO 加入检测是否为循环链
//         this.onFulfilledMicroTasks.push((value) => {
//             if (value === this) {
//                 console.warn('Chaining cycle detected for promise #<Promise>')
//             }
//         });

//         this.onRejectedMicroTasks.push((reason) => {
//             if (reason === this) {
//                 console.warn('Chaining cycle detected for promise #<Promise>')
//                 return;
//             }
//             if (!this.caught) {
//                 console.error(`UnhandledPromiseRejectionWarning: ${reason}`);
//                 console.error(
//                     `UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch().`,
//                 );
//             }
//         })

//         if (typeof executor !== 'function') {
//             throw new TypeError(`Promise resolver ${executor} is not a function`);
//         }

//         const resolve = (value) => {
//             // 有可能用户在 executor 中多次调用 resolve 或者 reject
//             if (this.state === Promise.states.PENDING) {
//                 this.state = Promise.states.FULFILLED;
//                 this.value = value;

//                 // 使用 setTimeout 模拟 micro task
//                 this.onFulfilledMicroTasks.forEach((microTask) =>
//                     setTimeout(() => microTask(value)),
//                 );
//             }
//         }

//         const reject = (reason) => {
//             if (this.state === Promise.states.PENDING) {
//                 this.state = Promise.states.REJECTED;
//                 this.reason = reason;
//                 this.onRejectedMicroTasks.forEach((microTask) =>
//                     setTimeout(() => microTask(reason)),
//                 );
//             }
//         }

//         try {
//             // 因为在 Promise 构造器中就直接同步执行了 executor，所以 executor 中的代码是同步代码
//             executor(resolve, reject);
//         } catch (error) {
//             // 出错直接 reject
//             reject(error);
//         }
//     }

//     /**
//      * @param {function} onfulfilled 在 executor 中调用 resolve(value) 后的回调
//      * @param {function} onrejected 在 executor 中调用 reject(error) 或者抛出异常时的回调
//      */

//     then = (onfulfilled,onrejected) => {
//         if (typeof onfulfilled !== 'function') onfulfilled = (value) => value;
//         if (typeof onrejected === 'function'){
//             this.caught = true;
//         } else {
//             onrejected = (error) => {
//                 throw error;
//             };
//         }

//         const promise2 = new Promise((resolve, reject) => {
//             if (this.state === Promise.states.PENDING) {
//                 this.onFulfilledMicroTasks.push((value) => {
//                     try {
//                         const x = onfulfilled(value);
//                         // Promise.resolvePromise(this, promise2, x, resolve, reject);
//                     } catch (error) {
//                         reject(error)
//                     }
//                 })
//                 this.onRejectedMicroTasks.push((reason) => {
//                     try {
//                         const x = onrejected(reason);
//                         // Promise.resolvePromise(this, promise2, x, resolve, reject);
//                     } catch (error) {
//                         reject(error)
//                     }
//                 })
//             } else if(this.state === Promise.states.FULFULLED){
//                 // 已经改变状态直接执行回调
//                 setTimeout(() => {
//                     try {
//                         const x = onfulfilled(this.value)
//                         // Promise.resolvePromise(this, promise2, x, resolve, reject);
//                     } catch (err) {
//                         reject(error);
//                     }
//                 },0)
//             } else if (this.state === Promise.states.REJECTED) {
//                 setTimeout(() => {
//                     try {
//                         const x = onrejected(this.reason);
//                         // Promise.resolvePromise(this, promise2, x, resolve, reject);
//                     } catch (error) {
//                         reject(error);
//                     }
//                 }, 0);
//             }
//         });
//         return promise2;
//     }

//     static resolvePromise(self,promise2,x,resolve,reject) {
//         if () {

//             return;
//         }
//     }

//     /**
//      * 处理 then 回调函数的返回值
//      * @param {Promise} self 调用 then 函数的那个 promise
//      * @param {Promise} promise2 新返回的 promise
//      * @param {any} x then 返回值
//      */
//     static resolvePromise(self, promise2, x, resolve, reject) {
//         if (self === x || promise2 === x) {
//             reject(new TypeError('Chaining cycle detected for promise #<Promise></Promise>'))
//             return;
//         }

//         if (isObject(x)) {
//             let resolveOrRejected = false;
//             const resolvePromise = (y) => {
//                 if (resolveOrRejected) return;
//                 resolveOrRejected = true;
//                 Promise.resolvePromise(self, promise2, resolve, reject);
//             }
//             const rejectPromise = (r) => {
//                 if (resolveOrRejected) return;
//                 resolveOrRejected = true;
//                 reject(r);
//             }
//             let then;
//             try {
//                 then = x.then;
//             } catch (error) {
//                 reject(error);
//             }
//         }

//         if (typeof then === 'function') {
//             try {
//                 then.call(x, resolvePromise, rejectPromise);
//             } catch (error) {
//                 // 如果没处理过异常就 reject(error)，处理过即调用过 resolvePromise, rejectPromise 就啥都不干
//                 if (!resolvedOrRejected) {
//                     reject(error);
//                     resolvedOrRejected = true;
//                 }
//             }
//         } else {
//             // 假设对 promise p 进行两次 then，也就是 p.then().then()
//             // 为了让第二个 then 中的回调能正常执行，p.then() 返回的这个新的 promise 顺利执行的时候就必须 resole
//             resolve(x);
//         }
//     }
// }
