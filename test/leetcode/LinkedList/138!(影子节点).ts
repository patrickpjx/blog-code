/*
 * @lc app=leetcode.cn id=138 lang=typescript
 *
 * [138] 复制带随机指针的链表
 */

// @lc code=start
/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     next: Node | null
 *     random: Node | null
 *     constructor(val?: number, next?: Node, random?: Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *         this.random = (random===undefined ? null : random)
 *     }
 * }
 */

// 输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
// 输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]

export class Node {
	val: number;
	next: Node | null;
	random: Node | null;
	constructor(val?: number, next?: Node, random?: Node) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
		this.random = random === undefined ? null : random;
	}
}

// radom
function copyRandomList(head: Node | null): Node | null {
	if (head === null) return null;

	let node = head;
	while (node) {
		node.next = new Node(node.val, node.next, null);
		node = node?.next?.next;
	}

	node = head;
	while (node) {
		const next = node.next;
		next.random = node.random !== null ? node.random.next : null;
		node = node?.next?.next;
	}

	let newHead = head.next;
	node = head;
	while (node) {
		let next = node.next;
		node.next = node?.next?.next;
		next.next = next.next !== null ? next.next.next : null;
		node = node.next;
	}

	return newHead;
}
// @lc code=end
