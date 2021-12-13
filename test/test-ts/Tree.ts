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
                const minNode = this.minNode(node.right);
                node.key = minNode.key;
                node.right = this.removeNode(node.right, minNode.key);
                return node;
            }
        }
    }
}


enum BalanceFactor{
    UNBALANCED_RIGHT = -2, //右重
    SLIGHTY_UNBALANCED_RIGHT = -1, //轻微右重
    BALANCED = 0, //平衡
    SLIGHTY_UNBALANCED_LEFT = 1, //轻微右重
    UNBALANCED_LEFT = 2, //左重
}

// 节点高度：从节点到其任意子节点的边的最大数目
// 平衡因子节：点的左子树与右子树的高度差即为该节点的平衡因子
// 当一棵二叉搜索树为平衡二叉树时，树上所有节点的平衡因子只可能是-1（轻微右重），0（平衡） 或 1（轻微左重）
// 旋转 LL RR LR RL 四种情况

export class AVLTree<T> extends BinarySearchTree<T>{
    constructor(protected compareFn:ICompareFunction<T> = defaultCompare) {
        super(compareFn);
    }

    /**
     * 获取节点高度
     */
    private getNodeHeight(node: Node<T>) {
        if (node === null) {
            return -1;
        }
        return (Math.max(this.getNodeHeight(node.left),this.getNodeHeight(node.right)) + 1);
    }

    /**
     * 
     * @description 获取节点的平衡因子
     * @param {Node} node
     */
    private getBalanceFactor(node: Node<T>): BalanceFactor{
        const hegihtDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch (hegihtDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.SLIGHTY_UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
            
        }
    }

    /**
     * @param root Node<T> 旋转前的root节点
     * @returns pivot Node<T> 返回旋转后的root节点(也就是旋转前的pivot)
     */
    private rotationLL(root:Node<T>): Node<T> {
        const pivot = root.left;
        root.left = pivot.right;
        pivot.right = root;
        return pivot;
    }

    private rotationRR(root:Node<T>):Node<T> {
        const pivot = root.right;
        pivot.right = root.left;
        pivot.left = root;
        return pivot;
    }

    private rotationLR(node: Node<T>): Node<T>{
        node.left = this.rotationRR(node);
        return this.rotationLL(node);
    }

    private rotationRL(node: Node<T>): Node<T>{
        node.right = this.rotationLL(node);
        return this.rotationRR(node)
    }

    /**
     * @description 对节点为根的树进行两层平衡
     * @param {Node} Node
     * @return {Node} 返回平衡后的以节点为根的树
     */
    keepBalance(node: Node<T>): Node<T>{
        if (node == null) {
            return node;
        }
        const balanceState = this.getBalanceFactor(node);

        if (balanceState === BalanceFactor.UNBALANCED_LEFT) {
            if (this.getBalanceFactor(node.left) === BalanceFactor.UNBALANCED_LEFT || this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTY_UNBALANCED_LEFT) {
                return this.rotationLL(node);
            } else if(this.getBalanceFactor(node.left) === BalanceFactor.UNBALANCED_RIGHT || this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTY_UNBALANCED_RIGHT){
                return this.rotationLR(node);
            }
        } else if (balanceState === BalanceFactor.UNBALANCED_RIGHT) {
            // 左右情况
            if (this.getBalanceFactor(node.right) === BalanceFactor.BALANCED || this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTY_UNBALANCED_RIGHT) {
                return this.rotationRR(node);
            } else if (this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTY_UNBALANCED_LEFT) {
                return this.rotationRL(node);
            }
        }
        return node;
    }


