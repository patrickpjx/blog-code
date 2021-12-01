// insert(key)：向树中插入一个新的节点。
// search(key)：在树中查找一个键。存在返回 true；不存在返回 false。
// inOrderTraverse()：中序遍历所有节点。
// preOrderTraverse()：先序遍历所有节点。
// postOrderTraverse()：后序遍历所有节点。
// min()：返回树中最小的键的节点。
// max()：返回树中最大的键的节点。
// remove(key)：从树中移除某个节点。


export enum Compare {
    LESS_THAN = -1,
    BIGGER_THAN = 1,
    EQUALS = 0,
}

export class Node<K>{
    public left: Node<K> = null;
    public right: Node<K> = null;

    constructor(public key: K) { }
    public toString() {
        return `${this.key}`
    }
}

export type ICompareFunction<T> = (a: T, b: T) => number;

/**
 * @description 默认大小比较函数
 * @param {T} a
 * @param {T} b
 * @return {Compare} 返回 -1 0 1 代表 小于 等于 大于
 */
export function defaultCompare<T>(a: T, b: T): Compare {
    if (a === b) {
        return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}


export default class BinarySearchTree<T>{
    protected root: Node<T>
    constructor(protected compareFn: ICompareFunction<T> = defaultCompare) { }

    /**
     * 
     * @description 返回根节点
     */
    public getRoot(): Node<T> {
        return this.root;
    }

    /**
     * @description 返回树中的最小元素
     */
    public min(): Node<T> {
        return this.minNode(this.root);
    }

    /**
     * @description 返回指定子树下的最小元素
     */
    protected minNode(node: Node<T>): Node<T> {
        let current = node;
        while (current !== null && current.left !== null) {
            current = current.left;
        }
        return current;
    }

    /**
     * @description 返回树的最大元素
     */
    public max(): Node<T> {
        return this.maxNode(this.root)
    }

    /**
     * @description 返回指定子树下的最大元素
     */
    protected maxNode(node: Node<T>): Node<T> {
        let current = node;
        while (current !== null && current.right !== null) {
            current = current.right;
        }
        return current
    }

    /**
     * 
     * @description 先序遍历
     */
    public preOrderTraverse(callback: Function) {
        this.preOrderTraverseNode(this.root, callback)
    }

    private preOrderTraverseNode(node: Node<T>, callback: Function) {
        if (node !== null) {
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }

    /**
     * 
     * @description 中序遍历
     */
    public inOrderTraverse(callback: Function) {
        this.inOrderTraverseNode(this.root, callback);
    }

    private inOrderTraverseNode(node: Node<T>, callback: Function) {
        if (node !== null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }

    /**
     * @description 后序遍历
     */
    public postOrderTraverse(callback: Function) {
        this.inOrderTraverseNode(this.root, callback);
    }

    private postOrderTraverseNode(node: Node<T>, callback: Function) {
        if (node !== null) {
            this.inOrderTraverseNode(node.left, callback);
            this.inOrderTraverseNode(node.right, callback);
            callback(node.key)
        }
    }


    public search(key: T): boolean {
        return this.searchNode(this.root, key)
    }

    private searchNode(node: Node<T>, key: T): boolean {

        if (node === null) {
            return false;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            this.searchNode(node.left, key);
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            this.searchNode(node.right, key);
        } else {
            return true
        }
    }


    public insert(key: T) {
        if (this.root === null) {
            this.root = new Node(key);
        } else {
            this.insertNode(this.root, key)
        }
    }

    protected insertNode(node: Node<T>, key: T) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left !== null) {
                node.left = new Node(key);
            } else {
                this.insertNode(node.left, key);
            }
        } else {
            if (node.right !== null) {
                node.right = new Node(key);
            } else {
                this.insertNode(node.right, key);
            }
        }
    }

    public remove(key: T) {
        this.root = this.removeNode(this.root, key);
    }

    protected removeNode(node: Node<T>, key: T): Node<T> {
        if (node == null) {
            return null;
        }

        if (this.compareFn(node.key, key) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key)
            return node;
        } else if (this.compareFn(node.key, key) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key);
            return node
        } else {
            if (node.left === null && node.right === null) {
                node = null
                return node;
            } else if (node.left === null) {
                node = node.right;
                return node
            } else if (node.right === null) {
                node = node.left;
                return node;
            } else {
                const minNode = this.minNode(node);
                node.key = minNode.key;
                node.right = this.removeNode(node.right, minNode.key);
                return node;
            }
        }
    }
}


