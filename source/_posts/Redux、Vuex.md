---
title: Redux、Vuex
date: 2021-08-04 15:29:29
tags:
---

## 数据流向

Redux：
// view——>actions——>reducer——>state 变化——>view 变化（同步异步一样）

Vuex：
// view——>commit——>mutations——>state 变化——>view 变化（同步操作）
// view——>dispatch——>actions——>mutations——>state 变化——>view 变化（异步操作）

## Redux

action(对象，包含类型属性、传递数据) -> reducer（接收 state、action 从而改变 state） -> store

三大原则：单一数据源、state 只读、函数执行

reducer ban 原则：
修改传入参数；
执行有副作用的操作，如 API 请求和路由跳转；
调用非纯函数，如 Date.now() 或 Math.random()。

```
function somethingHappened(data){
    return {
        type: 'foo',
        data: data
    }
}

function reducer(action, state){
    switch(action.type){
        case 'foo':
            return { data: data };
        default:
            return state;
    }
}


import { createStore } from 'redux'
let store = createStore(reducer);


store.getState(); // {}
store.dispatch(somethingHappened('aaa'));
store.getState(); // { data: 'aaa'}

```

## react-redux

```
技术上讲，容器组件就是使用 store.subscribe() 从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。
你可以手工来开发容器组件，但建议使用 React Redux 库的 connect() 方法来生成，这个方法做了性能优化来避免很多不必要的重复渲染。（
这样你就不必为了性能而手动实现 React 性能优化建议 中的 shouldComponentUpdate 方法。）
```

```
const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveConfig: (data) => dispatch(save(data)),
    };
};

```

## Vuex

```
    官方推荐全局状态管理框架
    前期增加心智成本
    性能问题？其实提供动态管理模块
    更为更为规范，严格，首推
```

## Vuex + Typescript

```
vuex-module-decorators
```

## EventEmitter
