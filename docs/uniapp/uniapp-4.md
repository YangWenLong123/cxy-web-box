## 前言

用途:在修改某项数据之后返回上一页面刷新并展示

## 代码

向上一个页面传递数据.

```js
uni.navigateBack({
  success: () => {
    let page = getCurrentPages().pop();//跳转页面成功之后
    if (!page) return;
    let options = {
      xx:xx  //例如上一页面是id为2的数据,要传递回去
    }
    page.onLoad(options);
  }
})
```

如果说我们想用返回的上一个页面的options,用page自带的options

```js
uni.navigateBack({
  success: () => {
    let page = getCurrentPages().pop();  //跳转页面成功之后
    if (!page) {
      return;
    } else {
    	page.onLoad(page.options);// page自带options对象.
    }
  }
})
```