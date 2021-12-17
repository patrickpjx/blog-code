/*
 * @lc app=leetcode.cn id=328 lang=typescript
 *
 * [328] 奇偶链表
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

// import { ListNode } from './206(反转)';
import { ListNode } from './206(反转)';

function oddEvenList(head: ListNode | null): ListNode | null {
	if (head === null) return head;
	let dHead = null;
	let sHead = null;
	let current = head;
	let index = 0;
	let s = null;
	while (current) {
		if (index % 2 === 0) {
			if (dHead === null) {
				dHead = current;
			} else {
				dHead.next = current;
				dHead = dHead.next;
			}
		} else {
			if (sHead === null) {
				sHead = current;
				s = current;
			} else {
				sHead.next = current;
				sHead = sHead.next;
			}
		}
		index++;
		current = current.next;
	}
	if (s) {
		sHead.next = null;
		dHead.next = s;
	}
	return head;
}
// @lc code=end

// 输入: 1->2->3->4->5->NULL
// 输出: 1->3->5->2->4->NULL

// 示例 2:
// 输入: 2->1->3->5->6->4->7->NULL
// 输出: 2->3->6->7->1->5->4->NULL
