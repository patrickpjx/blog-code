---
title: Typescript高级类型
date: 2020-06-16 15:15:12
tags:
categories: pieces
---

#### Intersection Types

涉及混入概念

`````
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
      (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
      if (!result.hasOwnProperty(id)) {
          (<any>result)[id] = (<any>second)[id];
      }
  }
  return result;
}

class Person {
  constructor(public name: string) { }
}
interface Loggable {
  log(): void;
}
class ConsoleLogger implements Loggable {
  log() {
      // ...
  }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();

`````

#### Union Types

`````
interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors

`````

#### User-Defined Type Guards
1.类型谓词（Using type predicates）
`````
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

`````

Any time isFish is called with some variable, TypeScript will narrow that variable to that specific type if the original type is compatible.
Notice that TypeScript not only knows that pet is a Fish in the if branch; it also knows that in the else branch, you don’t have a Fish, so you must have a Bird.

`````
// Both calls to 'swim' and 'fly' are now okay.
let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
`````

2.使用in操作符（Using the in operator）
`````
function move(pet: Fish | Bird) {
  if ("swim" in pet) {
    return pet.swim();
  }
  return pet.fly();
}
`````

3.typeof,instanceof

4.Nullable types（使用 --strictNullChecks）？，！，？？，标识符

1.?? 和 || 区别 （?? 0，NaN以及""被视为false值）

2.！
`````
interface UserAccount {
  id: number;
  email?: string;
}

const user = getUser("admin");
user.id;
Object is possibly 'undefined'.

if (user) {
  user.email.length;
Object is possibly 'undefined'.
}

// Instead if you are sure that these objects or fields exist, the
// postfix ! lets you short circuit the nullability
user!.email!.length;
`````

#### Type Aliases vs Interface

you cannot use implements on an class with type alias if you use union operator within your type definition
you cannot use extends on an interface with type alias if you use union operator within your type definition（union 不能 extends 和 implements）
declaration merging doesn’t work with type alias（声明合并）

尽可能用interface
On the other hand, if you can’t express some shape with an interface and you need to use a union or tuple type, type aliases are usually the way to go.

#### Polymorphic this types
返回this类型，可以达到链式操作效果

#### Index types
索引类型

#### Mapped types
映射类型