---
title: Http--超文本传输协议
date: 2020-05-28 22:16:48
tags:
---

## HTTP的特点  
1. HTTP协议是无状态的  
每次HTTP请求都是独立的，任何两个请求之间没有必然联系
2. 多次HTTP请求  
非一次请求完成资源请求，支持管道机制，可同时支持和响应多个请求
3. 基于TCP协议  
TCP默认持久链接，一个TCP链接可进行多次请求  
HTTP规定数据传输格式和数据交互行为，不负责数据传输细节
****
## HTTP的组成
### URI(统一资源标识符)
```
    http://user:pass@host.com:8080/p/a/t/h?query=string#hash
```

http | 协议名称   
:-:|:-:
user | 用户名(可选)
pass | 对应密码(可选)
host | 主机域名地址（也可以是ip地址）
8080 | 端口号，默认是80
/p/a/t/h | 资源路径
query=string|参数传递&
hash | 锚点
 
### HTTP请求与响应
#### 请求
   * **请求行**
   * **请求头信息**
   * **请求主体信息**  
   请求头信息与主体信息之间要有一个空行

#### 请求格式

   ```
    请求行:                      POST /test HTTP/1.1
    请求头信息(格式为key-value):
                                host:localhost
                                content-type:application/x-www-fore-urlencoded
                                content-length:25  
    空行:
    请求主体信息:                 name=zhangshan
   ```
#### 响应格式
```
    响应行:                      POST /test HTTP/1.1
    响应头信息(格式为key-value):
                                host:localhost
                                content-type:application/x-www-fore-urlencoded
                                content-length:25  
    空行:
    请求主体信息（可能没有）:       hello world
```

#### 请求方法
1. GET  获取资源  
服务器处理请求之后响应的内容
2. POST 创建资源  
数据包含在请求主体中。POST请求可能导致新的资源建立或者已有资源修改
3. PUT 修改资源  
传送数据取代制定文档内容
4. HEAD 获得报文首部  
区别于GET,不要求返回数据，用于确认URI的有效性及资源更新时间
5. DELETE 删除文件  
与PUT相反的方法，要求返回URL指定资源
6. OPTIONS  询问支持的方法  
有些时候为了安全某些服务器会禁止DELETE、PUT等，options询问支持的方法
7. TRACE 追踪路径
不常用，将客户端之前通信方法返回
8. CONNECT 隧道协议  
SSL/TLS协议对通信内容加密后传输

#### HTTP状态码和状态文字
反映服务器响应状态
1. 1** 信息，服务器收到请求，需要请求者继续操作
2. 2** 成功
3. 3** 重定向 需要继续操作完成请求
4. 4** 客户端错误
5. 5** 服务端错误


304 缓存
307 重定向中保持原有请求数据


#### 内容类型
* text/html ： HTML格式
* text/plain ：纯文本格式
* text/xml ： XML格式
* image/gif ：gif图片格式
* image/jpeg ：jpg图片格式
* image/png：png图片格式

##### 以application开头的媒体格式类型：
* application/xhtml+xml ：XHTML格式
* application/xml： XML数据格式
* application/atom+xml ：Atom XML聚合格式
* application/json： JSON数据格式
* application/pdf：pdf格式
* application/msword ： Word文档格式
* application/octet-stream ： 二进制流数据（如常见的文件下载）
* application/x-www-form-urlencoded ： <form encType=””>中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）