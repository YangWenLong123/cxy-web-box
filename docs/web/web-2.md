#### 文档地址

<http://html2canvas.hertzen.com/configuration>

#### 预览

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f61d18e5f8934a6ab4889bdc4ceeb789~tplv-k3u1fbpfcp-zoom-1.image)

#### 下载海报

```js
//海报DOM结构 img标签添加crossOrigin属性，用于解决图片跨域无法生成截图
<div
	class="wrap"
	ref="canvasHtml"
>
  <p>标题</p>
  ...
  <img src='' crossOrigin="anonymous" />
</div>
```

```js
html2canvas(this.$refs.canvasHtml,{
  backgroundColor: '#000000',
  allowTaint: false,
  taintTest: true,
  useCORS:true,
  scale: 3,
  dpi: 300
}).then((canvas) => {
  document.body.appendChild(canvas);
  let dataURL = canvas.toDataURL("image/png");

  this.fnDownLoadFile('图片名称' + '.png', dataURL);
});

/**
* @description 下载base64图片
* @param   {String}    fileName        //图片名称
* @param   {String}    content         //base64
*/
fnDownLoadFile (fileName, content) {
  let aLink = document.createElement('a');
  let blob = this.base64ToBlob(content);
  let evt = document.createEvent("HTMLEvents");

  //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  evt.initEvent("click", true, true);
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  //兼容火狐
  aLink.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
},

/**
* @description base64转换blob
*/
base64ToBlob(code) {
  let parts = code.split(';base64,');
  let contentType = parts[0].split(':')[1];
  let raw = window.atob(parts[1]);
  let rawLength = raw.length;
  let uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
  	uInt8Array[i] = raw.charCodeAt(i);
  }
  	return new Blob([uInt8Array], {type: contentType});
  }
```

#### 下载在线图片

```js
//src:图片地址 imgName:图片名称
downImages (src,imgName) {
  let canvas = document.createElement('canvas');
  let img = document.createElement('img');

  img.onload = function(e) {
  canvas.width = img.width;
  canvas.height = img.height;
  let context = canvas.getContext('2d');

  context.drawImage(img, 0, 0, img.width, img.height);
  canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
  canvas.toBlob((blob) => {
  let link = document.createElement('a');

  link.href = window.URL.createObjectURL(blob);
  link.download = imgName;
  link.click();
  },
  "image/jpeg");
  };
  img.crossOrigin = "Anonymous";
  img.src = src;
}
```

#### 跨域问题

原因：图片cdn的域名与当前域名不同，如果域名相同不会产生跨域问题

解决：

后端：cdn为自己的服务器，后端配置cdn跨域请求配置，可以参考cors跨域请求.

前端：配置跨域请求参数即可