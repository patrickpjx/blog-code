---
title: egMvc
date: 2021-08-04 11:38:40
tags:
---

## Game（LOD、OCP）

提供一个外观 Game 类、降低客户端与子系统类耦合性。
全局管理模块(DragonBonesFactory、SoundManager、ControllerManager、ViewManager)采用懒汉式单例模式，全局唯一共享，减少重复创建，不用考虑 gc 问题

## ControllerManager

1.moudles 内部维护模块数组 2.允许模块组件间通过注册 id 方法调用

```
clear() // 清空处理
register(key: number, control: BaseController) // 动态注册 Controller
unregister(key: number) // 动态移除 Controller
isExists(key: number) //是否已经存在 Controller
applyFunc(controllerD: number, key: number, ...param: any[]) //跨模块消息传递
getControllerModel(controllerD: number) //获取指定 Controller 的 Model 对象

```

## ViewManager

1.views 维护已注册视图、opens 开启中视图、controllerView（控制器，与 view 绑定一对多关系） 2.支持替换面板、根据 index 配置进行排序

```
clear() // 清空处理
register(key: number, view: IBaseView, controller?: BaseController) // 注册面板、面板附带控制器（避免重复注册相同控制器）
unregister(key: number) // 销毁面板
clearController(controller: BaseController) // 清楚控制器（关闭views、清楚相关views）
destroy(key: number, newView: IBaseView = null) // 替换面板
open(key: number, ...param: any[]) //打开面板
close(key: number, isRemove: boolean = true, ...param: any[]) // 关闭销毁面板 key
closeView(view: IBaseView, ...param: any[]) // 关闭面板
getView(key: number) // 获取面板实例
closeAll()
currOpenNum()
isShow()
}

```

## SceneManager

```
clear()
register()
runScene(key: number, ...param: any[])
getCurrScene()
```

## LayerManager

父亲节点分层

## ResourceUtils

```
addConfig(jsonPath: string, filePath: string)
loadConfig($onConfigComplete: () => void, $onConfigCompleteTarget: any)
loadNextConfig()
onConfigCompleteHandle()
loadGroup($groupName: string, $onResourceLoadComplete: () => void, $onResourceLoadProgress: (itemsLoaded: number, itemsTotal: number) => void, $onResourceLoadTarget: any)
loadGroups($groupName: string, $subGroups: any[], $onResourceLoadComplete: () => void, $onResourceLoadProgress: (itemsLoaded: number, itemsTotal: number) => void, $onResourceLoadTarget: any)
loadResource($resources = [], $groups = [], $onResourceLoadComplete: () => void = null, $onResourceLoadProgress: () => void = null, $onResourceLoadTarget: any = null) // 混合加载资源
pilfererLoadGroup($groupName: string, $subGroups: any[] = null) // 静默加载
onResourceLoadComplete(event: RES.ResourceEvent)
onResourceLoadError(event: RES.ResourceEvent)
onResourceLoadProgress(event: RES.ResourceEvent)
createGroup() // 动态创建加载组
createResource() //动态创建Resource
getFileRealPath() // 获取文件真实路径
```

## DragonBonesFactory

```
createEgretArmatureDisplay 创建龙骨显示对象
replaceSlotDisplay 替换插槽显示对象
setNewSlotByRes/setNewSlotByResUrl 针对slot设置其新内容
```

## Other

```
    SoundManager
    StageUtils
    DateUtils
    StringUtils
    SceneManager
    DisplayUtils
    ParticleManager
    timer
```
