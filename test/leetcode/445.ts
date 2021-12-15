/*
 * @lc app=leetcode.cn id=445 lang=typescript
 *
 * [445] 两数相加 II
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

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
	if (l1 === null && l2 === null) return null;
	if (l1 === null && l2 !== null) return l2;
	if (l2 === null && l1 !== null) return l1;

	l1 = reverseList(l1);
	l2 = reverseList(l2);

	let add = 0;
	const head = new ListNode(0);
	let prev = head;
	let currentValue = 0;

	while (l1 && l2) {
		const value = l1.val + l2.val + add;
		currentValue = value % 10;
		add = Math.floor(value / 10);
		prev.next = new ListNode(currentValue);
		prev = prev.next;
		l1 = l1.next;
		l2 = l2.next;
	}

	while (l1) {
		const value = l1.val + add;
		currentValue = value % 10;
		add = Math.floor(value / 10);
		prev.next = new ListNode(currentValue);
		prev = prev.next;
		l1 = l1.next;
	}

	while (l2) {
		const value = l2.val + add;
		currentValue = value % 10;
		add = Math.floor(value / 10);
		prev.next = new ListNode(currentValue);
		prev = prev.next;
		l2 = l2.next;
	}

	if (add === 1) {
		prev.next = new ListNode(add);
		prev = prev.next;
	}

	return reverseList(head.next);
}

function reverseList(root: ListNode | null): ListNode | null {
	let current = root;
	let prev = null;
	let next = null;
	while (current) {
		next = current.next;
		current.next = prev;
		prev = current;
		current = next;
	}
	return prev;
}
// @lc code=end

// 输入：l1 = [7,2,4,3], l2 = [5,6,4]
// 输出：[7,8,0,7]
// 示例2：

// 输入：l1 = [2,4,3], l2 = [5,6,4]
// 输出：[8,0,7]
// 示例3：

// 输入：l1 = [0], l2 = [0]
// 输出：[0]

// 提示：
// 链表的长度范围为 [1, 100]
// 0 <= node.val <= 9
// 输入数据保证链表代表的数字无前导 0
