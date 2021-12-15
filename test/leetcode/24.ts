/*
 * @lc app=leetcode.cn id=24 lang=typescript
 *
 * [24] 两两交换链表中的节点
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

export class ListNode {
	public element = null;
	public next?: ListNode = null;
	public constructor(element, next?: ListNode) {
		this.element = element;
		this.next = next;
	}
}

// function swapPairs(head: ListNode | null): ListNode | null {
//     if (head === null) {
//         return null;
//     }
//     let current = head;
//     let next = null;
//     while (current) {
//         next = current.next;
//         if (current.next?.next) {
//             current.next.next = reverseList(current);
//         }
//         current = current.next?.next;
//     }
//     return arr[0];
// };

// function reverseList(head) {
//     let current = head;
//     let prev = null;
//     let next = null;
//     while (current) {
//         next = current.next;
//         current.next = prev;
//         prev = current;
//         current = next;
//     }
//     return prev;
// }

function swapPairs(head: ListNode | null): ListNode | null {
	if (head === null || head.next === null) {
		return head;
	}
	let next = head.next;
	head.next = swapPairs(next.next);
	next.next = head;
	return next;
}

(function (arr) {
	let currnet = null;
	let head = null;
	for (const i of arr) {
		const node = new ListNode(i);
		if (currnet === null) {
			head = currnet = node;
		} else {
			currnet.next = node;
			currnet = currnet.next;
		}
	}

	const h = swapPairs(head);

	const string = (h) => {
		let c = h;
		let str = '';
		while (c) {
			console.log(c.element);
			str += c.element + ',';
			c = c.next;
		}
		console.log(str);
	};

	string(h);
})([1, 2, 3, 4]);

// function swapPairs(head: ListNode | null): ListNode | null {
//     if (head === null) {
//         return null;
//     }
//     const arr = [];
//     let current = head;
//     let next = null;
//     while (current) {
//         next = current.next;
//         arr.push(current)
//         current = current.next?.next;
//         if (next) {
//             next.next = null;
//         }
//     }

//     for (let i = 0; i < arr.length; i++) {
//         arr[i] = reverseList(arr[i])
//     }
//     current = arr[0]
//     for (let j = 0; j < arr.length - 1; j++) {
//         current.next.next = arr[j + 1];
//         current = arr[j + 1];
//     }

//     return arr[0];
// };

// @lc code=end

// var swapPairs = function (head) {
//     if (!head || !head.next) return head
//     var one = head
//     var two = one.next
//     var three = two.next
//     two.next = one
//     one.next = swapPairs(three)
//     return two
// };

// class Solution {
//     public ListNode swapPairs(ListNode head) {
//         if(head == null || head.next == null){
//             return head;
//         }
//         ListNode next = head.next;
//         head.next = swapPairs(next.next);
//         next.next = head;
//         return next;
//     }
// }

// class Solution {
//     public ListNode swapPairs(ListNode head) {
//         ListNode pre = new ListNode(0);
//         pre.next = head;
//         ListNode temp = pre;
//         while(temp.next != null && temp.next.next != null) {
//             ListNode start = temp.next;
//             ListNode end = temp.next.next;
//             temp.next = end;
//             start.next = end.next;
//             end.next = start;
//             temp = start;
//         }
//         return pre.next;
//     }
// }
