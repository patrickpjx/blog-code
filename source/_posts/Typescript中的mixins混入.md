---
title: Typescript中的mixins混入
date: 2020-09-09 14:58:44
tags:
---

##### mixins（typespcript中如何模拟实现多重继承）

1.对象混入(Object.assign)
``````
Object.assign(target,...source); 
``````

2.类的混入
``````
// Disposable Mixin
class Disposable {
  isDisposed: boolean;
  dispose() {
      this.isDisposed = true;
  }

}

// Activatable Mixin
class Activatable {
  isActive: boolean;
  activate() {
      this.isActive = true;
  }
  deactivate() {
      this.isActive = false;
  }
}

class SmartObject implements Disposable, Activatable {
  constructor() {
      setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
  }

  interact() {
      this.activate();
  }

  // Disposable
  isDisposed: boolean = false;
  dispose: () => void;
  // Activatable
  isActive: boolean = false;
  activate: () => void;
  deactivate: () => void;
}
mixins(SmartObject, [Disposable, Activatable])

var smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);

////////////////////////////////////////
// 在你代码的某处
////////////////////////////////////////


function mixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
          derivedCtor.prototype[name] = baseCtor.prototype[name];
      })
  }); 
}
``````