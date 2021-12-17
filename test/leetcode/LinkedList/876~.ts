/*
 * @lc app=leetcode.cn id=876 lang=typescript
 *
 * [876] 链表的中间结点
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

//  function middleNode(head: ListNode | null): ListNode | null {
//     if (head === null) return null;
//     let middleHead = null;
//     let len = 0;
//     let current = head;
//     while (current) {
//         len++;
//         current = current.next;
//     }
//     let index = 0;
//     if (len % 2 ===0) {
//         index = len / 2;
//     } else {
//         index = Math.floor(len / 2);
//     }
//     current = head;
//     for (let i = 0; i < index; i++){
//         current = current.next;
//     }
//     middleHead = current;
//     return middleHead;
// };

function middleNode(head: ListNode | null): ListNode | null {
    if (head === null) return head;
    let fast = head;
    let slow = head;
    while (fast?.next) {
        fast = fast.next.next;
        slow = slow.next;
    }
    return slow;
};
// @lc code=end

