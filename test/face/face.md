// 1.0 队头阻塞、无多路复用，缓存expire
// 1.1 有了长链接keeplive保持tcp链接一段时间、有管道pipelining,但还是按照请求先后顺序返回、有强缓存、策略缓存 chace-control、etag（生成消耗服务器性能）、last-modified(服务器时间比对，秒内多次修改会有问题)
// 2.0 有多路复用，有数据流控制（二进制分帧）、头部进行压缩、性能提升
// 3.0 quic协议基于udp协议

// osi 七层参考模型
// 应用层、表示层、会话层、传输层、网络层、数据链路层、物理层

// tcp: 面向连接可靠传输
// 三次握手：客户端握手包->服务端收到握手包后发送握手包和应答包->客户端回复握手包->双方开辟链接资源
// 四次挥手：客户端fin包->服务端收到发送fin应答包->并结束正在进行工作->发送fin包->客户端回复fin-> 双方释放资源

// cookie: 提供服务端在客户端保存数据能力。
// session: 服务端保存状态，查询消耗性能不利于分布式。
// LocalStorage: 客户端本地存储。
// Token: json web token 双方比对校验。
// sessionStorage：  会话本地存储，会话结束就删除，临时保存。

// 非对称加密/对称传: 一把钥匙一把锁、用来传输私钥、然后双方实现对称传输
// ssh:fingerprint 处理中间人攻击 、shell 设计的一种通信协议
// ssl/tsl 传输层安全协议（区别 ssh：可是 SSL 是为了整个互联网上的所有客户端与服务器之间通信而设计的，他们彼此之间不可能自己判断通信的对方是否可信。那么如何解决这个问题呢？）
// CA 证书（保证中间人攻击: 公钥由中间人生成）
// 对称传输

// 数组、链表、栈、队列
// 时间复杂度 O(1)、O(n)、O(n2)、O(logN)、O(nlogN)
// 空间复杂度 O(1)、O(n)、O(n2)

// texture2d 和 spriteframe 区别: texture2d为一张纹理，spriteframe是根据纹理进行裁剪；
// A.bind(this) == A.bind(this)
// typescript的装饰器，是一种可以更改其他函数的方式
// asset bundle 的资源优先级问题、同优先级复制、低优先级依赖高优先级
// module export 和 export 区别： require module.exports commonjs规范;exports 是对 module.exports 的引用（amd require 、define 模块）；commonjs、es6   
// 原型链
number stirng bigint boolean symbol null undefined object

// 成员函数（类中的成员函数被赋值调用的时候需要使用bind绑定环境）
// bind会返回新的函数、call、apply
// 声明合并（给Function 添加 bind方法）
// thisArg
// 类数组转换Array.from/扩展运算符
// arrow function
// promise 几种状态、几种结果
// Object.freeze / 进行递归做深拷贝 / Object.isFrozen()检测是否冻结 /Object.preventExtensions(可新增)、Object.seal(不可删除可修改)、Object.freeze(只读) / es5  

// 换装系统
// 截取路径获得不同类型的骨骼。
// spine动画每个部位可以只做一个attachment，这样动画文件结构简单，体积较小，内存占用较小加载速度也较快、还可以做预加载。
// 1.尽量保持spine的简洁和大小，所以采用网络动态加载（体积占用小、内存占用小）、重载支持本地资源替换。（涉及vivo的加载文件问题）
// 2.同步加载改异步加载，优化加载体验 promise.all。
// 3.局部通过修改附件changeAttachment进行替换。
// 6.替换动作时考虑过渡动画：setAction；setAnimation，addAnimation解决动画切换流畅问题。
// 5.骨骼、插槽、附件是否存在、spine预乘问题（灰色描边）（先乘个透明度，在用shader乘回去显示、（部分压缩算法无法（ETC2）有损、Bleeding出血也可以解决问题、我不认为将全部素材做预乘然后全部设置one是个理智的解决方案）、装扮还原问题
// 开启预乘之后 opacity 失效的问题处理，已经修改，会在 2.4 版本更新。

// 关于图片导入之后的黑边问题说明，已经补充到文档中，暂时还未更新，详细说明以及对应方案如下：
// 当图片资源导入到编辑器中时，默认使用的过滤方式(Filter Mode)为线性插值(Bilinear)，而对于 Sprite 组件，默认的 SrcBlendFactor 为 SRC_ALPHA。在这种条件下，对于有半透明像素的 PNG 图片，在编辑器及预览时半透明边缘通常会有黑边问题。原因是因为低分辨率的图片在显示到更高分辨率的显示设备上时，会进行上采样（upsampling），也就是图像插值（interpolating），在做像素插值时，半透明边缘与透明像素（0，0，0，0）插值之后会产生低透明度的黑色像素。避免图片的黑边问题通常有如下几种方式：
// 过滤方式(Filter Mode)使用 Point 模式，需要能够接受 Point 模式下的锯齿。（推荐）
// 在图片在 PS 等工具中制作时，增加背景图层，颜色设置为半透明边缘的颜色，然后设置背景图层的透明度为如 1/100 的低透明度。（推荐）
// 在图片导出时，设置为较高的分辨率，避免显示到设备时进行图像插值放大。（不推荐）
// 引擎的自动图集提供了扩边选项，勾选该选项时，编辑器会自动为半透明图片边缘进行扩边处理，可以避免黑边问题，需要注意的是，自动图集只有构建之后才会生效，在编辑器及预览时不会生效。其他图集打包工具一般也会有类似的处理选项（推荐）
// 设置 Sprite 的 SrcBlendFactor 为 ONE，对图片进行预乘处理，但是可能会影响到图片的批次合并，需要开发者视使用场景决定。