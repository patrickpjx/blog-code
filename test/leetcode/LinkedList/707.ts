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
// 203、 82、237
// 21 2 445
// 328 86 138
// 876 234 143 109 19 61 141 142/ 147 148 160 430 725 817


// 平均时间复杂度
// n表示数组array的长度
// int find(int[] array, int n, int x) {
//     int i = 0;
//     int pos = -1;
//     for (; i < n; ++i) {
//       if (array[i] == x) {
//          pos = i;
//          break;
//       }
//     }
//     return pos;
//   }


// 均摊时间复杂度（摊还分析法）
// array表示一个长度为n的数组
// 代码中的array.length就等于n
//  int[] array = new int[n];
//  int count = 0;
//  void insert(int val) {
//     if (count == array.length) {
//        int sum = 0;
//        for (int i = 0; i < array.length; ++i) {
//           sum = sum + array[i];
//        }
//        array[0] = sum;
//        count = 1;
//     }
//     array[count] = val;
//     ++count;
//  }