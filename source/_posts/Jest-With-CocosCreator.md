---
title: Jtest-With-CocosCreator
date: 2021-06-30 14:43:24
tags:
---

## JEST

````
Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!
````

## ATDD、TDD 、 BDD

````
TDD（测试驱动开发）: TDD是在编写代码之前就先把测试代码写好，以满足测试用例来进行开发，进而循序渐进的完成功能的添加。最早出现在Kent Beck 的《测试驱动开发》一书，是XP的一部分，现在已经被广泛应用了。TDD避免了传统开发冗长的开发战线和模糊多变的需求，可以使程序员快速理解功能实现，代价更小的完成工作，测试驱动开发，其实是单元测试驱动开发，即开发要遵守单元测试，让单元测试能够完整的跑通，TDD有一些争论，有严格的TDD，也有松散的TDD，根据自己的实践采取合适的即可。
````
````
BDD (行为驱动开发) :行为驱动开发是一种敏捷软件开发的技术，它鼓励软件项目中的开发者、QA 和非技术人员或商业参与者之间的协作,与一般的自动化测试（如单元测试、服务测试、UI 测试）不一样的是，BDD 是由多方参与的测试开发方式。如在使用 Protractor 写 Angular 的 E2E 测试的时候，所以的测试都是前端测试人员编写的。BDD 最重要的一个特性是：由非开发人员编写测试用例，而这些测试用例是使用自然语言编写的 DSL（领域特定语言.

````

## 单元测试

````
jestTest.ts

export function sum(a: number, b: number) {
    return a+b;
}

````

````
import { sum } from "../script/utils/jestTest";

test('sum', () => {
    expect(sum(1, 2)).toBe(3);
});

````

## UI测试

````
jest.config.js

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverageFrom: ['<rootDir>/assets/**/*.ts'],
    setupFiles: [
        'jest-canvas-mock', // npm 套件只需要名稱
        '<rootDir>/test/utils/cocos2d-js-for-preview.js',
    ],
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
        'cocos2d-js-for-preview.js',
    ],
};

````


````
btnHandler.ts

const {ccclass, property} = cc._decorator;

@ccclass
export default class BtnHandler extends cc.Component {

    @property(cc.Label)
    ccLabel: cc.Label = null;

    @property
    text: string = 'click';

    onClick(event, data) {
        cc.log(event, data);
        if (this.ccLabel) {
            this.ccLabel.string = typeof data === 'string' ? data : this.text;
        }
    }
}

````

````
btnHandler.test.ts

import btnHandler from '../../assets/btnHandler';

cc.js.setClassName('btnHandler', btnHandler);

const node = new cc.Node();
const ccBtn = node.addComponent(cc.Button);
const ccLabel = node.addComponent(cc.Label);
const buttonComponent = node.addComponent(btnHandler);
buttonComponent.ccLabel = ccLabel;

const eventHandler = new cc.Component.EventHandler();
eventHandler.target = node;
eventHandler.component = 'btnHandler';
eventHandler.handler = 'onClick';

ccBtn.clickEvents.push(eventHandler);
test('check label text', () => {
    ccBtn.clickEvents[0].emit([new cc.Event.EventTouch([], true), 'hello jest']);
    expect(ccLabel.string).toBe('hello jest');
});

````

## Other Resources
https://www.zhihu.com/question/57415062
https://www.zhihu.com/search?type=content&q=BDD