/*
 * @lc app=leetcode.cn id=686 lang=typescript
 *
 * [686] 重复叠加字符串匹配
 */

// @lc code=start
function repeatedStringMatch(a: string, b: string): number {
    let repeatNum = 0;
    let result = false;

    const as = Array.from(new Set(a)).sort().toString();
    const bs = Array.from(new Set(b)).sort().toString();

    if (as !== bs && a.length <= b.length) {
        return -1;
    }

    let e = a;
    while(e.length <= b.length + a.length) {
        e += a;
    }


    if (e.replace(b, "") === e) {
        return - 1;
    }

    repeatNum = 0;
    while (!result) {
        let c = ''
        for (let i = 0; i < repeatNum;i++){
            c += a; 
        }
        const s = c.replace(b, '');
        if (s !== c) {
            result = true;
        } else {
            repeatNum++;
        }
    }
    return repeatNum;
};
// @lc code=end

// 给定两个字符串 a 和 b，寻找重复叠加字符串 a 的最小次数，使得字符串 b 成为叠加后的字符串 a 的子串，如果不存在则返回 -1。

// 注意：字符串 "abc" 重复叠加 0 次是 ""，重复叠加 1 次是 "abc"，重复叠加 2 次是 "abcabc"。

// 示例 1：

// 输入：a = "abcd", b = "cdabcdab"
// 输出：3
// 解释：a 重复叠加三遍后为 "abcdabcdabcd", 此时 b 是其子串。
// 示例 2：

// 输入：a = "a", b = "aa"
// 输出：2
// 示例 3：

// 输入：a = "a", b = "a"
// 输出：1
// 示例 4：

// 输入：a = "abc", b = "wxyz"
// 输出：-1
 

// 提示：

// 1 <= a.length <= 104
// 1 <= b.length <= 104
// a 和 b 由小写英文字母组成