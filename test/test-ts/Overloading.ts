/**
 * 函数重载
 * @param object
 * @param name
 * @param func
 */
function addMethod(object, name, func) {
    const old = object[name];
    object[name] = function () {
        if (arguments.length === func.length) {
            return func.apply(this, arguments);
        } else if (typeof old === 'function') {
            return old.apply(this, arguments);
        }
    }
}