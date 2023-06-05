## FontFace基本用法

FontFace的基本用法如下所示：

```js
const customFont = new FontFace('Custom Font', 'url(path/to/font.ttf)');
customFont.load().then((font) => {
  document.fonts.add(font);
  document.body.style.fontFamily = 'Custom Font';
}).catch((error) => {
  console.log(error);
});


```

此代码创建了一个名为“Custom Font”的字体对象，它的源文件为“path/to/font.ttf”，并将其添加到文档中。在字体加载完成后，它被添加到文档的字体集合中，并设置为body元素的字体系列。

## FontFace的高级用法

FontFace API还有一些高级用法，可以更精细地控制字体的加载和状态。例如，可以使用FontFaceSet对象来检查字体是否加载完成，或使用FontFace对象的metadata属性来获取字体的元数据。

```js
const customFont = new FontFace('Custom Font', 'url(path/to/font.ttf)');
document.fonts.add(customFont);
customFont.load().then(() => {
  console.log('Font loaded');
}).catch((error) => {
  console.log(error);
});

if (document.fonts.check('Custom Font')) {
  console.log('Font is loaded');
}

console.log(customFont.metadata);


```

此代码创建了一个名为“Custom Font”的字体对象，并将其添加到文档中。然后，它使用FontFaceSet对象的check()方法检查字体是否加载完成，并使用FontFace对象的metadata属性获取字体的元数据。