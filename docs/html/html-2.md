### 前言

HTML 编码是指在 HTML 文档中使用的字符集。常见的 HTML 编码包括 UTF-8、ISO-8859-1、ISO-8859-15、ISO-2022-JP、Shift_JIS、EUC-JP、GB2312、GBK、Big5、GB18030、UTF-16、UTF-32。

为了正确显示 HTML 页面，Web 浏览器必须知道要使用哪个字符集。

### ASCII

| **ASCII值** | **控制字符** | **ASCII值** | **控制字符** | **ASCII值** | **控制字符** | **ASCII值** | **控制字符** |
| ---------- | -------- | ---------- | -------- | ---------- | -------- | ---------- | -------- |
| 0          | NUT      | 32         | (space)  | 64         | @        | 96         | 、        |
| 1          | SOH      | 33         | !        | 65         | A        | 97         | a        |
| 2          | STX      | 34         | "        | 66         | B        | 98         | b        |
| 3          | ETX      | 35         | #       | 67         | C        | 99         | c        |
| 4          | EOT      | 36         | $       | 68         | D        | 100        | d        |
| 5          | ENQ      | 37         | %        | 69         | E        | 101        | e        |
| 6          | ACK      | 38         | &        | 70         | F        | 102        | f        |
| 7          | BEL      | 39         | ,        | 71         | G        | 103        | g        |
| 8          | BS       | 40         | (        | 72         | H        | 104        | h        |
| 9          | HT       | 41         | )        | 73         | I        | 105        | i        |
| 10         | LF       | 42         | *       | 74         | J        | 106        | j        |
| 11         | VT       | 43         | +       | 75         | K        | 107        | k        |
| 12         | FF       | 44         | ,        | 76         | L        | 108        | l        |
| 13         | CR       | 45         | -       | 77         | M        | 109        | m        |
| 14         | SO       | 46         | .        | 78         | N        | 110        | n        |
| 15         | SI       | 47         | /        | 79         | O        | 111        | o        |
| 16         | DLE      | 48         | 0        | 80         | P        | 112        | p        |
| 17         | DCI      | 49         | 1        | 81         | Q        | 113        | q        |
| 18         | DC2      | 50         | 2        | 82         | R        | 114        | r        |
| 19         | DC3      | 51         | 3        | 83         | S        | 115        | s        |
| 20         | DC4      | 52         | 4        | 84         | T        | 116        | t        |
| 21         | NAK      | 53         | 5        | 85         | U        | 117        | u        |
| 22         | SYN      | 54         | 6        | 86         | V        | 118        | v        |
| 23         | TB       | 55         | 7        | 87         | W        | 119        | w        |
| 24         | CAN      | 56         | 8        | 88         | X        | 120        | x        |
| 25         | EM       | 57         | 9        | 89         | Y        | 121        | y        |
| 26         | SUB      | 58         | :        | 90         | Z        | 122        | z        |
| 27         | ESC      | 59         | ;        | 91         | [       | 123        | {        |
| 28         | FS       | 60         | <        | 92         | \       | 124        | |       |
| 29         | GS       | 61         | =       | 93         | ]        | 125        | }        |
| 30         | RS       | 62         | >       | 94         | ^        | 126        | `       |
| 31         | US       | 63         | ?        | 95         | _       | 127        | DEL      |

| NUL空     | VT 垂直制表   | SYN 空转同步 |
| -------- | --------- | -------- |
| STX 正文开始 | CR 回车     | CAN 作废   |
| ETX 正文结束 | SO 移位输出   | EM 纸尽    |
| EOY 传输结束 | SI 移位输入   | SUB 换置   |
| ENQ 询问字符 | DLE 空格    | ESC 换码   |
| ACK 承认   | DC1 设备控制1 | FS 文字分隔符 |
| BEL 报警   | DC2 设备控制2 | GS 组分隔符  |
| BS 退一格   | DC3 设备控制3 | RS 记录分隔符 |
| HT 横向列表  | DC4 设备控制4 | US 单元分隔符 |
| LF 换行    | NAK 否定    | DEL 删除   |

### 从 ASCII 到 UTF-8

ASCII 是第一个字符编码标准。ASCII 定义了 128 种可以在互联网上使用的字符：数字（0-9）、英文字母（A-Z）和一些特殊字符，比如：! $ + - ( ) @ < >。

ISO-8859-1 是 HTML 4 的默认字符集。此字符集支持 256 个不同的字符代码。HTML 4 同时支持 UTF-8。

ANSI（Windows-1252）是原始的 Windows 字符集。 ANSI 与 ISO-8859-1 相同，不同之处在于 ANSI 具有 32 个额外的字符。

HTML5 规范鼓励 Web 开发人员使用 UTF-8 字符集，该字符集涵盖了世界上几乎所有的字符和符号！

### HTML charset 属性

为了正确显示 HTML 页面，Web 浏览器必须了解页面中使用的字符集。

这在 <meta> 标签中指定：

``` html
<meta charset="UTF-8">
```

### UTF-8 字符集

对于 0 到 127 的值，UTF-8 与 ASCII 相同。

UTF-8 不使用 12 8到 159 之间的值。

对于 160 到 255 之间的值，UTF-8 与 ANSI 和 8859-1 相同。

UTF-8 从值 256 继续，包含超过 10000 个不同字符。