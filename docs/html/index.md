### 什么是HTML？

HTML (HyperText Markup Language) 不是一门编程语言，而是一种用来告知浏览器如何组织页面的标记语言。HTML 可复杂、可简单，一切取决于开发者。它由一系列的**元素（elements）**组成，这些元素可以用来包围不同部分的内容，使其以某种方式呈现或者工作。一对标签（ tags）可以为一段文字或者一张图片添加超链接，将文字设置为斜体，改变字号，等等。例如下面一行内容：

``` html
<p>My cat is very grumpy</p>
```

### 解刨一个HTML元素

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b1ba803e4ec4d86aaffec62bc5bcc94~tplv-k3u1fbpfcp-zoom-1.image)

1、开始标签（Opening tag）：包含元素的名称（本例为 p），被左、右角括号所包围。表示元素从这里开始或者开始起作用 —— 在本例中即段落由此开始。

2、结束标签（Closing tag）：与开始标签相似，只是其在元素名之前包含了一个斜杠。这表示着元素的结尾 —— 在本例中即段落在此结束。初学者常常会犯忘记包含结束标签的错误，这可能会产生一些奇怪的结果。

3、内容（Content）：元素的内容，本例中就是所输入的文本本身。

4、元素（Element）：开始标签、结束标签与内容相结合，便是一个完整的元素。

### 示例代码

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

## DOCTYPE

1.  <!DOCTYPE>说明

<!---->

1.  1.  <!DOCTYPE> 声明位于文档中的最前面的位置，处于 html 标签之前。
    1.  <!DOCTYPE> 声明不是一个 HTML 标签；它是用来告知 Web 浏览器页面使用了哪种 HTML 版本。

<!---->

2.  常见的DOCTYPE声明

``` html
<!DOCTYPE html>
```

``` html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

``` html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

``` html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

``` html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

``` html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

``` html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
```

## HTML 语言代码

``` html
<html lang="en">
  ...
</html>
```

| 语言                        | ISO 代码 |
| :-------------------------: | :------: |
| Abkhazian                 | ab     |
| Afar                      | aa     |
| Afrikaans                 | af     |
| Albanian                  | sq     |
| Amharic                   | am     |
| Arabic                    | ar     |
| Aragonese                 | an     |
| Armenian                  | hy     |
| Assamese                  | as     |
| Aymara                    | ay     |
| Azerbaijani               | az     |
| Bashkir                   | ba     |
| Basque                    | eu     |
| Bengali (Bangla)          | bn     |
| Bhutani                   | dz     |
| Bihari                    | bh     |
| Bislama                   | bi     |
| Breton                    | br     |
| Bulgarian                 | bg     |
| Burmese                   | my     |
| Byelorussian (Belarusian) | be     |
| Cambodian                 | km     |
| Catalan                   | ca     |
| Cherokee                  |        |
| Chewa                     |        |
| Chinese (简体)              | zh     |
| Chinese (繁体)              | zh     |
| Corsican                  | co     |
| Croatian                  | hr     |
| Czech                     | cs     |
| Danish                    | da     |
| Divehi                    |        |
| Dutch                     | nl     |
| Edo                       |        |
| English                   | en     |
| Esperanto                 | eo     |
| Estonian                  | et     |
| Faeroese                  | fo     |
| Farsi                     | fa     |
| Fiji                      | fj     |
| Finnish                   | fi     |
| Flemish                   |        |
| French                    | fr     |
| Frisian                   | fy     |
| Fulfulde                  |        |
| Galician                  | gl     |
| Gaelic (Scottish)         | gd     |
| Gaelic (Manx)             | gv     |
| Georgian                  | ka     |
| German                    | de     |
| Greek                     | el     |
| Greenlandic               | kl     |
| Guarani                   | gn     |
| Gujarati                  | gu     |
| Haitian Creole            | ht     |
| Hausa                     | ha     |
| Hawaiian                  |        |
| Hebrew                    | he, iw |
| Hindi                     | hi     |
| Hungarian                 | hu     |
| Ibibio                    |        |
| Icelandic                 | is     |
| Ido                       | io     |
| Igbo                      |        |
| Indonesian                | id, in |
| Interlingua               | ia     |
| Interlingue               | ie     |
| Inuktitut                 | iu     |
| Inupiak                   | ik     |
| Irish                     | ga     |
| Italian                   | it     |
| Japanese                  | ja     |
| Javanese                  | jv     |
| Kannada                   | kn     |
| Kanuri                    |        |
| Kashmiri                  | ks     |
| Kazakh                    | kk     |
| Kinyarwanda (Ruanda)      | rw     |
| Kirghiz                   | ky     |
| Kirundi (Rundi)           | rn     |
| Konkani                   |        |
| Korean                    | ko     |
| Kurdish                   | ku     |
| Laothian                  | lo     |
| Latin                     | la     |
| Latvian (Lettish)         | lv     |
| Limburgish ( Limburger)   | li     |
| Lingala                   | ln     |
| Lithuanian                | lt     |
| Macedonian                | mk     |
| Malagasy                  | mg     |
| Malay                     | ms     |
| Malayalam                 | ml     |
|                           |        |
| Maltese                   | mt     |
| Maori                     | mi     |
| Marathi                   | mr     |
| Moldavian                 | mo     |
| Mongolian                 | mn     |
| Nauru                     | na     |
| Nepali                    | ne     |
| Norwegian                 | no     |
| Occitan                   | oc     |
| Oriya                     | or     |
| Oromo (Afaan Oromo)       | om     |
| Papiamentu                |        |
| Pashto (Pushto)           | ps     |
| Polish                    | pl     |
| Portuguese                | pt     |
| Punjabi                   | pa     |
| Quechua                   | qu     |
| Rhaeto-Romance            | rm     |
| Romanian                  | ro     |
| Russian                   | ru     |
| Sami (Lappish)            |        |
| Samoan                    | sm     |
| Sangro                    | sg     |
| Sanskrit                  | sa     |
| Serbian                   | sr     |
| Serbo-Croatian            | sh     |
| Sesotho                   | st     |
| Setswana                  | tn     |
| Shona                     | sn     |
| Sichuan Yi                | ii     |
| Sindhi                    | sd     |
| Sinhalese                 | si     |
| Siswati                   | ss     |
| Slovak                    | sk     |
| Slovenian                 | sl     |
| Somali                    | so     |
| Spanish                   | es     |
| Sundanese                 | su     |
| Swahili (Kiswahili)       | sw     |
| Swedish                   | sv     |
| Syriac                    |        |
| Tagalog                   | tl     |
| Tajik                     | tg     |
| Tamazight                 |        |
| Tamil                     | ta     |
| Tatar                     | tt     |
| Telugu                    | te     |
| Thai                      | th     |
| Tibetan                   | bo     |
| Tigrinya                  | ti     |
| Tonga                     | to     |
| Tsonga                    | ts     |
| Turkish                   | tr     |
| Turkmen                   | tk     |
| Twi                       | tw     |
| Uighur                    | ug     |
| Ukrainian                 | uk     |
| Urdu                      | ur     |
| Uzbek                     | uz     |
| Venda                     |        |
| Vietnamese                | vi     |
| Volapük                   | vo     |
| Wallon                    | wa     |
| Welsh                     | cy     |
| Wolof                     | wo     |
| Xhosa                     | xh     |
| Yi                        |        |
| Yiddish                   | yi, ji |
| Yoruba                    | yo     |
| Zulu                      | zu     |

## head标签

1.  head 元素是所有头部元素的容器。
1.  head 元素必须包含文档的标题（title），可以包含脚本、样式、meta 信息 以及其他更多的信息。

``` html
<!--   以下列出的元素能被用在 <head> 元素内部 -->
<head>
  <title> 在头部中，这个元素是必须的 </title>
	<link />
  <meta />
  <base />
  <script></script>
  <noscript></noscript>
  <style></style>
