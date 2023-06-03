### 真值

在 [JavaScript](https://developer.mozilla.org/zh-CN/docs/Glossary/JavaScript) 中，truthy（真值）指的是在[布尔值](https://developer.mozilla.org/zh-CN/docs/Glossary/Boolean)上下文中，转换后的值为 true 的值。被定义为[假值](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)以外的任何值都为真值。（即所有除 false、0、-0、0n、""、null、undefined 和 NaN 以外的皆为真值）。

[JavaScript](https://developer.mozilla.org/zh-CN/docs/Glossary/JavaScript) 在布尔值上下文中使用[强制类型转换](https://developer.mozilla.org/zh-CN/docs/Glossary/Type_coercion)。

JavaScript 中的真值示例如下（将被转换为 true，因此 if 后的代码段将被执行）：

``` js
if (true)
if ({})
if ([])
if (42)
if ("0")
if ("false")
if (new Date())
if (-42)
if (12n)
if (3.14)
if (-3.14)
if (Infinity)
if (-Infinity)
```

### 假值

假值（falsy，有时写为 falsey）是在 [Boolean](https://developer.mozilla.org/zh-CN/docs/Glossary/Boolean) 上下文中认定为 false 的值。

[JavaScript](https://developer.mozilla.org/zh-CN/docs/Glossary/JavaScript) 在需要用到布尔类型值的上下文中使用[强制类型转换](https://developer.mozilla.org/zh-CN/docs/Glossary/Type_Conversion)将值转换为布尔值，例如[条件语句(en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Conditional)和[循环语句(en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Loop)。

下列表格提供了 JavaScript 的所有假值。

| 值                                                                             | 说明                                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| false                                                                         | 关键字 [false](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#%E4%BF%9D%E7%95%99%E5%AD%97)。                                                                                                           |
| 0                                                                             | [Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 零值（同理，0.0、0x0 也为零）。                                                                                                                 |
| -0                                                                           | [Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)负零值（同理，-0.0、-0x0 也为负零）。                                                                                                              |
| 0n                                                                            | [BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)零值（0x0n 同理）。注意没有 [BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)负零值——0n 的相反数还是 0n。 |
| ""、''、``                                                                    | 空[字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)值。                                                                                                                                     |
| [null](https://developer.mozilla.org/zh-CN/docs/Glossary/Null)                | [null](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null)值——任意值缺失。                                                                                                                                     |
| [undefined](https://developer.mozilla.org/zh-CN/docs/Glossary/Undefined)      | [undefined](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)值——初始值。                                                                                                                        |
| [NaN](https://developer.mozilla.org/zh-CN/docs/Glossary/NaN)                  | [NaN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)值——非数值。                                                                                                                                    |
| [document.all](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/all) | 当且仅当对象具有 [[[IsHTMLDDA]]](https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot)内部插槽时，它才是假值。这个槽只存在于 [document.all](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/all)中，不能用 JavaScript 来设置。                              |

JavaScript 中假值的例子（在布尔值上下文中被转换为 false，从而绕过了 if 代码块）：

``` js
if (false) {
  // 执行不到这里
}

if (null) {
  // 执行不到这里
}

if (undefined) {
  // 执行不到这里
}

if (0) {
  // 执行不到这里
}

if (-0) {
  // 执行不到这里
}

if (0n) {
  // 执行不到这里
}

if (NaN) {
  // 执行不到这里
}

if ("") {
  // 执行不到这里
}
```