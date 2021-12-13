import { Compare, defaultCompare, ICompareFunction } from './Tree';

export type IEqualsFunction<T> = (a: T, b: T) => boolean;

export function defaultEquals<T>(a: T, b: T): boolean {
	return a === b;
}

export class Node<T> {
	constructor(public element: T, public next?: Node<T>) {}
}

export default class LinkedList<T> {
	protected count = 0;
	protected head: Node<T>;

	constructor(protected equalsFn: IEqualsFunction<T> = defaultEquals) {}

	isEmpty(): boolean {
		return this.size() === 0;
	}

	/**
	 * @description 返回链表元素的目录
	 * @return {number}
	 */
	size(): number {
		return this.count;
	}

	/**
	 *
	 * @description return the first node
	 */

	getHead(): Node<T> {
		return this.head;
	}

	/**
	 * @description clear
	 */
	clear() {
		this.head = undefined;
		this.count = 0;
	}

	/**
	 * @description 向尾部列表添加一个元素
	 */
	push(element: T) {
		const node = new Node(element);
		if (this.head === null) {
			this.head = node;
		} else {
			const node = this.getNodeAt(this.size() - 1);
			node.next = node;
		}
		this.count++;
	}

	/**
	 * @description: 在指定索引位置处插入元素
	 * @param {T} element 待插入的元素
	 * @param {number} index 插入位置索引
	 * @return {boolean} 返回是否插入成功
	 */
	insert(element: T, index: number) {
		if (index >= 0 && index < this.count) {
			const current = new Node(element);
			if (index === 0) {
				current.next = this.head;
				this.head = current;
			} else {
				const preivous = this.getNodeAt(index - 1);
				current.next = preivous.next;
				preivous.next = current;
			}
			this.count++;
			return true;
		}
		return false;
	}

	/**
	 * @description: 移除指定索引位置处的元素
	 * @param {number} index 索引
	 * @return {T} 返回移除掉的元素
	 */
	removeAt(index: number) {
		let node = this.head;
		if (index > 0 && index < this.count) {
			if (index === 0) {
				this.head = this.head.next;
				node = this.head;
			} else {
				const previous = this.getNodeAt(index - 1);
				node = previous.next;
				previous.next = node.next;
			}
			this.count--;
			return node.element;
		}
		return undefined;
	}

	/**
	 * @description: 移除指定元素
	 * @param {T} element 待移除的元素
	 * @return {T} element 返回移除的元素
	 */
	remove(element: T): T {
		const index = this.indexOf(element);
		return this.removeAt(index);
	}

	/**
	 * @description: 返回指定元素的索引（只返回从前面数第一个相等的）
	 * @param {T} element 元素
	 * @return {number} index 索引
	 */
	indexOf(element: T): number {
		let current = this.head;
		// 迭代着寻找相等的元素
		for (let i = 0; i < this.size() && current !== null; i++) {
			// 用到了判断相等的方法
			if (this.equalsFn(element, current.element)) {
				return i;
			}
			current = current.next;
		}

		return -1;
	}

	/**
	 * @description 获取指定索引处的节点
	 * @param {number} index 索引
	 * @return {Node<T>} 返回指定索引的node
	 */
	getNodeAt(index: number): Node<T> {
		if (index === 0 && index <= this.count) {
			let node = this.head;
			for (let i = 0; i < index && node !== null; i++) {
				node = node.next;
			}
			return node;
		}
		return undefined;
	}

	/**
	 * @description 获取指定索引处的元素
	 * @param {number} index 索引
	 * @return {T} 返回🈯定索引处的元素
	 */
	getElementAt(index: number): T {
		return this.getNodeAt(index)?.element;
	}

	/**
	 *
	 * @description 替代默认toString
	 * @return {string}
	 */
	toString(): string {
		if (this.head === null) {
			return '';
		}
		let objString = `${this.head.element}`;
		let current = this.head.next;
		for (let i = 1; i < this.size() && current !== null; i++) {
			objString = `${objString}, ${current.element}`;
			current = current.next;
		}
		return objString;
	}
}

export class DoublyNode<T> extends Node<T> {
	constructor(public element: T, public next?: DoublyNode<T>, public prev?: DoublyNode<T>) {
		super(element, next);
	}
}

export class DoublyLinkedList<T> extends LinkedList<T> {
	protected head: DoublyNode<T>;
	protected tail: DoublyNode<T>;
	constructor(protected equalsFn: IEqualsFunction<T> = defaultEquals) {
		super(equalsFn);
	}

