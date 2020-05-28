---
title: ArrayBuffer
date: 2020-05-15 16:13:41
tags:
- deno
- ArrayBuffer
categories: pieces
---
#### 1.ArrayBuffer
ArrayBuffer对象作为内存区域可以存放多种类型的数据。同一段内存，不同数据有不同的解读方式，这种解读方式称为“视图（view）”。ArrayBuffer有两种类型的视图，一种是类型化数组视图（TypedArray），另一种是数据视图（DataView）。类型化数组视图的数组成员都是同一个数据类型，后者的数组成员可以是不同的数据类型。
#### 2.TypedArray
这些视图实现了数组接口，均有length属性，都可以使用方括号运算符来获取单个元素，所有数组方法都可以在其上面使用。普通数组和TypedArray数组的差异主要在以下方面
1、TypedArray数组的所有成员都是同一种类型。
2、TypedArray数组的成员是连续的，不会有空位，不存在稀疏数组的情况。
3、TypedArray数组成员的默认值是0。
TypedArray数组只是一个视图，本身不存储数据，它的数据都存储在底层的ArrayBuffer对象中，要获取底层对象必须使用buffer属性。

