---
title: NextTick
date: 2021-04-19 15:02:46
tags:
---

## $nextTick

dom 更新后，延迟回调中获取更新后的 dom

```
(setTimeout task 中兜底)
Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。
```

## event loop

![](https://pic1.zhimg.com/v2-ad1a251cb91d37625185a4fb874494fc_r.jpg)

```
同一时间只能执行一个任务。
任务一直执行到完成，不能被其他任务抢断
```

## call stack、task queue

同步任务->微任务队列->任务(消息)队列（处理异步、请求回调函数加入任务队列）

### task

script 整体代码,setTimeout,setInterval,setImmediate,requestAnimationFrame,UI rendeing,nodeJS 中的 I/O

### microtask

Promise,Object.observe,MutationObserver，nodeJs 中的 process.nextTick

microTask 机制可以进行插队

### setTimeout 与 promise

```
setTimeout(function () {
    console.log(4);
}, 0);
new Promise(function (resolve) {
    console.log(1);
    for (let i = 0; i < 10000; i++) {
        i === 9999 && resolve();
    }
    console.log(2);
}).then(function () {
    console.log(5);
});
console.log(3);

//（Promise executor）立即执行
```

out: 1 2 3 5 4

![https://github.com/Ma63d/vue-analysis/issues/6]
