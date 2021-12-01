---
title: Array
date: 2021-08-01 00:43:00
tags:
---

### javascript

hashmaps or dictionaries(字典) and not conyiguomous（不连续）

原来基于链表实现

### array

1.存放相同类型 2.申请内存空间，必须制定大小 3.插入、删除、扩容性能较差 4.查找效率很高 5.线性结构

## stack

last in first out
进栈 入栈 压栈
出栈 退栈
现实托盘
函数调用栈
合法的出栈序列
(->压入到栈
)->左括号的栈顶元素返回
{{{{{{{{{}{}{}{}{{}{}{}{}{}{}{}}}}}}}}}}
实现：1.数组 2.链表

## queue

frist in frist out
前端删除，后端插入
现实排队
约瑟夫环

## 优先级队列

1.元素添加优先级 2.根据优先级放入正确位置

现实：急诊处理顺序

## 链表

元素本身的节点制定下一个元素的引用
缺点：无法通过下标查找
只能从头部访问
现实火车头

## 树

高度，深度
满二叉树、完全二叉树、非完全二叉树
链式存储结构
数据顺序存储（非完全二叉树使用可能会浪费比较多的空间）
堆就是完全二叉树
前中后序遍历

前序遍历的递推公式：
preOrder(r) = print r->preOrder(r->left)->preOrder(r->right)

中序遍历的递推公式：
inOrder(r) = inOrder(r->left)->print r->inOrder(r->right)

后序遍历的递推公式：
postOrder(r) = postOrder(r->left)->postOrder(r->right)->print r
