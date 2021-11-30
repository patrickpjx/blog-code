
// 所谓"柯里化"，就是把一个多参数的函数，拆解转化为单参数函数。
// curry的核心原理：闭包。不断引用一开始保存参数的列表。
// curry 的递归思想就是判断是否符合参数数量，不符合就继续 return curried。
const curry = fn => {
    const allArgs = [];
    const { length } = fn;
    const curried = function (...args) {
        allArgs.push(...args);
        if (allArgs.length < length) {
            return curried;
        }
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        return fn.apply(this, allArgs);
    }
    return curried;
}
module.exports = curry;