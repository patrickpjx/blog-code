/*
 * @lc app=leetcode.cn id=427 lang=typescript
 *
 * [427] 建立四叉树
 */

import { brotliDecompress } from 'zlib';

// @lc code=start
/**
 * Definition for node.
 * class Node {
 *     val: boolean
 *     isLeaf: boolean
 *     topLeft: Node | null
 *     topRight: Node | null
 *     bottomLeft: Node | null
 *     bottomRight: Node | null
 *     constructor(val?: boolean, isLeaf?: boolean, topLeft?: Node, topRight?: Node, bottomLeft?: Node, bottomRight?: Node) {
 *         this.val = (val===undefined ? false : val)
 *         this.isLeaf = (isLeaf===undefined ? false : isLeaf)
 *         this.topLeft = (topLeft===undefined ? null : topLeft)
 *         this.topRight = (topRight===undefined ? null : topRight)
 *         this.bottomLeft = (bottomLeft===undefined ? null : bottomLeft)
 *         this.bottomRight = (bottomRight===undefined ? null : bottomRight)
 *     }
 * }
 */

function construct(grid: number[][]): Node | null {
	const c = (grid, top, left, n) => {
		if (top === undefined) {
			top = 0;
			left = 0;
			n = grid.length;
		}
		const isLeaf = (top, left, n) => {
			const val = grid[top][left];
			for (let i = top; i < top + n; i++) {
				for (let j = left; j < left + n; j++) {
					if (grid[i][j] !== val) return false;
				}
			}
			return true;
		};
		let node = new Node(grid[top][left], true, null, null, null, null);
		node.isLeaf = isLeaf(top, left, n);
		if (!node.isLeaf) {
			node.topLeft = c(grid, top, left, n >> 1);
			node.topRight = c(grid, top, left + (n >> 1), n >> 1);
			node.bottomLeft = c(grid, top + (n >> 1), left, n >> 1);
			node.bottomRight = c(grid, top + (n >> 1), left + (n >> 1), n >> 1);
		}
		return node;
	};
	return c(grid, undefined, undefined, undefined);
}
// @lc code=end
// Companies
// 给你一个 n * n 矩阵 grid ，矩阵由若干 0 和 1 组成。请你用四叉树表示该矩阵 grid 。
// 你需要返回能表示矩阵的 四叉树 的根结点。

// 注意，当 isLeaf 为 False 时，你可以把 True 或者 False 赋值给节点，两种值都会被判题机制 接受 。
// 四叉树数据结构中，每个内部节点只有四个子节点。此外，每个节点都有两个属性：

// val：储存叶子结点所代表的区域的值。1 对应 True，0 对应 False；
// isLeaf: 当这个节点是一个叶子结点时为 True，如果它有 4 个子节点则为 False 。
// class Node {
//     public boolean val;
//     public boolean isLeaf;
//     public Node topLeft;
//     public Node topRight;
//     public Node bottomLeft;
//     public Node bottomRight;
// }
// 我们可以按以下步骤为二维区域构建四叉树：

// 如果当前网格的值相同（即，全为 0 或者全为 1），将 isLeaf 设为 True ，将 val 设为网格相应的值，并将四个子节点都设为 Null 然后停止。
// 如果当前网格的值不同，将 isLeaf 设为 False， 将 val 设为任意值，然后如下图所示，将当前网格划分为四个子网格。
// 使用适当的子网格递归每个子节点。

// 如果你想了解更多关于四叉树的内容，可以参考 wiki 。

// 四叉树格式：

// 输出为使用层序遍历后四叉树的序列化形式，其中 null 表示路径终止符，其下面不存在节点。

// 它与二叉树的序列化非常相似。唯一的区别是节点以列表形式表示 [isLeaf, val] 。

// 如果 isLeaf 或者 val 的值为 True ，则表示它在列表 [isLeaf, val] 中的值为 1 ；如果 isLeaf 或者 val 的值为 False ，则表示值为 0 。

// 示例 1：

// 输入：grid = [[0,1],[1,0]]
// 输出：[[0,1],[1,0],[1,1],[1,1],[1,0]]
// 解释：此示例的解释如下：
// 请注意，在下面四叉树的图示中，0 表示 false，1 表示 True 。

// 示例 2：

// 输入：grid = [[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0]]
// 输出：[[0,1],[1,1],[0,1],[1,1],[1,0],null,null,null,null,[1,0],[1,0],[1,1],[1,1]]
// 解释：网格中的所有值都不相同。我们将网格划分为四个子网格。
// topLeft，bottomLeft 和 bottomRight 均具有相同的值。
// topRight 具有不同的值，因此我们将其再分为 4 个子网格，这样每个子网格都具有相同的值。
// 解释如下图所示：

// 示例 3：

// 输入：grid = [[1,1],[1,1]]
// 输出：[[1,1]]
// 示例 4：

// 输入：grid = [[0]]
// 输出：[[1,0]]
// 示例 5：

// 输入：grid = [[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1]]
// 输出：[[0,1],[1,1],[1,0],[1,0],[1,1]]

// 提示：
// n == grid.length == grid[i].length
// n == 2^x 其中 0 <= x <= 6

// 思路主要是分两步：
// 判断是否是叶子节点
// 构造四个子节点
// 判断是否是叶子节点
// 通过top和left坐标，以及区域长度n，可以确定判断的区域范围
// 拿到左上角的值，然后遍历整个区域，只要有一个值与它不同，就返回0，即非叶子节点
// 否则返回 1， 即叶子节点

// const isLeaf = function (top, left, n) {
//     let a = grid[top][left];
//     for (let i = top; i < top + n; i++) {
//         for (let j = left; j < left + n; j++) {
//             if (a !== grid[i][j]) return 0;
//         }
//     }
//     return 1;
// };
// 构造四个子节点

// 为了方便进行递归，在默认的函数参数上加上了几个参数，系统调用的时候这几个参数值为 undefined，需要进行初始化。

// 接下来创建一个树节点，val 直接赋区域左上角的值， isLeaf 任意赋值，这里赋值为 1，初始化 4 个子节点为 null。

// 判断该区域是否是叶子节点，如果不是则 利用 top， left，n 进行新的区域划分，这里 n >> 1 等价于 Math.ceil(n / 2)。

// 最后返回创建好的节点，作为父级的子节点，或者是最终结果。

// var construct = function (grid, top, left, n) {
//     // console.log({top, left, n});
//     if (top == undefined) { // 第一次传进来
//         top = 0;
//         left = 0;
//         n = grid.length;
//     }

//     // ... isLeaf()

//     let node = new Node(grid[top][left], 1, null, null, null, null);

//     node.isLeaf = isLeaf(top, left, n);

//     if (!node.isLeaf) {
//         node.topLeft = construct(grid, top, left, n >> 1);
//         node.topRight = construct(grid, top, left + (n >> 1), n >> 1);
//         node.bottomLeft = construct(grid, top + (n >> 1), left, n >> 1);
//         node.bottomRight = construct(grid, top + (n >> 1), left + (n >> 1), n >> 1);
//     }

//     return node;
// };
// 完整代码
