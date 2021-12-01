// /**
//  * new Promsie((resolve,rejecet)=>{}).then(()=>{}).catch(()=>{})
//  */

import isObject from "./isObject";



enum States {
    PENDING = 'PENDING',
    FULFILLED = 'FULFILLED',
    REJECTED = 'REJECTED'
}


function isThenable(value) {
    return !!(value && !!value.then);
}

class myPromise {
    public state = States.PENDING;
    public onFulfillMicroTasks = [];
    public onRejectedMicroTasks = [];
    public value = null;
    public reason = null;
    public caught = false;

    public static resolve(value) {
        if (isThenable(value)) {
            return value;
        }
        return new myPromise((resolve, reject) => {
            if (isThenable(value)) {
                value.then((value) => resolve(value), (reason) => reject(reason))
            } else {
                resolve(value);
            }
        })

    }

    public static reject(reason) {
        return new myPromise((resolve, reject) => reject(reason));
    }

    public static all(promises) {
        const resultValues = [];
        if (promises.length === 0) {
            return myPromise.resolve(resultValues);
        }

        let completedCount = 0;
        return new myPromise((resolve, reject) => {
            Array.from(promises).forEach((promise, index) => {
                if (!isThenable(promise)) {
                    promise = myPromise.resolve(promise);
                }
                (promise as any).then(
                    (value) => {
                        completedCount++;
                        resultValues[index] = value;
                        if (completedCount === promises.length) {
                            resolve(resultValues);
                        }
                    },
                    (error) => { reject(error) }
                )
            })
        })
    }


    public static allRejected(promises) {
        const rejectValues = []
        if (promises.length === 0) {
            return myPromise.reject(rejectValues)
        }
        let rejectedCount = 0;
        return new myPromise((resolve, reject) => {
            Array.from(promises).forEach((promise, index) => {
                if (!isThenable(promise)) {
                    promise = myPromise.reject(promise);
                }
                (promise as any).then(
                    (value) => { resolve(value) },
                    (reason) => {
                        rejectedCount++;
                        rejectValues[index] = reason;
                        if (rejectedCount === promises.length) {
                            reject(rejectValues)
                        }
                    }
                )
            })
        })
    }

    public static resolvePromise(thisArg, promise, x, resolve, reject) {
        if (thisArg === x || promise === x) {
            reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
            return
        }

        if (!isObject(x)) {
            return resolve(x);
        }

        let resolveOrRejected = false
        const resolvePromise = (v) => {
            if (resolveOrRejected) return;
            resolveOrRejected = true;
            myPromise.resolvePromise(this, promise, v, resolve, reject);
        }

        const rejectPromise = (r) => {
            if (resolveOrRejected) return;
            resolveOrRejected = true;
            reject(r);
        }

        let then
        try {
            then = x.then;
        } catch (err) {
            reject(err);
        }

        if (typeof then === 'function') {
            try {
                then.call(x, resolvePromise, rejectPromise);
            } catch (err) {
                reject(err);
                resolveOrRejected = true;
            }
        } else {
            resolve(x)
        }

    }

    protected constructor(executor) {

        this.onFulfillMicroTasks.push((value) => {
            if (value === this) {
                console.log('Chaining cycle detected for promise #<Promise>');
            }
        })

        this.onRejectedMicroTasks.push((reason) => {
            if (reason === this) {
                console.log('Chaining cycle detected for promise #<Promise>');
            }
            if (!this.caught) {
                console.error(`UnhandledPromiseRejectionWarning: ${reason}`);
                console.error(
                    `UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch().`,
                );
            }
        })

        if (typeof executor !== 'function') {
            throw new TypeError(`Promise resolver ${executor} is not a function `);
        }

        try {
            executor(this.resolve, this.reject)
        } catch (err) {
            this.reject(err)
        }
    }


    /**
     * 
     * @param onResolve 
     * @param onRejected 
     * @returns 
     * 
     * 1.传入函数检验
     * 2.try catch 捕获方法报错
     */
    public then(onResolve, onRejected) {

        let onResolveFunc = onResolve;
        let onRejectedFunc = onRejected;

        if (typeof onResolveFunc !== 'function') {
            onResolveFunc = (value) => {
                return value;
            }
        }

        if (typeof onRejectedFunc !== 'function') {
            this.caught = true;
        } else {
            onRejectedFunc = (err) => {
                throw err;
            }
        }
        // eslint-disable-next-line new-cap
        const promise = new myPromise((resolve, reject) => {
            switch (this.state) {
                case States.PENDING:
                    this.onFulfillMicroTasks.push((value) => {
                        try {
                            const x = onResolveFunc(value);
                            myPromise.resolvePromise(this, promise, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    })

                    this.onRejectedMicroTasks.push((reason) => {
                        try {
                            const x = onRejectedFunc(reason)
                            myPromise.resolvePromise(this, promise, reason, resolve, reject);
                        } catch (err) {
                            reject(err)
                        }
                    })

                    break;
                case States.FULFILLED:
                    setTimeout(() => {
                        try {
                            const x = onResolveFunc(this.value)
                            myPromise.resolvePromise(this, promise, this.value, resolve, reject);
                        } catch (err) {
                            reject(err)
                        }
                    }, 0)
                    break;
                case States.REJECTED:
                    setTimeout(() => {
                        try {
                            const x = onRejectedFunc(this.reason);
                            myPromise.resolvePromise(this, promise, this.reason, resolve, reject);
                        } catch (err) {
                            reject(err)
                        }
                    }, 0)
                    break;
            }
        })
        return promise;
    }

    public catch(onRejected) {
        this.then(undefined, onRejected);
    }

    public finally(onFinally) {
        this.then(onFinally, onFinally);
    }

    public resolve(value) {
        if (this.state !== States.PENDING) return;
        this.state = States.FULFILLED;
        this.value = value;
        this.onFulfillMicroTasks.forEach((microTask) => { setTimeout(() => { microTask(value) }, 0) })
    }

    public reject(reason) {
        if (this.state !== States.PENDING) return;
        this.state = States.REJECTED;
        this.reason = reason;
        this.caught = true;
        this.onRejectedMicroTasks.forEach((microTask) => { setTimeout(() => { microTask(reason) }, 0) })
    }

}