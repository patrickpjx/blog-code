/*
 * @lc app=leetcode.cn id=143 lang=typescript
 *
 * [143] 重排链表
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
import { ListNode } from './206(反转)';
/**
 Do not return anything, modify head in-place instead.
 */
function reorderList(head: ListNode | null): void {
	if (head === null) return;
	let slow = head;
	let fast = head;
	while (fast?.next?.next) {
		fast = fast.next.next;
		slow = slow.next;
	}
	let halfMiddleHead = reverseList(slow.next);
	slow.next = null;
	let current = head;
	let next = null;
	while (current && halfMiddleHead) {
		next = current.next;
		current.next = halfMiddleHead;
		halfMiddleHead = halfMiddleHead.next;
		current.next.next = next;
		current = next;
	}
}

function reverseList(head: ListNode | null): ListNode | null {
	if (head === null) return head;
	let current = head;
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

// 给定一个单链表 L 的头节点 head ，单链表 L 表示为：

// L0 → L1 → … → Ln - 1 → Ln
// 请将其重新排列后变为：

// L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
// 不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

// 示例 1：
// 输入：head = [1,2,3,4]
// 输出：[1,4,2,3]
// 示例 2：

// 输入：head = [1,2,3,4,5]
// 输出：[1,5,2,4,3]

// 提示：
// 链表的长度范围为 [1, 5 * 104]
// 1 <= node.val <= 1000
