## HTML

```html
<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/vue-contextmenujs/dist/contextmenu.umd.js"></script>
<div id="app" style="width:100vw;height:200vh">{{message}}</div>
```

## CSS

```css
@import url("//unpkg.com/element-ui/lib/theme-chalk/index.css");
```

## JS

```js
new Vue({
  el: '#app',
  data() {
    return {
      message: "右键打开菜单"
    };
  },
  mounted() {
    document.querySelector("#app").oncontextmenu = event => {
      this.$contextmenu({
        items: [
          {
            label: "返回(B)",
            onClick: () => {
              this.message = "返回(B)";
              console.log("返回(B)");
            }
          },
          { label: "前进(F)", disabled: true },
          { label: "重新加载(R)", divided: true, icon: "el-icon-refresh" },
          { label: "另存为(A)..." },
          { label: "打印(P)...", icon: "el-icon-printer" },
          { label: "投射(C)...", divided: true },
          {
            label: "使用网页翻译(T)",
            divided: true,
            minWidth: 0,
            children: [{ label: "翻译成简体中文" }, { label: "翻译成繁体中文" }]
          },
          {
            label: "截取网页(R)",
            minWidth: 0,
            children: [
              {
                label: "返回(B)",
                onClick: () => {
                  this.message = "返回(B)";
                  console.log("返回(B)");
                }
              },
              { label: "前进(F)", disabled: true },
              { label: "重新加载(R)", divided: true, icon: "el-icon-refresh" },
              { label: "另存为(A)..." },
              { label: "打印(P)...", icon: "el-icon-printer" },
              { label: "投射(C)...", divided: true },
              {
                label: "使用网页翻译(T)",
                divided: true,
                minWidth: 0,
                children: [
                  { label: "翻译成简体中文" },
                  { label: "翻译成繁体中文" }
                ]
              },
              {
                label: "截取网页(R)",
                minWidth: 0,
                children: [
                  {
                    label: "截取可视化区域",
                    onClick: () => {
                      this.message = "截取可视化区域";
                      console.log("截取可视化区域");
                    }
                  },
                  { label: "截取全屏" }
                ]
              },
              { label: "查看网页源代码(V)", icon: "el-icon-view" },
              { label: "检查(N)" }
            ]
          },
          { label: "查看网页源代码(V)", icon: "el-icon-view" },
          { label: "检查(N)" }
        ],
        event,
        customClass: "class-a",
        zIndex: 3,
        minWidth: 230
      });
      return false;
    };
  }
})
```

## 参考链接

<https://github.com/GitHub-Laziji/menujs?v=2>