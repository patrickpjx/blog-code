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

in Mac to get SSH_KEY:
pbcopy < ~/.ssh/id_rsa.pub
```

##