    /**
     * @description: 插入节点的递归方法，递归插入完后，需要校验树是否仍然平衡，若不平衡则需要旋转
     * @param {Node} node 要插入到的节点
     * @param {T} key 要插入的键
     * @return {Node} 为了配合 insert 方法，一定要返回节点
     */
    protected insertNode(node: Node<T>, key: T): Node<T>{
        if (node == null) {
            return new Node(key);
        }
        if (this.compareFn(key,node.key) === Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key);
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key);
        } else {
            return node;
        }
        return this.keepBalance(node);
    }


    /**
     * @description:  删除节点的递归方法，递归完成后也需要再平衡
     * @param {Node} node 要从中删除的节点
     * @param {T} key 要删除的键
     * @return {Node} 同样为了配合remove方法，一定要返回节点
     */
     protected removeNode(node: Node<T>, key: T): Node<T> {
        // 与二叉搜索树的删除方式一致
        if (node == null) {
          return null;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
          node.left = this.removeNode(node.left, key);
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
          node.right = this.removeNode(node.right, key);
        } else {
          if (node.left == null && node.right == null) {
            node = null;
          } else if (node.left == null && node.right != null) {
            node = node.right;
          } else if (node.left != null && node.right == null) {
            node = node.left;
          } else {
            const aux = this.minNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right, aux.key);
          }
        }
        // 校验树是否平衡
        return this.keepBalance(node);
      }
}



// 节点 红黑色
// 1.根节点黑色 2.叶子结点为nil黑子不存储数据
// 3.相邻不能同时为红色
// 4.每个节点到达可达到子节点的路径都有相同数量的黑色节点
export enum Colors{
    RED = 0,
    BLACK = 1
}

export class RedBlackNode<K> extends Node<K>{
    left: RedBlackNode<K>;
    right: RedBlackNode<K>;
    // 红黑树节点有color特殊属性
    color: Colors;

    constructor(public key:K) {
        super(key);
        this.color = Colors.RED;
    }

    /**
     * @description: 返回节点是否为红色
     */
    isRed(): boolean {
        return this.color === Colors.RED;
    }

    /**
     * @description: 位运算反转节点的颜色
     */
    flipColor() {
        this.color = 1 ^ this.color;
    }
}


export class RedBlackTree<T> extends BinarySearchTree<T>{
    protected root: RedBlackNode<T>;
    constructor(protected compareFn:ICompareFunction<T> = defaultCompare) {
        super(compareFn);
    }

    private rotateRight(node: RedBlackNode<T>): RedBlackNode<T>{
        const pivot = node.left;
        node.left = pivot.right;
        pivot.right = node;
        // 区别avl
        pivot.color = node.color;
        node.color = Colors.RED;
        return pivot;
    }

    private rotateLeft(node: RedBlackNode<T>): RedBlackNode<T>{
        const pivot = node.right;
        node.right = pivot.left;
        pivot.left = node;
        pivot.color = node.color;
        node.color = Colors.RED;
        return pivot;
    }

    /**
     * @description: 插入键
     */
    insert(key:T) {
        this.root = this.insertNode(this.root, key);
        this.root.color = Colors.BLACK;
    }

    /**
     * @description: 插入键的递归方法
     */
    protected insertNode(node: RedBlackNode<T>, key: T): RedBlackNode<T>{
        if (node == null) {
            let node = new RedBlackNode(key);
            node.color = Colors.RED;
            return node;
        }
        if (this.compareFn(key,node.key) === Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key);
        } else if (this.compareFn(key,node.key) === Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key);
        } else {
            node.key = key;
        }
        return this.balance(node);
    }


    /**
     * 
     * @description: 判断节点是否为红色
     */
    private isRed(node:RedBlackNode<T>) {
        if (!node) {
            return false;
        }
        return node.isRed();
    }

    /**
     * 
     * @description: 修正节点颜色 
     */
    private flipColors(node:RedBlackNode<T>) {
        node.flipColor();
        node.left.flipColor();
        node.right.flipColor();
    }


    // 关注节点（新插节点）
    // 叔叔节点、祖父节点
    private balance(node: RedBlackNode<T>): RedBlackNode<T> {
        if (this.isRed(node.right) && !this.isRed(node.left)) {
            node = this.rotateLeft(node);
        }
        if (this.isRed(node.left) && this.isRed(node.left?.left)) {
            node = this.rotateRight(node);
        }
        if (this.isRed(node.left) && this.isRed(node.right)) {
            this.flipColors(node)
        }
        return node;
    }
}



//              black
//          hong    hong
//     hong


