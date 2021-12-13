import LinkedList, { defaultEquals } from './LinkedList';

/**
 *
 * @description: 将item转换为字符串
 */
export function defaultToString(item: any): string {
	// 对于null undefined和字符串处理
	if (item === null) {
		return 'NULL';
	} else if (item === undefined) {
		return 'UNDEFINED';
	} else if (typeof item === 'string' || item instanceof String) {
		return `${item}`;
	}
	return item.toString();
}

export default class HashTable<K, V> {
	protected table: Map<number, V>;
	constructor(protected toStrFn: (key: K) => string = defaultToString) {
		this.table = new Map();
	}

	/**
	 *  @description 哈希函数
	 */
	private djb2HashCodeH(key: K): number {
		if (typeof key === 'number') {
			return key;
		}
		const tableKey = this.toStrFn(key);
		let hash = 5381;
		for (let i = 0; i < tableKey.length; i++) {
			hash = hash * 33 + tableKey.charCodeAt(i);
		}
		return hash % 1013;
	}

	/**
	 * @description 计算键的哈希值
	 */
	public hashCode(key): number {
		return this.djb2HashCodeH(key);
	}

	/**
	 * @description 更新散列表
	 */
	put(key: K, value: V): boolean {
		if (key !== null && value !== null) {
			const position = this.hashCode(key);
			this.table.set(position, value);
			return true;
		}
		return false;
	}

	/**
	 * @description 根据键获取值
	 */
	get(key: K): V {
		return this.table.get(this.hashCode(key));
	}

	/**
	 * @description 根据键移除值
	 */
	remove(key: K): boolean {
		return this.table.delete(this.hashCode(key));
	}

	/**
	 * @description 返回内部table
	 */
	getTable(): Map<number, V> {
		return this.table;
	}

	/**
	 *
	 * @description 散列表的大小
	 */
	size(): number {
		return this.table.size;
	}

	/**
	 * @description 返回是否为空散列表
	 */
	isEmpty(): boolean {
		return this.table.size === 0;
	}

	/**
	 * @description 清空散列表
	 */
	clear() {
		return this.table.clear();
	}

	/**
	 * @description 替代默认的toString
	 */
	toString(): string {
		if (this.isEmpty()) {
			return '';
		}
		let objStringList = [];
		for (const [hashCode, value] of this.table) {
			objStringList.push(`${hashCode}=>${value}`);
		}
		return objStringList.join(',');
	}
}

export class HashTableSeparateChaining<K, V> {
	protected table: Map<number, LinkedList<{ key: K; value: V }>>;
	constructor(protected toStrFn: (key: K) => string = defaultToString) {
		this.table = new Map();
	}

	/**
	 * @description: 哈希函数
	 */
	private loseloseHashCode(key: K): number {
		if (typeof key === 'number') {
			return key;
		}
		const tableKey = this.toStrFn(key);
		let hash = 0;
		for (let i = 0; i < tableKey.length; i++) {
			hash += tableKey.charCodeAt(i);
		}
		return hash % 37;
	}

	/**
	 * @description: 哈希函数封装
	 */
	hashCode(key: K): number {
		return this.loseloseHashCode(key);
	}

	put(key: K, value: V): boolean {
		if (key !== null && value !== null) {
			const position = this.hashCode(key);
			if (this.table.get(position) === null) {
				this.table.set(position, new LinkedList<{ key: K; value: V }>());
			}
			this.table.get(position).push({ key, value });
			return true;
		}
		return false;
	}

	get(key: K): V {
		const position = this.hashCode(key);
		const LinkedList = this.table.get(position);
		if (LinkedList !== null && !LinkedList.isEmpty()) {
			let current = LinkedList.getHead();
			while (current !== null) {
				if (current.element.key !== null) {
					if (current.element.key === key) {
						return current.element.value;
					}
					current = current.next;
				}
			}
		}
		return undefined;
	}

