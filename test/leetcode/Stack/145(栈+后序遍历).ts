/*
 * @lc app=leetcode.cn id=145 lang=typescript
 *
 * [145] 二叉树的后序遍历
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

 function postorderTraversal(root: TreeNode | null): number[] {
    if (root === null) return [];
    let stack = [];
    let res = [];
     while (root || stack.length) {
        while (root) {
            stack.push(root);
            res.unshift(root.val)
            root = root.right;
        }
        root = stack.pop();
        root = root.left;
    }
    return res;
};

// @lc code=end