</head>
```

## meta标签

1.  描述HTML文档的元数据

``` html
<head>
	<!--  定义页面描述  -->
  <meta name="description" content="免费在线教程">
	<!--  定义文档肝尖刺，用于搜索引擎  -->
  <meta name="keywords" content="HTML,CSS,XML,JavaScript">
	<!--   定义页面作者   -->
  <meta name="author" content="runoob">
	<!--   定义文档的字符编码   -->
  <meta charset="UTF-8">
	<!--  定义每30s刷新一次页面  -->
  <meta http-equiv="refresh" content="30">
</head>
```

## title标签

title 标签定义文档的标题，在所有 HTML 文档中是必需的。

## body标签

1.  body 标签定义文档的主体。
1.  body 元素包含文档的所有内容（比如文本、超链接、图像、表格和列表等等）。

### 块元素和内联元素

|      | 占位情况          | 宽高                  | 边距                           |
| ---- | ------------- | ------------------- | ---------------------------- |
| 行内元素 | 与其它元素在一行      | 不可设                 | 水平方向的margin,padding有用，竖直方向没用 |
| 块元素  | 独占一行，默认垂直向下排列 | 可设置宽高，没有设置宽时，默认100% | margin,pading水平，竖直方向都可以      |

## 块元素转换

``` json
转换为行内元素：display：inline

转换为块内元素：display：block

转换为行内块元素：display：inline-block
```

## 常见的行内元素

``` html
<span>、<a>、 <img>、 <input>、<textarea>、<select>、<label>
<br>  、<b>、 <strong>、<sup> 、<sub>、 <i> 、<em> 、<del> 、 <u>
```

## 常见的块元素

``` html
<div>、<table>、<form>、<p>、<ul> <h1>......<h6>、<hr>  、<pre>、<address>、<center>、<marquee> 、<blockquote>
```

### 嵌套标签

1.  标签可以标签里，称为嵌套。
1.  一般用块元素标签嵌套块元素标签或者行内元素标签

``` html
<div>
  <div>内容</div>
</div>
```

### 属性

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa4babcc550d400286697e9123c89ad0~tplv-k3u1fbpfcp-zoom-1.image)

属性包含元素的额外信息，这些信息不会出现在实际的内容中。在上述例子中，这个 class 属性给元素赋了一个识别的名字（id），这个名字此后可以被用来识别此元素的样式信息和其他信息。

一个属性必须包含如下内容：

1.  一个空格，在属性和元素名称之间（如果已经有一个或多个属性，就与前一个属性之间有一个空格）。
1.  属性名称，后面跟着一个等于号。
1.  一个属性值，由一对引号 ("") 引起来。
