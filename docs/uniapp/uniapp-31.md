### 文档参考

 -   客户端调用api

<!---->

 -   <https://www.html5plus.org/doc/zh_cn/push.html>

<!---->

 -   服务端接口文档

<!---->

 -   <http://docs.getui.com/>

<!---->

 -   web发送界面，DClound开发者后台

<!---->

 -   <https://dev.dcloud.net.cn/>

<!---->

 -   官网文档

<!---->

 -   <https://uniapp.dcloud.io/api/plugins/push>

<!---->

 -   UniPush使用指南

<!---->

 -   <https://ask.dcloud.net.cn/article/35622>

### 推送消息类型

-   通常推送消息分以下两种类型：

<!---->

 -   通知栏消息（推送通知）
        UniPush推送服务定义好的推送样式、后续动作的推送方式，客户端接收到后显示在系统通知栏，用户点击通知栏消息启动APP（激活到前台）。
 -   透传消息
        即自定义消息，UniPush推送服务只负责消息传递，不做任何处理，客户端在接收到透传消息后需要自己去处理消息的展示方式或后续动作。
        **UniPush推送服务对透传消息的数据符合以下格式时做了特殊处理，将透传消息显示到系统通知栏**

```js
{"title": "xxx","content": "xxx","payload": "xxx"}
```

### 开通uniapp推送服务

#如何开通推送服务,根据官方提供的文档操作即可。

<https://ask.dcloud.net.cn/article/35716>

### 下发推送消息

 -   服务端发送，详细说明见文档

<!---->

 -   <http://docs.getui.com/>

<!---->

 -   开发者后台下发推送消息

<!---->

 -   登录[DCloud开发者中心](https://dev.dcloud.net.cn/)，在“我创建的应用”列表中选择应用，左侧选择“Uni Push”，打开消息推送页面。
 -  tips 推送页面改版，详情了解[开发者中心Unipush推送页面优化介绍](https://ask.dcloud.net.cn/article/36932)
 -  使用厂商通道必须使用“透传消息”发送推送消息。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5b5cb19b2514ca28ed586292b9d06ce~tplv-k3u1fbpfcp-zoom-1.image)

## 客户端处理推送消息

#参考5+APP文档    <http://www.html5plus.org/doc/zh_cn/push.html>

#获取服务供应商

<https://uniapp.dcloud.io/api/plugins/provider?id=getprovider>

```js
//获取服务供应商
uni.getProvider({
  service: "push",
  success: (e) => {
    console.log("success", e);
  },
  fail: (e) => {
    console.log("获取推送通道失败", e);
  }
});

//开启push接收
uni.subscribePush({
  provider: '',//unipush,igexin,mipush
  success: (e) => {
    uni.showToast({
      title: "已开启push接收"
    })
  }
})

//关闭push接收
uni.unsubscribePush({
  provider: '',//unipush,igexin,mipush
  success: (e) => {
    uni.showToast({
      title: "已关闭push接收"
    })
  }
})

//开始监听遗传数据
uni.onPush({
  provider: '',//unipush,igexin,mipush
  success: (e) => {
    uni.showToast({
      title: "开始监听透传数据"
    })
  },
  callback: (e) => {
    uni.showToast({
      title: "接收到透传数据"
    });
  }
})

//移除监听遗传数据
uni.offPush({
  provider: '',//unipush,igexin,mipush
  success: (e) => {
    console.log("移除监听透传数据");
    uni.showToast({
      title: "移除监听透传数据"
    })
  }
})
```

## 5+app方法解析

#添加事件监听器

 -   event:事件类型

<!---->

 -  click:从系统消息中心点击消息启动应用事件，用于离线监听
 -  receive:应用从推送服务器接收到推送消息事件，用于在线监听

<!---->

 -   listener:回调函数
 -  Boolean:是否捕捉事件

```js
plus.push.addEventListener( event, listener, Boolean );
```

#创建本地消息

 -   content:消息显示的内容
 -  payload：消息承载的数据
 -  option：创建消息的额外参数

<!---->

 -  <http://www.html5plus.org/doc/zh_cn/push.html#plus.push.MessageOptions>

```js
plus.push.createMessage( content, payload, option );
```

####

#清空系统中心所有的推送消息

```js
plus.push.clear();
```

#获取所有推送消息

```js
plus.push.getAllMessage();
```

#删除推送消息

 -   删除系统消息中心指定的推送消息，可通过getAllMessage方法获取所有的消息后进行操作。
 -  message:删除的消息对象

<!---->

 -  <http://www.html5plus.org/doc/zh_cn/push.html#plus.push.PushMessage>

```js
plus.push.getAllMessage();
plus.push.remove(message);
```

### 客户端最终处理方案

 -   注意:自 HBuilderX 1.7.3 起，HBuilder 基座的推送供应商为 UniPush 服务。

```js
onLaunch: function (){
	uni.getProvider({
    service: "push",
    success: (e) => {
      console.log("success", e);
      uni.subscribePush({
        provider: 'unipush',//unipush,igexin,mipush
        success: (e) => {
          uni.showToast({
            title: "已开启push接收"
          })
          /* 使用:H5+的方式监听，实现推送*/
          plus.push.addEventListener("click", function(msg) {
            plus.ui.alert("click:"+JSON.stringify(msg));
						//逻辑处理...
          }, false);
          /* 监听在线消息事件 */
          plus.push.addEventListener("receive", function(msg) {
            /*{
            	"title": "测试标题",
              "content": "测试内容",
              "payload": "{
          			content: 'test'
          		 }"
             }*/
          	if(plus.os.name == 'ios') {
            	plus.push.createMessage( msg.payload.content, JSON.stringify(msg.payload) ,{
                appid: '_UNI_B73181C',
                cover: true,
                icon: '/static/images/hb.png',
                sound: 'system',
                title: '标题',
                subtitle: '副标题'
              });
            } else if (plus.os.name == 'android') {
            	//逻辑处理...
            } else {
            	return;
            }
       		}, false);
        }
      })
    },
    fail: (e) => {
      console.log("获取推送通道失败", e);
    }
  });
}
```