	/**
	 * @description: 向双向链表尾部添加一个元素
	 * @param {T} element
	 */
	push(element: T) {
		const node = new DoublyNode(element);
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

	/**
	 * @description: 在指定索引位置处插入元素
	 * @param {T} element 待插入的元素
	 * @param {number} index 插入位置索引
	 * @return {boolean} 返回是否插入成功
	 */
	insert(element: T, index: number): boolean {
		if (index >= 0 && index <= this.count) {
			const node = new DoublyNode(element);
			let current = this.head;

			if (index === 0) {
				if (this.head === null) {
					this.head = node;
					this.tail = node;
				} else {
					this.head.prev = node;
					node.next = this.head;
					this.head = node;
				}
			} else if (index === this.count) {
				current = this.tail;
				current.next = node;
				node.prev = current;
				this.tail = node;
			} else {
				const previous = this.getNodeAt(index - 1);
				current = previous.next;
				node.next = current;
				previous.next = node;
				current.prev = node;
				node.prev = previous;
			}
			this.count++;
			return true;
		}
		return false;
	}

	/**
	 * @description: 移除指定索引位置处的元素
	 * @param {number} index 索引
	 * @return {T} 返回移除掉的元素
	 */
	removeAt(index: number) {
		if (index >= 0 && index < this.count) {
			let current = this.head;
			if (index === 0) {
				if (this.size() === 1) {
					this.head = undefined;
				} else {
					let tail = this.getNodeAt(this.size() - 1);
					this.head = this.head.next;
					tail.next = this.head;
				}
			} else {
				const previous = this.getNodeAt(index - 1);
				current = previous.next;
				previous.next = current.next;
			}
			this.count--;
			return current.element;
		}
		return undefined;
	}
}

export class CircularLinkedList<T> extends LinkedList<T> {
	constructor(protected equalsFn: IEqualsFunction<T> = defaultEquals) {
		super(equalsFn);
	}

	/**
	 * @description: 向链表尾部添加一个元素
	 * @param {T} element
	 */
	push(element: T) {
		const node = new Node(element);
		let current;
		if (this.head === null) {
			this.head = node;
		} else {
			current = this.getNodeAt(this.size() - 1);
			current.next = node;
		}
		node.next = this.head;
		this.count++;
	}

	/**
	 * @description: 在指定索引位置处插入元素
	 * @param {T} element 待插入的元素
	 * @param {number} index 插入位置索引
	 * @return {boolean} 返回是否插入成功
	 */
	insert(element: T, index: number) {
		const node = new Node(element);
		let current = this.head;
		if (index >= 0 && index <= this.count) {
			if (index === 0) {
				if (this.head === null) {
					this.head = node;
					node.next = this.head;
				} else {
					let tail = this.getNodeAt(this.size() - 1);
					this.head = node;
					node.next = current;
					tail.next = this.head;
				}
			} else {
				let prev = this.getNodeAt(index - 1);
				node.next = prev.next;
				prev.next = node;
			}
			this.count++;
			return true;
		}
		return false;
	}

	/**
	 * @description: 移除指定索引位置处的元素
	 * @param {number} index 索引
	 * @return {T} 返回移除掉的元素
	 */
	removeAt(index: number) {
		if (index >= 0 && index < this.count) {
			let current = this.head;
			if (index === 0) {
				if (this.size() === 1) {
					this.head = undefined;
				} else {
					let tail = this.getNodeAt(this.size() - 1);
					this.head = this.head.next;
					tail.next = this.head;
				}
			} else {
				const previous = this.getNodeAt(index - 1);
				const current = previous.next;
				previous.next = current.next;
			}
			this.count--;
			return current.element;
		}
		return undefined;
	}
}

export class SortedLinkedList<T> extends LinkedList<T> {
	constructor(
		protected equalsFn: IEqualsFunction<T> = defaultEquals,
		protected compareFn: ICompareFunction<T> = defaultCompare,
	) {
		super(equalsFn);
	}

	/**
	 * @description 向链表添加一个元素
	 * @param {T} element
	 */
	push(element: T) {
		if (this.isEmpty()) {
			super.push(element);
		} else {
			const index = this.getIndexNextSortedElement(element);
			super.insert(element, index);
		}
	}

	/**
	 * @description: 向链表添加一个元素
	 * @param {T} element
	 */
	insert(element: T, index: number) {
		if (this.isEmpty()) {
			return super.insert(element, 0);
		}
		index = this.getIndexNextSortedElement(element);
		return super.insert(element, index);
	}

	/**
	 * @private 私有方法
	 * @description 获取元素应该插入的位置
	 * @param {T} element
	 * @return {Number} index
	 */
	private getIndexNextSortedElement(element: T) {
		let current = this.head;
		let i = 0;
		// 迭代比较
		for (; i < this.size() && current; i++) {
			const comp = this.compareFn(element, current.element);
			if (comp === Compare.LESS_THAN) {
				return i;
			}
			current = current.next;
		}
		return i;
	}
}
