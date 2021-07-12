---
title: Github Actions
date: 2021-03-11 12:22:35
tags:
---

## what is SSH

Secure Shell（安全外壳协议，简称 SSH）是一种加密的网络传输协议，可在不安全的网络中为网络服务提供安全的传输环境。（两种方式）

```
ssh-keygen [-q] [-b bits] [-t type] [-N new_passphrase] [-C comment] [-f output_keyfile]
	-q：安静模式，不显示额外的生成信息
	-b：指定秘钥长度，RSA密钥最小768位，默认2048位。DSA密钥必须是1024位(FIPS 186-2标准的要求)
	-t：指定密钥类型。可用的值：dsa|ecdsa|ed25519|rsa, 默认rsa。
	-N：指定生成秘钥公钥对的密码，不指定会在生成过程中要求输入。
	-C：指定秘钥公钥对的说明信息
	-f：指定生成密钥的目录和文件名，不指定会在生成过程中要求输入。
```

in Mac to get SSH_KEY:

```
pbcopy < ~/.ssh/id_rsa
```

## GitHub add secrets and Deploy keys

```
Settings -> add Scerets -> add Deploy keys
```

## Miniprogram + Github Actions

```
name: dev_upload

on:
    push:
        branches:
            - develop
jobs:
    build:
    	runs-on: ubuntu-latest

        strategy:
        	matrix:
                node-version: [10.x]

        steps:
        	- uses: actions/checkout@v2
            - name: Use Node.js ${{ matrix.node-version }}
              uses: actions/setup-node@v1
              with:
                  node-version: ${{ matrix.node-version }}

            - name: install Dependencies
              run: npm i

            - name: build weapp
              run: npm run build:mp-weixin

            # see Project/Settings/Secrets
            - name: generate pkp
              run: echo "$UPLOAD_PRIVATE_KEY" > private.key
              env:
                  UPLOAD_PRIVATE_KEY: ${{ secrets.UPLOAD_PRIVATE_KEY }}

            - name: upload
              run: npx mp-ci upload ./dist/build/mp-weixin --pkp=./private.key

```

## Hexo + Coding Page + Github

```
name: Hexo Deploy
on:
	push:
        branches:
            - develop
jobs:
    build:
	runs-on: ubuntu-latest

	if: github.event.repository.owner.id == github.event.sender.id

	steps:
		- name: Checkout source
		uses: actions/checkout@v2
		with:
			ref: develop

		- name: Setup Node.js
		uses: actions/setup-node@v1
		with:
			node-version: '12'

		- name: Setup Hexo
		env:
			ACTION_DEPLOY_KEY: ${{ secrets.HEXO_DEPLOY_KEY }}
		run: |
			mkdir -p ~/.ssh/
			echo "$ACTION_DEPLOY_KEY" > ~/.ssh/id_rsa
			chmod 700 ~/.ssh
			chmod 600 ~/.ssh/id_rsa
			ssh-keyscan e.coding.net >> ~/.ssh/known_hosts
			git config --global user.email "416361073@qq.com"
			git config --global user.name "patrick"
			npm install hexo-cli -g
			npm install

		- name: Deploy

		run: |
			hexo clean
			hexo generate
			hexo deploy
```

## but，速度好慢
