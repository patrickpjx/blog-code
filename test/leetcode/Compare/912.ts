/*
 * @lc app=leetcode.cn id=912 lang=typescript
 *
 * [912] 排序数组
 */

// 龟速三兄弟
// @lc code=start
// function sortArray(nums: number[]): number[] {
//     let isOver = true;
//     for (let i = 0; i < nums.length;i++){
//         for (let j = 0; j < nums.length;j++){
//             if (nums[j] > nums[j+1]) {
//                 let temp = nums[j];
//                 nums[j] = nums[j + 1];
//                 nums[j + 1] = temp;
//                 isOver = false;
//             }
//         }
//         if (isOver) {
//             return nums;
//         }
//     }
//     return nums;
// };

// 选择排序
// function sortArray(nums: number[]): number[] {
//     for (let i = 0; i < nums.length; i++){
//         for (let j = i + 1; j < nums.length;j++){
//             if (nums[i] > nums[j]) {
//                 let temp = nums[i];
//                 nums[i] = nums[j];
//                 nums[j] = temp;
//             }
//         }
//     }
//     return nums;
// };

// 插入排序
// function sortArray(nums: number[]): number[] {
//     for (let i = 0; i < nums.length; i++){
//         if (nums[i] < nums[i - 1]) {
//             let temp = nums[i];
//             let j = i;
//             while (j > 0 && temp < nums[j-1]) {
//                 nums[j] = nums[j - 1];
//                 j--;
//             }
//             nums[j] = temp;
//         }
//     }
//     return nums;
// };

// 归并排序
function sortArray(nums: number[]): number[] {
	if (nums.length < 2) return nums;
	const merge = (left, right) => {
		let result = [];
		while (left.length > 0 && right.length > 0) {
			if (left[0] < right[0]) {
				result.push(left.shift());
			} else {
				result.push(right.shift());
			}
		}
		return result.concat(left, right);
	};
	const middle = Math.floor(nums.length / 2);
	const left = nums.slice(0, middle);
	const right = nums.slice(middle);
	return merge(sortArray(left), sortArray(right));
}
// const arr = [12, 2 , 13, 23, 4, 45]
// sortArray(arr) // [2, 4, 12, 13, 23, 45]
// @lc code=end

// 给你一个整数数组 nums，请你将该数组升序排列。

// 示例 1：
// 输入：nums = [5,2,3,1]
// 输出：[1,2,3,5]
// 示例 2：
// 输入：nums = [5,1,1,2,0,0]
// 输出：[0,0,1,1,2,5]

// 提示：
// 1 <= nums.length <= 5 * 104
// -5 * 104 <= nums[i] <= 5 * 104
