/*
 * @lc app=leetcode.cn id=234 lang=typescript
 *
 * [234] 回文链表
 */

import { ListNode } from "./206(反转)";
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

// 快慢指针
 function isPalindrome(head: ListNode | null): boolean {
     if (head === null) return false;
     if (head.next === null) return true;
     let middleHead = middleNode(head);
     let halfofList = reverseList(middleHead.next);
     let l1 = head;
     let l2 = halfofList;
     let result = true
     while (result && l2 !== null) {
         if (l1.val !== l2.val) result = false;
         l1 = l1.next;
         l2 = l2.next
     }
    middleHead.next = reverseList(halfofList)
    return result;
};


function middleNode(head: ListNode | null): ListNode | null {
    if (head === null) return head;
    let fast = head;
    let slow = head;
    while (fast?.next?.next) {
        fast = fast.next.next;
        slow = slow.next;
    }
    return slow;
};


function reverseList(head:ListNode | null) :ListNode|null{
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

// 输入：head = [1,2,2,1]
// 输出：true
// 示例 2：


// 输入：head = [1,2]
// 输出：false


// 递归最后一组是匹配的 可以尝试一下