## 介绍

EditorConfig 是一个编辑器/IDE 偏好设置的标准，在各大主流编辑器/IDE 平台都支持或者拥有相应的插件。它能够帮助你根据项目自动设置编辑器/IDE 的代码偏好。 [官网](https://editorconfig.org/)



## 配置

```js
root = true                         # 根目录的配置文件，编辑器会由当前目录向上查找，如果找到 `roor = true` 的文件，则不再查找

[*]                                 # 匹配所有的文件
indent_style = space                # 空格缩进
indent_size = 4                     # 缩进空格为4个
end_of_line = lf                    # 文件换行符是 linux 的 `\n`, 换行符的类型。lf, cr, crlf三种
charset = utf-8                     # 文件编码是 utf-8,有以下几种类型：latin1, utf-8, utf-8-bom, utf-16be, utf-16le
trim_trailing_whitespace = true     # 不保留行末的空格
insert_final_newline = true         # 文件末尾添加一个空行
curly_bracket_next_line = false     # 大括号不另起一行
spaces_around_operators = true      # 运算符两遍都有空格
indent_brace_style = 1tbs           # 条件语句格式是 1tbs

[*.js]                              # 对所有的 js 文件生效
quote_type = single                 # 字符串使用单引号

[*.{html,less,css,json}]            # 对所有 html, less, css, json 文件生效
quote_type = double                 # 字符串使用双引号

[package.json]                      # 对 package.json 生效
indent_size = 2                     # 使用2个空格缩进
```


## 文件关系

1、setting.json 和 editorConfig的关系

快捷键格式化代码就是以 setting.json 的配置为依据的，但是当项目中含有 editorConfig 文件时，会优先依据 editorConfig 的配置来格式化代码

2、项目根目录中的 .editorConfig 文件 和 项目根目录中的 .prettier.js 文件的关系

editorConfig 是编辑器级别，优先级最高的，完全可以设置代码格式，但是我们有了更专业的prettier,个人觉得.editorConfig作用不大，可以设置简单的，通用的即可。



## 推荐配置

```json
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```