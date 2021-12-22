/*
 * @lc app=leetcode.cn id=144 lang=typescript
 *
 * [144] 二叉树的前序遍历
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
function preorderTraversal(root: TreeNode | null): number[] {
    if (root === null) return [];
    let stack = [];
    let res = [];
    while (root || stack.length) {
        while (root) {
            stack.push(root);
            res.push(root.val)
            root = root.left;
        }
        root = stack.pop();
        root = root.right;
    }
    return res;
};

// 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。

// 示例 1：
// 输入：root = [1,null,2,3]
// 输出：[1,2,3]
// 示例 2：

// 输入：root = []
// 输出：[]
// 示例 3：

// 输入：root = [1]
// 输出：[1]
// 示例 4：


// 输入：root = [1,2]
// 输出：[1,2]
// 示例 5：


// 输入：root = [1,null,2]
// 输出：[1,2]
 

// 提示：

// 树中节点数目在范围 [0, 100] 内
// -100 <= Node.val <= 100 
// 进阶：递归算法很简单，你可以通过迭代算法完成吗？

// @lc code=end

