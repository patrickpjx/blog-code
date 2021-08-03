---
title: Code Linting
date: 2021-03-08 16:39:51
tags:
---

## ESlint+Prettier

代码检查+格式化、推荐配置：
https://github.com/AlloyTeam/eslint-config-alloy

## pre-commit: husky+lint-staged

https://github.com/yyx990803/yorkie

```
// first
node bin/install.js
```

```
  // package.json

  "gitHooks": {
      "pre-commit": "lint-staged"
  },

  "lint-staged": {
      "*.js": [
          "prettier --write"
      ],
      "*.ts": [
          "eslint",
          "prettier --parser=typescript --write"
      ],
      "*.html": [
          "prettier --write"
      ]
  }

```

## error in sourcetree

```
error: unknown option 'ignore-skip-worktree-entries'
```

![](https://raw.githubusercontent.com/patrickpjx/i/master/img%E6%88%AA%E5%B1%8F2021-03-08%20%E4%B8%8B%E5%8D%887.18.57.png)
can fix it:

-   https://stackoverflow.com/questions/51074821/git-hooks-doesnt-work-on-source-tree
-   upgade sourcetree

## commit-msg

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

```
# 主要type
feat:     增加新功能
fix:      修复bug

# 特殊type
docs:     只改动了文档相关的内容
style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
build:    构造工具的或者外部依赖的改动，例如webpack，npm
refactor: 代码重构时使用
revert:   执行git revert打印的message

# 暂不使用type
test:     添加测试或者修改现有测试
perf:     提高性能的改动
ci:       与CI（持续集成服务）有关的改动
chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动

```

> This is adapted from [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular).
