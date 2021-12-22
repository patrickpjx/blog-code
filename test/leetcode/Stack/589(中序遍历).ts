/*
 * @lc app=leetcode.cn id=589 lang=typescript
 *
 * [589] N 叉树的前序遍历
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

// export class Node {
//     val: number
//     children: Node[]
//     constructor(val?: number) {
//         this.val = (val===undefined ? 0 : val)
//         this.children = []
//     }
// }

function preorder(root: Node | null): number[] {
    // let res = [];
    // let stack = [];
    // while (root || stack.length) {
    //     while (root) {
    //         stack.push(root);
    //         res.push(root.val);
    //         root = root.children.shift();
    //     }
    //     root = stack.pop();
    //     if (root.children  && root.children.length > 0) {
    //         stack.push(root);
    //     }
    //     root = root.children.shift();
    // }
    // return res;

    let res = [];
    beforeHelper(root,(n)=>{res.push(n.val)})
    return res;
};



function beforeHelper(root,callback) {
    if (!root) return;
    callback(root);
    for (const i of root.children){
        beforeHelper(i, callback);
    }
}
// @lc code=end

// 给定一个 N 叉树，返回其节点值的 前序遍历 。
// N 叉树 在输入中按层序遍历进行序列化表示，每组子节点由空值 null 分隔（请参见示例）。

// 进阶：

// 递归法很简单，你可以使用迭代法完成此题吗?


// 示例 1：
// 输入：root = [1,null,3,2,4,null,5,6]
// 输出：[1,3,5,6,2,4]
// 示例 2：


// 输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
// 输出：[1,2,3,6,7,11,14,4,8,12,5,9,13,10]
 

// 提示：
// N 叉树的高度小于或等于 1000
// 节点总数在范围 [0, 10^4] 内