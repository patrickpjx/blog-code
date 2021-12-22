/*
 * @lc app=leetcode.cn id=590 lang=typescript
 *
 * [590] N 叉树的后序遍历
 */

// @lc code=start
/**
 * Definition for node.
 * class Node {
 *     val: number
 *     children: Node[]
 *     constructor(val?: number) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = []
 *     }
 * }
 */

 function postorder(root: Node | null): number[] {
    // let res = [];
    // let stack = [];
    // while (root || stack.length) {
    //     while (root) {
    //         stack.push(root);
    //         res.unshift(root.val);
    //         root = root.children.pop();
    //     }
    //     root = stack.pop();
    //     if (root.children && root.children.length) {
    //         stack.push(root);
    //     }
    //     root = root.children.pop();
    // }
    let res = [];
    backHelper(root, (n) => {res.push(n.val)})
    return res;
};

function backHelper(root,callback) {
    if (!root) return;
    for (let i = 0; i < root.children.length;i++){
        backHelper(root.children[i],callback); 
    }
    callback(root);
}
// @lc code=end

// 给定一个 N 叉树，返回其节点值的 后序遍历 。

// N 叉树 在输入中按层序遍历进行序列化表示，每组子节点由空值 null 分隔（请参见示例）。

 

// 进阶：
// 递归法很简单，你可以使用迭代法完成此题吗?

// 示例 1：
// 输入：root = [1,null,3,2,4,null,5,6]
// 输出：[5,6,3,2,4,1]
// 示例 2：
// 输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
// 输出：[2,6,14,11,7,3,12,8,4,13,9,10,5,1]