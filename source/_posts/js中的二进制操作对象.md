---
title: js中的二进制操作对象
date: 2020-09-07 14:56:25
tags:
- ArrayBuffer
- Blob
- Buffer
categories: pieces
---

#### Blob(A Binary Large OBject)
A Binary Large OBject (BLOB) is a collection of binary data stored as a single entity in a database management system. Blobs are typically images, audio or other multimedia objects, though sometimes binary executable code is stored as a blob

js中的Blob: Blob 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。
`````
<script>
    const blob = new Blob(["test"],{type:'text/plain'});
    console.log(blob);
</script>
`````

![](https://raw.githubusercontent.com/patrickpjx/i/master/img/%E6%88%AA%E5%B1%8F2020-09-07%20%E4%B8%8B%E5%8D%884.23.40.png);

Blob 对象含有两个属性：size 和 type。其中 size 属性用于表示数据的大小（以字节为单位），type 是 MIME 类型的字符串。

[MIME](https://www.zhihu.com/question/60495696/answer/204530120)

[Blob的部分应用场景](https://zhuanlan.zhihu.com/p/146577946)

#### ArrayBuffer
ArrayBuffer对象作为内存区域可以存放多种类型的数据。同一段内存，不同数据有不同的解读方式，这种解读方式称为“视图（view）”。ArrayBuffer有两种类型的视图，一种是类型化数组视图（TypedArray），另一种是数据视图（DataView）。类型化数组视图的数组成员都是同一个数据类型，后者的数组成员可以是不同的数据类型。

* DataView 视图提供一个底层接口来读取和写入多种数据类型到一个ArrayBuffer中去而忽略平台的大小端。

`````
    //判断平台字节序大小端
    var littleEndian = (function() {
    var buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, 256, true /* littleEndian */);
    // Int16Array uses the platform's endianness.
    return new Int16Array(buffer)[0] === 256;
    })();
    console.log(littleEndian); // true or false

`````
* TypedArray 描述了一个类数组的底层二进制数据buffer的视图

[TypedArray详解](https://zhuanlan.zhihu.com/p/54195797)

#### ArrayBuffer vs Blob

* Blob 用于操作二进制文件
* ArrayBuffer 用于操作内存
