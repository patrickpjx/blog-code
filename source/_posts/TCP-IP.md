---
title: TCP/IP
date: 2021-07-06 23:25:02
tags:
---

## osi 七层参考模型

应用层、表示层、会话层、传输层、网络层、数据链路层、物理层

## TCP/UDP

TCP: 传输控制协议，面向连接。是一种提供可靠数据传输的通用协议。

UDP: 用户数据报协议，是一个面向无连接的协议。采用该协议不需要两个应用程序先建立连接。UDP 协议不提供差错恢复，不能提供数据重传，因此该协议传输数据安全性差。

## 三次握手

syn ->
<- syn/ack
syn/ack ->

SYN_SENT、SYN_RECV、ESTABLISHED

（两次握手不能要开辟资源）

## 四次挥手

fin ->
<- fin/ack
<- fin
ack ->

（三次挥手不能结束报文处理释放资源）

## scoket 套接字（调用 tcp 的接口）

源端口号和目的端口号。

TCP 用主机的 IP 地址加上主机上的端口号作为 TCP 连接的端点，这种端点就叫做套接字（socket）或插口。套接字用（IP 地址：端口号）表示，区分不同应用程序进程间的网络通信和连接,主要有 3 个参数：通信的目的 IP 地址、使用的传输层协议(TCP 或 UDP)和使用的端口号。

scoket 隔离
ip address + tcp/ip + ip port
192.x.x.x : 8888

## 网络链路层、物理层

网关、子网掩码、arp 协议（跳转发，广播）

## http1.0/http2.0/http3.0

1.0:队头阻塞、无多路复用
1.1:长链接、keeplive、pipelining（还是按请求顺序响应返回）、缓存处理（强缓存、协商缓存、启发式缓存）
2.0:二进制分帧（有流控）、encoder 压缩头部
3.0:quic 协议基于 udp

发生丢包时有可能 2.0 比 1.1 还慢（多路复用，丢包重传影响整个一条 tcp 链接）
1.x 无状态协议
2.0 其实是有状态的（）

区分后端服务状态和协议本身状态

## http 缓存策略

强缓存:chace-control(提供多字段，如 private、no-store、max-age) >> Expire（单纯 c/s 时间比对，1.0 的产物向下兼容）
协商缓存:last-modified（单纯服务器时间比对，但无法精准（秒内多次修改），etag（解决修改时间替换，文件没修改情况、Etag 的生成过程需要服务器额外付出开销，会影响服务端的性能，这是它的弊端）

```
etag: '5c20abbd-e2e8'
last-modified: Mon, 24 Dec 2018 09:49:49 GMT
-->
if-none-matched: '5c20abbd-e2e8'
if-modified-since: Mon, 24 Dec 2018 09:49:49 GMT
```

-- 缓存穿透、缓存雪崩（没资源，或者请求数据大量到期）

## ssh、ssl/tsl、https

非对称加密/对称传: 一把钥匙一把锁、用来传输私钥、然后双方实现对称传输
ssh:fingerprint 处理中间人攻击 、shell 设计的一种通信协议
ssl/tsl 传输层安全协议（区别 ssh：可是 SSL 是为了整个互联网上的所有客户端与服务器之间通信而设计的，他们彼此之间不可能自己判断通信的对方是否可信。那么如何解决这个问题呢？）
CA 证书（保证中间人攻击: 公钥由中间人生成）
对称传输

## 为什么 websoket 使用 http 进行握手

websocket 是协议、可类比 socket、但不是同一样东西
所以说 WebSocket 并不是一个什么神奇的东西，它就是一个套接字。同时，WebSocket 得借助于现有的网络基础，如果它再从头搞一套建立连接的标准代价就会很大。
在它之前能够和服务连接的就只有 http 请求，所以它得借助于 http 请求来建立一个原生的 socket 连接，因此才有了协议转换的那些东西。

## keep-alive、tcp 和 http 区别

http: 保留 tcp 链接一段时间（1.1），复用 tcp 链接
tcp:这个 keepalive 是一种检测 TCP 链接状况的保险措施，它会每隔一定的时间就去 client 发送个数据，通过 client 端的反应来采取相应的措施,保活措施


## Cookie Session/Session Storage Token LocalStorage

cookie 提供服务器存储数据如（session）的手段，容量较小

session 保存状态，查的时候消耗性能，不利于分布式

Token 双方比对校验 无需保存状态

LocalStorage 客户端本地存储

sessionStorage 会话本地存储，会话结束就删除，临时保存

## 重传、拥塞控制、滑动窗口

RTT: 往返时延
RTO: 超时时间
超时重传、快速重传
拥塞控制：慢启动、拥塞避免、拥塞发生、快速恢复