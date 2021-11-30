function myNew(func, args) {
    const target = Object.create(func);
    const result = func.call(target, args);
    const isObjectOrFunction = typeof func === 'object' && func !== null || typeof func === 'function'
    return isObjectOrFunction ? result : target;
}

function myCreate(o) {
    const F = function () { };
    F.prototype = o;
    return F;
}

function createPreson() {
    let o = {
        name: 'p1',
        func: function () {
            console.log(this.name); // 对象方法和属性调用
        }
    };
    return o;
}

const p = createPreson();
p.func();

// console.log(Person.prototype.constructor);
// console.log(Person.__proto__.__proto__);
// console.log({}.__proto__ == Person.__proto__.__proto__);
// let Book = (function () {
//     let privateStaticAttribute = 0;
//     let privateStaticMethod = function () { };
//     return function (props) {
//         let title;
//         this.getTitle = function () {
//             return title;
//         }
//         this.setTitle = function (title) { }
//     };
// })()
// Book.staticMethod = function () { };
// Book.prototype.publicSharedMethod = function () { };

// 寄生式继承，原型式继承、完美继承（组合寄生式继承）
function Parent() {
    this.Paremt = 'parent';
    this.arr = [1, 2, 3];
}
Parent.prototype.walk = 'I can walk';

function Child() {
    Parent.call(this);
    this.Child = 'child';
}

// __proto__指向构造函数prototype
// yes -> returm key value no -> __proto__
// prototype
// Child.prototype = new Parent();
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

