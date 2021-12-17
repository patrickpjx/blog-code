/*
 * @lc app=leetcode.cn id=86 lang=typescript
 *
 * [86] 分隔链表
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
import { ListNode } from './206';

function partition(head: ListNode | null, x: number): ListNode | null {
	if (head === null) return head;
	if (head.next === null) return head;
	let current = head;
	let minHead = null;
	let maxHead = null;
	let min = minHead;
	let max = maxHead;
	while (current) {
		if (current.val < x) {
			if (minHead === null) {
				minHead = new ListNode(current.val);
				min = minHead;
			} else {
				minHead.next = new ListNode(current.val);
				minHead = minHead.next;
			}
		} else {
			if (maxHead === null) {
				maxHead = new ListNode(current.val);
				max = maxHead;
			} else {
				maxHead.next = new ListNode(current.val);
				maxHead = maxHead.next;
			}
		}
		current = current.next;
	}
	if (min) {
		minHead.next = max;
		return min;
	}
	return max;
}
// @lc code=end

// 输入：head = [1, 4, 3, 2, 5, 2], x = 3
// 输出：[1, 2, 2, 4, 3, 5]
// 示例 2：

// 输入：head = [2, 1], x = 2
// 输出：[1, 2]
