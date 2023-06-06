## plus创建扫码控件

```js
const currentWebview = this.$mp.page.$getAppWebview();

var barcode = plus.barcode.create('barcode', [plus.barcode.QR], {
    top:'100px',
    left:'0px',
    width: '100%',
    height: '300px',
    position: 'static'
});
//此处未演示扫码成功回调的地址设置，实际请参考HTML5Plus API自行处理
//注意扫码区域需为正方形，否则影响扫码识别率
currentWebview.append(barcode);

barcode.start({
    conserve: true,
    filename: '',
    vibrate: true,
    sound: 'default'
});

/*
*		type:条码类型
*		code:读到的条码数据
*		file：扫码成功的截图路径
*/
barcode.onmarked = function (type, code, file) {
  	console.log(type, code, file, '2');
}

barcode.onerror = function (error) {
  	console.log(error, '2');
}
```

### 扫码控件预览

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d64a63b71ab497698a72930695a9c44~tplv-k3u1fbpfcp-zoom-1.image)

### 测试扫码

```js
草料二维码：https://cli.im/
测试二维码网址：www.baidu.com
测试结果：
	0 , www.baidu.com, _doc/barcode_005.jpg
```

### 二维码数值

```js
QR: QR二维码，数值为0
EAN13: EAN条形码标准版，数值为1
EAN8: ENA条形码简版，数值为2
AZTEC: Aztec二维码，数值为3
DATAMATRIX: Data Matrix二维码，数值为4
UPCA: UPC条形码标准版，数值为5
UPCE: UPC条形码缩短版，数值为6
CODABAR: Codabar条形码，数值为7
CODE39: Code39条形码，数值为8
CODE93: Code93条形码，数值为9
CODE128: Code128条形码，数值为10
ITF: ITF条形码，数值为11
MAXICODE: MaxiCode二维码，数值为12
PDF417: PDF 417二维条码，数值为13
RSS14: RSS 14条形组合码，数值为14
RSSEXPANDED: 扩展式RSS条形组合码，数值为15

备注：https://www.html5plus.org/doc/zh_cn/barcode.html#plus.barcode.QR
```

## 官网API扫码

<https://uniapp.dcloud.io/api/system/barcode>

```js
uni.scanCode({
  success: function (res) {
    console.log('条码内容：' + res.result);
    console.log('条码类型：' + res.scanType);
    console.log('条字符集：' + res.charSet);
    console.log('合法是返回：' + res.path);
  }
});
```

```js
草料二维码：https://cli.im/
测试二维码网址：www.baidu.com
测试结果：
	条码内容：www.baidu.com
	条码类型：QR_CODE
	条字符集：utf8
	合法是返回：
```