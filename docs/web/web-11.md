Web Share API是一个现代化的Web平台功能，允许网页调用操作系统的分享接口，实质是Web App与本机的应用程序交换信息的一种方式。它可以改善网页性能，不限制分享目标的数量和类型，社交媒体应用、电子邮件、即时消息、以及本地系统安装的、且接受分享的应用，都会出现在系统的分享弹窗。使用这个接口只需要一个分享按钮，而传统的网页分享有多个分享目标，就有多少个分享按钮。以下是关于Web Share API的使用教程：

1.  首先，我们需要检查浏览器是否支持Web Share API。我们可以使用以下代码来检查浏览器是否支持Web Share API：

```js
if (navigator.share) {
  // 支持Web Share API
} else {
  // 不支持Web Share API
}


```

2.  接下来，我们需要创建一个分享按钮，并在按钮的单击事件中调用 `navigator.share()` 方法。以下是一个示例代码：

```js
<button id="share-btn">分享</button>

<script>
  const shareBtn = document.getElementById('share-btn');
  shareBtn.addEventListener('click', async () => {
    try {
      await navigator.share({
        title: '分享标题',
        text: '分享描述',
        url: 'https://example.com',
      });
      console.log('分享成功');
    } catch (error) {
      console.error('分享失败:', error);
    }
  });
</script>


```

3.  在上面的代码中，我们首先获取了一个id为`share-btn`的按钮，并在其单击事件中调用了`navigator.share()`方法。调用`navigator.share()`方法时，我们需要传递一个至少包含以下字段之一的对象：

-   title：表示要共享的标题的字符串，通常是文档的标题。
-   text：表示要共享的描述的字符串，通常是文档的描述。
-   url：表示要共享的URL的字符串，通常是文档的网址。

4.  如果用户点击了分享按钮并成功地分享了内容，则`navigator.share()`方法将返回一个Promise对象，并且Promise对象将被解析。如果分享失败，则Promise对象将被拒绝，并且我们可以在catch块中处理错误。

<!---->

5.  最后，我们可以添加一些额外的功能来改善用户体验，例如在共享按钮上添加一个加载指示器，以便用户知道共享是否正在进行中。我们也可以在共享成功后显示一个成功消息，或在共享失败后显示一个错误消息。