	remove(key: K): boolean {
		const position = this.hashCode(key);
		const LinkedList = this.table.get(position);
		if (LinkedList !== null && !LinkedList.isEmpty()) {
			let current = LinkedList.getHead();
			while (current !== null) {
				if (current.element.key === key) {
					LinkedList.remove(current.element);
					if (LinkedList.isEmpty()) {
						this.table.delete(position);
					}
					return true;
				}
				current = current.next;
			}
		}
		return undefined;
	}

	isEmpty(): boolean {
		return this.size() === 0;
	}

	size(): number {
		let count = 0;
		for (const [hashCode, LinkedList] of this.table) {
			count += LinkedList.size();
		}
		return count;
	}
}

export class HashTableSeparateProbing<K, V> {
	protected table: Map<number, { key: K; value: V }>;
	constructor(protected toStrFn: (key: K) => string = defaultToString) {
		this.table = new Map();
	}

	/**
	 * @description: 哈希函数
	 */
	private loseloseHashCode(key: K): number {
		if (typeof key === 'number') {
			return key;
		}
		const tableKey = this.toStrFn(key);
		let hash = 0;
		for (let i = 0; i < tableKey.length; i++) {
			hash += tableKey.charCodeAt(i);
		}
		return hash % 37;
	}

	/**
	 * @description: 哈希函数封装
	 */
	public hashCode(key: K): number {
		return this.loseloseHashCode(key);
	}

	/**
	 * @description: 更新散列表
	 */
	public put(key: K, value: V): boolean {
		if (key !== null && value !== null) {
			const position = this.hashCode(key);
			if (this.table.get(position) === null) {
				this.table.set(position, { key, value });
			} else {
				let index = position + 1;
				while (this.table.get(index) === null) {
					index++;
				}
				this.table.set(index, { key, value });
			}
			return true;
		}
		return false;
	}

	/**
	 * @description 格局键获取值
	 */
	get(key: K): V {
		const position = this.hashCode(key);
		if (this.table.get(position) !== null) {
			if (this.table.get(position).key === key) {
				return this.table.get(position).value;
			}
			let index = position + 1;
			while (this.table.get(index) !== null && this.table.get(index).key !== key) {
				index++;
			}
			return this.table.get(index).value;
		}
		return undefined;
	}

	/**
	 * @description: 根据键移除值
	 */
	remove(key: K): boolean {
		const position = this.hashCode(key);
		if (this.table.get(position).key === key) {
			this.table.delete(position);
			this.verifyRemoveSideEffect(key, position);
			return true;
		}

		let index = position + 1;
		while (this.table.get(index) !== null && this.table.get(index).key !== key) {
			index++;
		}
		if (this.table.get(index) !== null && this.table.get(index).key === key) {
			this.table.delete(index);
			// 同样在删除后处理副作用
			this.verifyRemoveSideEffect(key, index);
			return true;
		}
		return false;
	}

	private verifyRemoveSideEffect(key: K, removedPosition: number) {
		const hash = this.hashCode(key);
		let index = removedPosition + 1;
		// 迭代着处理后面的每一个键值对
		while (this.table.get(index) !== null) {
			const posHash = this.hashCode(this.table.get(index).key);
			if (posHash <= hash || posHash <= removedPosition) {
				this.table.set(removedPosition, this.table.get(index));
				this.table.delete(index);
				removedPosition = index;
			}
			index++;
		}
	}

	/**
	 * @description: 返回是否为空散列表
	 */
	isEmpty(): boolean {
		return this.size() === 0;
	}

	/**
	 * @description: 散列表的大小
	 */
	size(): number {
		return this.table.size;
	}

	/**
	 * @description: 清空散列表
	 */
	clear() {
		this.table.clear();
	}

	/**
	 * @description: 返回内部table
	 */
	getTable(): Map<number, { key: K; value: V }> {
		return this.table;
	}

	/**
	 * @description: 替代默认的toString
	 */
	toString(): string {
		if (this.isEmpty()) {
			return '';
		}

		let objStringList = [];
		for (const [hashCode, { key, value }] of this.table) {
			objStringList.push(`{${key} => ${value}}`);
		}
		return objStringList.join(',');
	}
}
