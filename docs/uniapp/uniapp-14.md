 ## 代码

```js
if(plus.runtime.isApplicationExist({ pname: 'com.tencent.mm', action: 'weixin://' })) {
  //安装微信
} else {
  //未安装微信
}

if(plus.runtime.isApplicationExist({ pname: 'com.tencent.mobileqq', action: 'mqq://' })) {
  //安装QQ
} else {
  //未安装QQ
}
```