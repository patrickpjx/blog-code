---
title: Typescript高级类型、范型
date: 2020-06-16 15:15:12
tags:
---


# 高级类型
keyof

``````
function get<T extends object, K extends keyof T>(o: T, name: K): T[K] {
 return o[name]
}
``````