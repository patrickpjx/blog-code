/*
 * @lc app=leetcode.cn id=2 lang=typescript
 *
 * [2] 两数相加
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

// export class ListNode {
//     public val = null;
//     public next?: ListNode = null;
//     public constructor(val, next?: ListNode) {
//         this.val = val;
//         this.next = next;
//     }
// }
import { ListNode } from './206(反转)';

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
	if (l1 === null && l2 === null) return null;
	if (l1 === null) return l2;
	if (l2 === null) return l1;
	let add = 0;
	let currentValue = 0;
	let head = new ListNode(0);
	let pre = head;
	while (l1 && l2) {
		const value = l1.val + l2.val + add;
		currentValue = value % 10;
		add = Math.floor(value / 10);
		pre.next = new ListNode(currentValue);
		pre = pre.next;
		l1 = l1.next;
		l2 = l2.next;
	}

	while (l1) {
		const value = l1.val + add;
		currentValue = value % 10;
		add = Math.floor(value / 10);
		pre.next = new ListNode(currentValue);
		pre = pre.next;
		l1 = l1.next;
	}

	while (l2) {
		const value = l2.val + add;
		currentValue = value % 10;
		add = Math.floor(value / 10);
		pre.next = new ListNode(currentValue);
		pre = pre.next;
		l2 = l2.next;
	}

	if (add === 1) {
		pre.next = new ListNode(add);
		pre = pre.next;
	}

	return head.next;
}
// @lc code=end
