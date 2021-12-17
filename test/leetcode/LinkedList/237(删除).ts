/*
 * @lc app=leetcode.cn id=237 lang=typescript
 *
 * [237] 删除链表中的节点
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

/**
 Do not return anything, modify it in-place instead.
 */
import { ListNode } from './206(反转)';

function deleteNode(root: ListNode | null): void {
	root.val = root.next.val;
	root.next = root.next.next;
}
// @lc code=end

// 链表中节点的数目范围是 [2, 1000]
// -1000 <= Node.val <= 1000
// 链表中每个节点的值都是唯一的
// 需要删除的节点 node 是 链表中的一个有效节点 ，且 不是末尾节点
