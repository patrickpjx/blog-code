/*
 * @lc app=leetcode.cn id=61 lang=typescript
 *
 * [61] 旋转链表
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

 function rotateRight(head: ListNode | null, k: number): ListNode | null {
     if (head === null) return head;
    let fast = head;
    let slow = new ListNode(0, head);
    let len = 1;

    while (fast?.next) {
        fast = fast.next
        len++;
    }

    let n = k % len;

    fast = head;
    for (let i = 0; i < n; i++){
        fast = fast.next;
    }

     
    let rHead = slow;
    while (fast) {
        fast = fast.next
        slow = slow.next;
    }
    if (slow.next === null) {
         return rHead.next;
    }
    rHead = slow.next;
    slow.next = null;
    slow = rHead;
    while (slow?.next) {
        slow = slow.next
    }
    slow.next = head;
    return rHead;
};

function reverseList(head: ListNode | null, p:ListNode | null): ListNode | null{
    if (head === null) return head;
    let current = head;
    let prev = p;
    let next= null
    while (current) {
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev;
}
// @lc code=end

// 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。

// 示例 1：
// 输入：head = [1,2,3,4,5], k = 2
// 输出：[4,5,1,2,3]
// 示例 2：

// 输入：head = [0,1,2], k = 4
// 输出：[2,0,1]
// 提示：

// 链表中节点的数目在范围 [0, 500] 内
// -100 <= Node.val <= 100
// 0 <= k <= 2 * 109
