/*
 * @lc app=leetcode.cn id=21 lang=typescript
 *
 * [21] 合并两个有序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

import { ListNode } from './206';
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
	if (list1 === null && list2 === null) return null;
	if (list1 === null) return list2;
	if (list2 === null) return list1;
	let a = list1;
	let b = list2;
	let current = list1;
	if (a.val <= b.val) {
		a = a.next;
	} else {
		current = list2;
		b = b.next;
	}
	let next = current;
	while (a || b) {
		if (!a) {
			next.next = b;
			b = b.next;
		} else if (!b) {
			next.next = a;
			a = a.next;
		} else if (a.val <= b.val) {
			next.next = a;
			a = a.next;
		} else {
			next.next = b;
			b = b.next;
		}
		next = next.next;
	}
	return current;
}

// 迭代法
// var mergeTwoLists = function(l1, l2) {
//     if (l1 === null) {
//         return l2;
//     } else if (l2 === null) {
//         return l1;
//     } else if (l1.val < l2.val) {
//         l1.next = mergeTwoLists(l1.next, l2);
//         return l1;
//     } else {
//         l2.next = mergeTwoLists(l1, l2.next);
//         return l2;
//     }
// };
