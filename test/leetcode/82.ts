/*
 * @lc app=leetcode.cn id=82 lang=typescript
 *
 * [82] 删除排序链表中的重复元素 II
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

function deleteDuplicates(head: ListNode | null): ListNode | null {
	if (head === null) return head;
	if (head.next === null) return head;
	let next = head.next;
	if (head.val === next.val) {
		if (next.next && next.next.val === head.val) {
			return deleteDuplicates(next);
		} else {
			return deleteDuplicates(next.next);
		}
	}
	head.next = deleteDuplicates(next);
	return head;
}

// 直接移动节点更佳
