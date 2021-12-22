// 给你一个长度为 n 的整数数组 score ，其中 score[i] 是第 i 位运动员在比赛中的得分。所有得分都 互不相同 。

// import isObject from "../../test-ts/isObject";

// 运动员将根据得分 决定名次 ，其中名次第 1 的运动员得分最高，名次第 2 的运动员得分第 2 高，依此类推。运动员的名次决定了他们的获奖情况：

// 名次第 1 的运动员获金牌 "Gold Medal" 。
// 名次第 2 的运动员获银牌 "Silver Medal" 。
// 名次第 3 的运动员获铜牌 "Bronze Medal" 。
// 从名次第 4 到第 n 的运动员，只能获得他们的名次编号（即，名次第 x 的运动员获得编号 "x"）。
// 使用长度为 n 的数组 answer 返回获奖，其中 answer[i] 是第 i 位运动员的获奖情况。


// 示例 1：

// 输入：score = [5,4,3,2,1]
// 输出：["Gold Medal","Silver Medal","Bronze Medal","4","5"]
// 解释：名次为 [1st, 2nd, 3rd, 4th, 5th] 。
// 示例 2：

// 输入：score = [10,3,8,9,4]
// 输出：["Gold Medal","5","Bronze Medal","Silver Medal","4"]
// 解释：名次为 [1st, 5th, 3rd, 2nd, 4th] 。
 

// 提示：

// n == score.length
// 1 <= n <= 104
// 0 <= score[i] <= 106
// score 中的所有值 互不相同

/*
 * @lc app=leetcode.cn id=506 lang=typescript
 *
 * [506] 相对名次
 */

// @lc code=start

function cloneDeep(obj) {
    const nMap = new Map();
    const clone = (obj) => {
        let cloneObj = null;
        if (typeof obj !== 'object') return obj;
        if (nMap.has(obj)) return nMap.get(obj); 
        const Constructor = obj.constructor;
        if (Constructor === Date) {
            cloneObj = new Date(obj.getTime())
        } else if (Constructor === RegExp) {
            cloneObj = new Date(obj)
        } else if (Constructor === Function) {
            cloneObj = eval(`${obj.toString()}`)
            Reflect.setPrototypeOf(cloneObj, Reflect.getPrototypeOf(obj));
        } else {
            cloneObj = new Constructor();
            for (const [key, value] of Object.entries(obj)) {
                cloneObj[key] = clone(value)
            }
        }
        nMap.set(obj,cloneObj);
        return cloneObj;
    }
    return clone(obj);
}


function findRelativeRanks(score: number[]): string[] {
    const arr = cloneDeep(score).sort((a,b)=>{return b-a})
    const res = [];
    for (const i of score){
        for (let j = 0; j < arr.length; j++){
            if (arr[j] === i) {
                let str = String(j + 1);
                switch (j) {
                    case 0:
                        str = 'Gold Medal';
                        break;
                    case 1:
                        str = 'Silver Medal';
                    break;
                    case 2:
                        str = 'Bronze Medal';
                        break;
                    default:
                        break;
                }
                res.push(str)
            }
        }
    }
    return res;
};
// @lc code=end



