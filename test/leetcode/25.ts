/*
 * @lc app=leetcode.cn id=25 lang=typescript
 *
 * [25] K 个一组翻转链表
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

//  给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。
//  k 是一个正整数，它的值小于或等于链表的长度。
// 如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
// 进阶：
// 你可以设计一个只使用常数额外空间的算法来解决此问题吗？
// 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
import { ListNode } from './206';

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
	if (!head) return head;
	if (k === 1) return head;
	let current = head;
	let prev = null;
	let next = null;
	let exac = true;
	let exacNext = current;
	for (let j = 0; j < k; j++) {
		if (!exacNext) {
			exac = false;
			return head;
		}
		exacNext = exacNext.next;
	}
	prev = reverseKGroup(exacNext, k);
	for (let i = 0; i < k; i++) {
		next = current.next;
		current.next = prev;
		prev = current;
		current = next;
	}
	return prev;
}

// @lc code=end

// head = [1,2,3,4,5], k = 2
// 输出：[2, 1, 4, 3, 5]

// 输入：head = [1,2,3,4,5], k = 3
// 输出：[3, 2, 1, 4, 5]

// 输入：head = [1,2,3,4,5], k = 1
// 输出：[1,2,3,4,5]
