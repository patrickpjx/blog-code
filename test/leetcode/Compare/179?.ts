/*
 * @lc app=leetcode.cn id=179 lang=typescript
 *
 * [179] 最大数
 */

// @lc code=start
function largestNumber(nums: number[]): string {
	let res = '';
	// const arr = nums.sort((x, y) => {
	//     return isBigger(x, y);
	// })
	// console.log(arr);
	// for (let i = 0; i < nums.length; i++){
	//     if (res.length === 0) {
	//         res = String(nums[i]);
	//     } else {
	//         const b = isBigger(res, nums[i])
	//         res = b;
	//     }
	// }
	return res;
}

// var largestNumber = function(nums) {
//     nums.sort((x, y) => {
//         let sx = 10, sy = 10;
//         while (sx <= x) {
//             sx *= 10;
//         }
//         while (sy <= y) {
//             sy *= 10;
//         }
//         return '' + (sx * y + x) - ('' + (sy * x + y));
//     })
//     if (nums[0] === 0) {
//         return '0';
//     }
//     return nums.join('');
// };

// [10,2,9,39,17]
// @lc code=end

// 给定一组非负整数 nums，重新排列每个数的顺序（每个数不可拆分）使之组成一个最大的整数。

// 注意：输出结果可能非常大，所以你需要返回一个字符串而不是整数。

// 示例 1：

// 输入：nums = [10,2]
// 输出："210"
// 示例 2：

// 输入：nums = [3,30,34,5,9]
// 输出："9534330"
// 示例 3：

// 输入：nums = [1]
// 输出："1"
// 示例 4：

// 输入：nums = [10]
// 输出："10"

// 关键点：对数组中的数字以字符串的形式进行组合排序，例如[x,y,z] (y+x).compareTo(x+y);根据要求看x在前还是y在前。这道题是y+x这样的形式，形成升序排序。通过两个数字的字符串进行组合排序，可以得到最大值。
