/*
 * @lc app=leetcode.cn id=94 lang=typescript
 *
 * [94] 二叉树的中序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

// function inorderTraversal(root: TreeNode | null): number[] {
//     if (root === null) return [];
//     const stack = [];
//     inorderTraversalHelper(root, (val) => stack.push(val));
//     return stack;
// };

// function inorderTraversalHelper(root: TreeNode | null, callback) {
//     if (root === null) return;
//     inorderTraversalHelper(root.left, callback);
//     callback(root.val);
//     inorderTraversalHelper(root.right, callback);
// }

function inorderTraversal(root: TreeNode | null): number[] {
    if (root === null) return [];
    const stack = [];
    const res = [];
    while (root || stack.length) {
        while (root) {
            stack.push(root)
            root = root.left;
        }
        root = stack.pop()
        res.push(root.val);
        root = root.right;
    }
    return res;
};
// @lc code=end

// 给定一个二叉树的根节点 root ，返回它的 中序 遍历。
// 示例 1：
// 输入：root = [1,null,2,3]
// 输出：[1,3,2]
// 示例 2：

// 输入：root = []
// 输出：[]

// 示例 3：
// 输入：root = [1]
// 输出：[1]
// 示例 4：


// 输入：root = [1,2]
// 输出：[2,1]
// 示例 5：


// 输入：root = [1,null,2]
// 输出：[1,2]
 

// 提示：

// 树中节点数目在范围 [0, 100] 内
// -100 <= Node.val <= 100