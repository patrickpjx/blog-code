---
title: SOLID
date: 2020-10-12 14:52:21
tags:
---


#### SRP (single respornsibilitiy principle)

单一指责，一个类负责一件事

#### OCP（open close principle）

对扩展开放，对修改关闭，保证程序的扩展性，易于维护和升级

#### LSP (liskov substitution principle)

派生类（子类）对象可以在程序中代替其基类（超类）对象
[相关讨论](https://www.zhihu.com/question/27191817/answer/145013324) 1.抽象类，接口不能实例化，程序中子类运行就是对接口，抽象类替换的一种表现 2.保证继承关系，应遵循父定义定义规则

```
当子类覆盖或实现父类的方法时，方法的前置条件（即方法的形参）要比父类方法的输入参数更宽松。
当子类的方法实现父类的抽象方法时，方法的后置条件（即方法的返回值）要比父类更严格。
```

#### DIP (dependence inversion principle)

高层模块不应该依赖低层模块，两者都应该依赖其抽象；抽象不应该依赖细节，细节应该依赖抽象
目的松耦合，依赖共同抽象类，接口，（类似一个中间制定协议），由原来高层依赖底层，转化成同时对抽象类的依赖

#### ISP (interface segregation principle)

是指客户不应该依赖它们用不到的方法，只给每个客户它所需要的接口
设计接口尽量精简单一，避免肥胖的接口和接口污染
(接口不能太小，如果太小会导致系统中接口泛滥，不利于维护；接口也不能太大，太大的接口将违背接口隔离原则，灵活性较差，使用起来很不方便)

#### LOD (law of demeter，Least Knowledge Principle)

talk only to your immediate friends；
有些东西，可以适当的知道，知道的太多对你不好。
目的是类间解耦，松耦合

#### CARP (Composite Reuse Principle)

开发中设计抽象类，定义接口往往花费成本是巨大的，一些场景为了提高复用，只是引用类的方法往往得到更好的效果。
组合或者比继承更好
