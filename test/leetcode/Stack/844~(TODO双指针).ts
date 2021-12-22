/*
 * @lc app=leetcode.cn id=844 lang=typescript
 *
 * [844] 比较含退格的字符串
 */

// @lc code=start
function backspaceCompare(s: string, t: string): boolean {
    const handle = (x:string) => {
        let stack = [];
        for (const i of x) {
            if (i === '#') {
                if (stack.length) {
                    stack.pop()
                }
            } else {
                stack.push(i);
            }
        }
        return stack;
    }
    let s1 = handle(s).join('');
    let t2 = handle(t).join('');
    return s1 === t2;
};

// TODO 双指针
// @lc code=end

// 给定 s 和 t 两个字符串，当它们分别被输入到空白的文本编辑器后，请你判断二者是否相等。# 代表退格字符。

// 如果相等，返回 true ；否则，返回 false 。

// 注意：如果对空文本输入退格字符，文本继续为空。

// backspaceCompare("a#c", "b") 

// 示例 1：

// 输入：s = "ab#c", t = "ad#c"
// 输出：true
// 解释：S 和 T 都会变成 “ac”。
// 示例 2：

// 输入：s = "ab##", t = "c#d#"
// 输出：true
// 解释：s 和 t 都会变成 “”。
// 示例 3：

// 输入：s = "a##c", t = "#a#c"
// 输出：true
// 解释：s 和 t 都会变成 “c”。
// 示例 4：

// 输入：s = "a#c", t = "b"
// 输出：false
// 解释：s 会变成 “c”，但 t 仍然是 “b”。
 

// 提示：

// 1 <= s.length, t.length <= 200
// s 和 t 只含有小写字母以及字符 '#'
 

// 进阶：

// 你可以用 O(N) 的时间复杂度和 O(1) 的空间复杂度解决该问题吗？