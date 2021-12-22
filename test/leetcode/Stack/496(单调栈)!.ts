/*
 * @lc app=leetcode.cn id=496 lang=typescript
 *
 * [496] 下一个更大元素 I
 */

// @lc code=start
// function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
//     let ans = [];
//     for (const i of nums1) {
//         let n = -1;
//         for (let j = nums2.length; j >0; j--) {
//             if (nums2[j-1] > i) {
//                 n = nums2[j-1];
//             }
//             if (nums2[j-1] === i) {
//                 ans.push(n);     
//                 n = -1;
//             }
//         }
//     }
//     return ans;
// };


// 讲道理顺序比逆序好理解吧
// 顺序：保证栈底为最大
// 逆序：右侧依次入栈
function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
    const nMap = new Map();
    let stack = [];
    for (let i = 0; i < nums2.length; i++){
        const num = nums2[i];
        while (stack.length && num >= stack[stack.length -1]) {
            nMap.set(stack.pop(), num);
        }
        stack.push(num);
    }
    const res = new Array(nums1.length).fill(0).map((_, i) => nMap.get(nums1[i]) ? nMap.get(nums1[i]) :'-1');
    return res;
};

// nums2.length - 1

// var nextGreaterElement = function(nums1, nums2) {
//     const map = new Map();
//     const stack = [];
//     for (let i = nums2.length - 1; i >= 0; --i) {
//         const num = nums2[i];
//         while (stack.length && num >= stack[stack.length - 1]) {
//             stack.pop();
//         }
//         map.set(num, stack.length ? stack[stack.length - 1] : -1);
//         stack.push(num);
//     }
//     const res = new Array(nums1.length).fill(0).map((_, i) => map.get(nums1[i]));
//     return res;
// };

// @lc code=end

// [1,3,5,4,2]

// nums1 中数字 x 的 下一个更大元素 是指 x 在 nums2 中对应位置 右侧 的 第一个 比 x 大的元素。
// 给你两个 没有重复元素 的数组 nums1 和 nums2 ，下标从 0 开始计数，其中nums1 是 nums2 的子集。

// 对于每个 0 <= i < nums1.length ，找出满足 nums1[i] == nums2[j] 的下标 j ，并且在 nums2 确定 nums2[j] 的 下一个更大元素 。如果不存在下一个更大元素，那么本次查询的答案是 -1 。

// 返回一个长度为 nums1.length 的数组 ans 作为答案，满足 ans[i] 是如上所述的 下一个更大元素 。

// 示例 1：

// 输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
// 输出：[-1,3,-1]
// 解释：nums1 中每个值的下一个更大元素如下所述：
// - 4 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
// - 1 ，用加粗斜体标识，nums2 = [1,3,4,2]。下一个更大元素是 3 。
// - 2 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
// 示例 2：

// 输入：nums1 = [2,4], nums2 = [1,2,3,4].
// 输出：[3,-1]
// 解释：nums1 中每个值的下一个更大元素如下所述：
// - 2 ，用加粗斜体标识，nums2 = [1,2,3,4]。下一个更大元素是 3 。
// - 4 ，用加粗斜体标识，nums2 = [1,2,3,4]。不存在下一个更大元素，所以答案是 -1 。
 

// 提示：

// 1 <= nums1.length <= nums2.length <= 1000
// 0 <= nums1[i], nums2[i] <= 104
// nums1和nums2中所有整数 互不相同
// nums1 中的所有整数同样出现在 nums2 中
 

// 进阶：你可以设计一个时间复杂度为 O(nums1.length + nums2.length) 的解决方案吗？