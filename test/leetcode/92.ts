/*
 * @lc app=leetcode.cn id=92 lang=typescript
 *
 * [92] 设计链表
 */


// export class ListNode {
//     constructor(public element, public next?: ListNode) { }
// }

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    if (head == null) {
        return null;
    }
    let startNode = head;
    let endNode = head;
    let leftNode = head;

    for (let i = 0; i < right - 1; i++) {
        if (!endNode) {
            return head;
        }
        if (i < left - 1) {
            leftNode = endNode.next;
            startNode = endNode;
        }
        endNode = endNode.next;
    }

    const reverseList = (head) => {
        let current = head;
        let prev = endNode.next || null;
        let next = null;
        for (let i = 0; i < right - left + 1; i++) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return prev;
    }

    if (left == 1) {
        return reverseList(leftNode);
    }

    if (left === right) {
        return head;
    }

    startNode.next = reverseList(leftNode);
    return head;
};

// (function (arr) {
//     let currnet = null;
//     let head = null;
//     for (const i of arr) {
//         const node = new ListNode(i);
//         if (currnet == null) {
//             head = currnet = node;
//         } else {
//             currnet.next = node;
//             currnet = currnet.next;
//         }
//     }

//     const h = reverseBetween(head, 3, 4)
//     const string = (h) => {
//         let c = h;
//         let str = ''
//         while (c) {
//             console.log(c.element);
//             str += c.element + ',';
//             c = c.next;
//         }
//         console.log(str);
//     }

//     string(h);
// })([5])

