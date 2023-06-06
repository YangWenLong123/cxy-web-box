## schemes

-   android

<!---->

 -    打开项目的mainfest.json文件，切换到代码试图
 -   在manifest.json文件的"plus"->"distribute"->"google"下添加schemes节点数据如下
 -   值域:为字符串数组,每个字符串为一个urlscheme,使用消协字母（不要使用特殊符号和中文），可设置多个，比如设置test,那么唤起app的scheme协议就是test://

```js
"app-plus": {
	"distribute": {
  	"android": {
    	"schemes": ""
    }
  }
}
```

-   ios

<!---->

 -    打开项目的mainfest.json文件，切换到代码试图
 -   在manifest.json文件的"plus"->"distribute"->"google"下添加schemes节点数据如下
 -   值域:urlidentifier为标识，可自定义，格式为反向域名格式；urlschemes为要指定的scheme值，字符串数组，使用小写字母，可设置多个。 比如设置为test，那么其他App呼起你的app的scheme协议就是test://。

```js
"app-plus": {
	"distribute": {
  	"ios": {
    	"urltypes": [{
      		"urlidentifier":"com.xxx.test",
          "urlschemes": [
            "test"
          ]
      }]
    }
  }
}
或
"app-plus": {
	"distribute": {
  	"ios": {
    	"urltypes": "test,test2"
    }
  }
}
```

## 调用方式

```js
<a href="test://enter?a=1">唤起app<a>
location.href = 'test://enter?' + 'a=1'
```

## app参数处理

```js
let args = plus.runtime.arguments;
	console.log(plus.runtime.arguments, typeof args, 'plus.runtime.arguments');
	if (typeof args == 'string' || typeof args == 'object') {
    args = args.split('entry?');

    console.log(args,'args');
    if (args.length == 2 && args[1]) {
      args = args[1];
      try {
        //获取到参数，处理跳转逻辑
      } catch (e) {
        console.log('处理参数失败', e);
      }
   }

   //值清空这里有坑的,可能是官方bug
   plus.runtime.arguments = null;
   plus.runtime.arguments = '';
   return false;
}
```

## 设置应用跳转白名单

-   打开项目的manifest.json文件，切换到“代码视图”

<!---->

 -    在manifest.json文件的"plus"->"distribute"->"apple"下添加urlschemewhitelist节点数据如下：

```js
"app-plus": {
	"distribute": {
  	"ios": {
    	"urlschemewhitelist": "baidumap,iosamap,qqmap,tbopen,tmall"
    }
  }
}
```

-   app段云打包默认添加白名单列表

```js
lightsky
shark.video
bobo
snssdk32
pptv
bilibili
kugouURL
gaeagj
qqnews
zhihu
doubanradio
openApp.jdMobile
imeituan
tmall
dianping
vipshop
yanxuan
wccbyihaodian
taobao
suning
kaola
ctrip
kuaikanmanhua
gugutouchmanga
qrxs
mailmaster
jcnhers
wbmain
yixin
ydcourse
ntesopen
yddict
shanbay
tencentweiboSdkv2
weibosdk2.5
sinaweibo
sinaweibohd
cydia
weixin
wechat
weibosdk
mqq
mqqapi
mqzone
wtloginmqq2
mqqopensdkapiV3
mqqwpa
mqqopensdkapiV2
mqqOpensdkSSoL
hbuilder
streamapp
baidumap
iosamap
qqmap
```

## 微下载

作用：跳转应用市场和app store商店，安装应用会提示用户打开app，不用判断应用是否安装。

腾讯开放平台：<https://wiki.open.qq.com/index.php?title=mobile/%E5%BA%94%E7%94%A8%E5%AE%9D%E5%BE%AE%E4%B8%8B%E8%BD%BD#3.3_Applink.E8.83.BD.E5.8A.9B>

申请链接：<http://a.app.qq.com/o/simple.jsp?pkgname=xxx>

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2b9fc5543544069a33893976f6bee28~tplv-k3u1fbpfcp-zoom-1.image)