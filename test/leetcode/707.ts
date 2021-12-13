/*
 * @lc app=leetcode.cn id=707 lang=typescript
 *
 * [707] 设计链表
 */

// @lc code=start
class MyNode {
	public element = null;
	public next = null;
	public prev = null;
	public constructor(element, next?, prev?) {
		this.element = element;
		this.next = next;
		this.prev = prev;
	}
}

// @lc code=start
class MyLinkedList {
	protected head: MyNode;
	protected tail: MyNode;
	protected count = 0;

	protected get(index: number): number {
		if (index >= 0 && index < this.count) {
			if (index === 0) {
				return this.head.element;
			} else {
				let current = this.head;
				for (let i = 0; i < index; i++) {
					current = current.next;
				}
				return current.element;
			}
		}
		return -1;
	}

	protected addAtHead(val: number): void {
		const node = new MyNode(val);
		if (this.head === null) {
			this.head = node;
			this.tail = node;
		} else {
			this.head.prev = node;
			node.next = this.head;
			this.head = node;
		}
		this.count++;
	}

	protected addAtTail(val: number): void {
		const node = new MyNode(val);
		if (this.head === null) {
			this.head = node;
			this.tail = node;
		} else {
			this.tail.next = node;
			node.prev = this.tail;
			this.tail = node;
		}
		this.count++;
	}

	protected addAtIndex(index: number, val: number): void {
		if (index >= 0 && index <= this.count) {
			if (index === 0) {
				this.addAtHead(val);
			} else if (index === this.count) {
				this.addAtTail(val);
			} else {
				const node = new MyNode(val);
				let prev = this.head;
				for (let i = 0; i < index - 1 && prev !== null; i++) {
					prev = prev.next;
				}
				let current = prev.next;
				node.next = current;
				prev.next = node;
				current.prev = node;
				node.prev = prev;
				this.count++;
			}
		}
	}

	protected deleteAtIndex(index: number): void {
		if (index >= 0 && index < this.count) {
			if (index === 0) {
				this.head = this.head.next;
			} else if (index === this.count - 1) {
				this.tail = this.tail.prev;
			} else {
				let prev = this.head;
				for (let i = 0; i < index - 1 && prev !== null; i++) {
					prev = prev.next;
				}
				prev.next = prev.next.next;
			}
			this.count--;
		}
	}

	protected toString() {
		let str = '';
		let current = this.head;
		for (let i = 0; i < this.count; i++) {
			console.log(current.element);
			str += current.element + ',';
			current = current.next;
		}
		console.log(str);
	}
}

// 206、92、24、25
