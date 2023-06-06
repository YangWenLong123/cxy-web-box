## async-validator

-   描述：用于表单校验的库.
-   github: <https://github.com/yiminghe/async-validator>
-   npm: <https://www.npmjs.com/package/async-validator>

## FullCalendar

-   描述：Fullcalendar是一款用来管理日程安排、工作计划的日历工具，它功能非常强大而且非常实用。
-   中文文档：<https://www.helloweba.net/javascript/445.html>
-   官网：<https://fullcalendar.io/>
-   案例接入流程：<https://www.yuque.com/along-n3gko/ezt5z9/oq3rcb>
-   github: <https://github.com/fullcalendar/fullcalendar>
-   npm: <https://www.npmjs.com/search?q=FullCalendar>

## vuex-table

描述：一个基于 [vue](https://gitee.com/link?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fvue) 的 PC 端表格组件，支持增删改查、虚拟列表、虚拟树、懒加载、快捷菜单、数据校验、打印导出、表单渲染、数据分页、弹窗、自定义模板、渲染器、贼灵活的配置项、扩展接口等...

中文文档：<https://vxetable.cn/#/table/start/install>

## 表单设计器

gitlab: <https://gitee.com/gavinzhulei/vue-form-making>

预览: <http://form.making.link/sample/#/zh-CN/>

## xdh-map

gitlab: <https://gitee.com/newgateway/xdh-map>

## [vue-monoplasty-slide-verify](https://gitee.com/monoplasty/vue-monoplasty-slide-verify)

描述: 验证码

gitlab: <https://gitee.com/monoplasty/vue-monoplasty-slide-verify>

### vue2-ace-editor

描述：代码编辑器

npm: <https://www.npmjs.com/package/vue2-ace-editor>

接入

```js
<editor
  ref="editor"
  lang="javascript"
  :options="{
    enableBasicAutocompletion: true, // 启用基本自动完成
    enableSnippets: true, // 启用代码段
    enableLiveAutocompletion: true, // 启用实时自动完成
    tabSize: 2, // 标签大小
    fontSize: 14, // 设置字号
    showPrintMargin: false // 去除编辑器里的竖线
  }"
  :enable-live-autocompletion="true"
  :enable-basic-autocompletion="true"
  :enable-snippets="true"
  theme="chrome"
  @init="handleEditorInit"
  @input="codeChange"
/>
```

```js
import Editor from 'vue2-ace-editor';

export default {
  data () {
     return {
         editor: null
     }
  },

  methods: {
     // 默认执行
     handleEditorInit (editor) {
      require('brace/ext/language_tools') // language extension prerequsite...
      require('brace/mode/yaml')
      require('brace/mode/json')
      require('brace/mode/less')
      require('brace/snippets/json')
      require('brace/mode/lua')
      require('brace/snippets/lua')
      require('brace/mode/javascript')
      require('brace/snippets/javascript')
      require('brace/theme/monokai')
      require('brace/theme/chrome')
      require('brace/theme/crimson_editor')

      this.editor = editor;
      this.editor.setTheme('ace/theme/twilight');
     }
  }
}
```

```js
this.editor.getValue();  //获取值
this.editor.setValue();  //设置值
```