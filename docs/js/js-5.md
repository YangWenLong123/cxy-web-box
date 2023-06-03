#### 反斜杠转移字符

```
let str = 'ss'\dddd''

console.log(str);	//	ss'\dddd'
```

| \'  | 一个单撇号（'）           | 输出单撇号字符'           |
| ---- | ------------------ | ------------------ |
| \'' | 一个双撇号（"）           | 输出双撇号字符"           |
| \?  | 一个人问号（?            | 输出问号字符?            |
| \\ | 一个反斜杠（\）           | 输出反斜杠字符\          |
| \a   | 警告（alert）          | 产生声音或视觉信号          |
| \b   | 退格（backspace）      | 将光标当前位置后退一个字符      |
| \f   | 换页（from feed）      | 将光标当前位置移到下一页的开头    |
| \n   | 换行                 | 将光标当前位置移到下一行的开头    |
| \r   | 回车（carriagereturn） | 将光标当前位置移到本行的开头     |
| \t   | 水平制表符              | 将光标当前位置移到下一个Tab位置  |
| \v   | 垂直制表符              | 将光标当前位置移到下一个垂直表对齐点 |

#### 数学符号

| 字符                        | 十进制     | 转义字符    |
| ------------------------- | ------- | ------- |
| "                         | &#34;  | &quot; |
| &                         | &#38;  | &amp;  |
| <                         | &#60;  | &lt;   |
| >                        | &#62;  | &gt;   |
| 不断开空格(non-breaking space) | &#160; | &nbsp; |

| 字符   | 十进制     | 转义字符      | 字符       | 十进制     | 转义字符      | 字符 | 十进制     | 转义字符      |
| ---- | ------- | --------- | -------- | ------- | --------- | -- | ------- | --------- |
| ?    | &#161; | &iexcl;  | Á        | &#193; | &Aacute; | á  | &#225; | &aacute; |
| ￠    | &#162; | &cent;   | Â        | &#194; | &circ;   | â  | &#226  | &acirc;  |
| ￡    | &#163; | &pound;  | Ã        | &#195; | &Atilde; | ã  | &#227; | &atilde; |
| ¤    | &#164; | &curren; | Ä        | &#196; | &Auml    | ä  | &#228; | &auml;   |
| ￥    | &#165; | &yen;    | Å        | &#197; | &ring;   | å  | &#229; | &aring;  |
| |   | &#166; | &brvbar; | Æ        | &#198; | &AElig;  | æ  | &#230; | &aelig;  |
| §    | &#167; | &sect;   | Ç        | &#199; | &Ccedil; | ç  | &#231; | &ccedil; |
| ¨    | &#168; | &uml;    | È        | &#200; | &Egrave; | è  | &#232; | &egrave; |
| ©    | &#169; | &copy;   | É        | &#201; | &Eacute; | é  | &#233; | &eacute; |
| a    | &#170; | &ordf;   | Ê        | &#202; | &Ecirc;  | ê  | &#234; | &ecirc;  |
| ?    | &#171; | &laquo;  | Ë        | &#203; | &Euml;   | ë  | &#235; | &euml;   |
| ?    | &#172; | &not;    | Ì        | &#204; | &Igrave; | ì  | &#236; | &igrave; |
| /x7f | &#173; | &shy;    | Í        | &#205; | &Iacute; | í  | &#237; | &iacute; |
| ®    | &#174; | &reg;    | Î        | &#206; | &Icirc;  | î  | &#238; | &icirc;  |
| ˉ    | &#175; | &macr;   | Ï        | &#207; | &Iuml;   | ï  | &#239; | &iuml;   |
| °    | &#176; | &deg;    | Ð        | &#208; | &ETH;    | ð  | &#240; | &ieth;   |
| ±    | &#177; | &plusmn; | Ñ        | &#209; | &Ntilde; | ñ  | &#241; | &ntilde; |
| 2    | &#178; | &sup2;   | Ò        | &#210; | &Ograve; | ò  | &#242; | &ograve; |
| 3    | &#179; | &sup3;   | Ó        | &#211; | &Oacute; | ó  | &#243; | &oacute; |
| ′    | &#180; | &acute;  | Ô        | &#212; | &Ocirc;  | ô  | &#244; | &ocirc;  |
| μ    | &#181; | &micro;  | Õ        | &#213; | &Otilde; | õ  | &#245; | &otilde; |
| ?    | &#182; | &para;   | Ö        | &#214; | &Ouml;   | ö  | &#246; | &ouml;   |
| ·    | &#183; | &middot; | &times; | &#215; | &times;  | ÷  | &#247; | &divide; |
| ?    | &#184; | &cedil;  | Ø        | &#216; | &Oslash; | ø  | &#248; | &oslash; |
| 1    | &#185; | &sup1;   | Ù        | &#217; | &Ugrave; | ù  | &#249; | &ugrave; |
| o    | &#186; | &ordm;   | Ú        | &#218; | &Uacute; | ú  | &#250; | &uacute; |
| ?    | &#187; | &raquo;  | Û        | &#219; | &Ucirc;  | û  | &#251; | &ucirc;  |
| ?    | &#188; | &frac14; | Ü        | &#220; | &Uuml;   | ü  | &#252; | &uuml;   |
| ?    | &#189; | &frac12; | Ý        | &#221; | &Yacute; | ý  | &#253; | &yacute; |
| ?    | &#190; | &frac34; | Þ        | &#222; | &THORN;  | þ  | &#254; | &thorn;  |
| ?    | &#191; | &iquest; | ß        | &#223; | &szlig;  | ÿ  | &#255; | &yuml;   |
| À    | &#192; | &Agrave; | à        | &#224; | &agrave; |    |         |           |

#### 表情符号

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63d5c8e84e284b74982de0c51f7fd657~tplv-k3u1fbpfcp-zoom-1.image)

```
<p style="font-size:100px">&#128540;</p>
```

| 字符 | 十进制    | 十六进制  | 实体 | 名称                                                   |
| -- | ------ | ----- | -- | ---------------------------------------------------- |
| 😀 | 128512 | 1F600 |    | GRINNING FACE                                        |
| 😁 | 128513 | 1F601 |    | GRINNING FACE WITH SMILING EYES                      |
| 😂 | 128514 | 1F602 |    | FACE WITH TEARS OF JOY                               |
| 😃 | 128515 | 1F603 |    | SMILING FACE WITH OPEN MOUTH                         |
| 😄 | 128516 | 1F604 |    | SMILING FACE WITH OPEN MOUTH AND SMILING EYES        |
| 😅 | 128517 | 1F605 |    | SMILING FACE WITH OPEN MOUTH AND COLD SWEAT          |
| 😆 | 128518 | 1F606 |    | SMILING FACE WITH OPEN MOUTH AND TIGHTLY-CLOSED EYES |
| 😇 | 128519 | 1F607 |    | SMILING FACE WITH HALO                               |
| 😈 | 128520 | 1F608 |    | SMILING FACE WITH HORNS                              |
| 😉 | 128521 | 1F609 |    | WINKING FACE                                         |
| 😊 | 128522 | 1F60A |    | SMILING FACE WITH SMILING EYES                       |
| 😋 | 128523 | 1F60B |    | FACE SAVOURING DELICIOUS FOOD                        |
| 😌 | 128524 | 1F60C |    | RELIEVED FACE                                        |
| 😍 | 128525 | 1F60D |    | SMILING FACE WITH HEART-SHAPED EYES                  |
| 😎 | 128526 | 1F60E |    | SMILING FACE WITH SUNGLASSES                         |
| 😏 | 128527 | 1F60F |    | SMIRKING FACE                                        |
| 😐 | 128528 | 1F610 |    | NEUTRAL FACE                                         |
| 😑 | 128529 | 1F611 |    | EXPRESSIONLESS FACE                                  |
| 😒 | 128530 | 1F612 |    | UNAMUSED FACE                                        |
| 😓 | 128531 | 1F613 |    | FACE WITH COLD SWEAT                                 |
| 😔 | 128532 | 1F614 |    | PENSIVE FACE                                         |
| 😕 | 128533 | 1F615 |    | CONFUSED FACE                                        |
| 😖 | 128534 | 1F616 |    | CONFOUNDED FACE                                      |
| 😗 | 128535 | 1F617 |    | KISSING FACE                                         |
| 😘 | 128536 | 1F618 |    | FACE THROWING A KISS                                 |
| 😙 | 128537 | 1F619 |    | KISSING FACE WITH SMILING EYES                       |
| 😚 | 128538 | 1F61A |    | KISSING FACE WITH CLOSED EYES                        |
| 😛 | 128539 | 1F61B |    | FACE WITH STUCK-OUT TONGUE                           |
| 😜 | 128540 | 1F61C |    | FACE WITH STUCK-OUT TONGUE AND WINKING EYE           |
| 😝 | 128541 | 1F61D |    | FACE WITH STUCK-OUT TONGUE AND TIGHTLY-CLOSED EYES   |
| 😞 | 128542 | 1F61E |    | DISAPPOINTED FACE                                    |
| 😟 | 128543 | 1F61F |    | WORRIED FACE                                         |
| 😠 | 128544 | 1F620 |    | ANGRY FACE                                           |
| 😡 | 128545 | 1F621 |    | POUTING FACE                                         |
| 😢 | 128546 | 1F622 |    | CRYING FACE                                          |
| 😣 | 128547 | 1F623 |    | PERSEVERING FACE                                     |
| 😤 | 128548 | 1F624 |    | FACE WITH LOOK OF TRIUMPH                            |
| 😥 | 128549 | 1F625 |    | DISAPPOINTED BUT RELIEVED FACE                       |
| 😦 | 128550 | 1F626 |    | FROWNING FACE WITH OPEN MOUTH                        |
| 😧 | 128551 | 1F627 |    | ANGUISHED FACE                                       |
| 😨 | 128552 | 1F628 |    | FEARFUL FACE                                         |
| 😩 | 128553 | 1F629 |    | WEARY FACE                                           |
| 😪 | 128554 | 1F62A |    | SLEEPY FACE                                          |
| 😫 | 128555 | 1F62B |    | TIRED FACE                                           |
| 😬 | 128556 | 1F62C |    | GRIMACING FACE                                       |
| 😭 | 128557 | 1F62D |    | LOUDLY CRYING FACE                                   |
| 😮 | 128558 | 1F62E |    | FACE WITH OPEN MOUTH                                 |
| 😯 | 128559 | 1F62F |    | HUSHED FACE                                          |
| 😰 | 128560 | 1F630 |    | FACE WITH OPEN MOUTH AND COLD SWEAT                  |
| 😱 | 128561 | 1F631 |    | FACE SCREAMING IN FEAR                               |
| 😲 | 128562 | 1F632 |    | ASTONISHED FACE                                      |
| 😳 | 128563 | 1F633 |    | FLUSHED FACE                                         |
| 😴 | 128564 | 1F634 |    | SLEEPING FACE                                        |
| 😵 | 128565 | 1F635 |    | DIZZY FACE                                           |
| 😶 | 128566 | 1F636 |    | FACE WITHOUT MOUTH                                   |
| 😷 | 128567 | 1F637 |    | FACE WITH MEDICAL MASK                               |
| 🙁 | 128577 | 1F641 |    |                                                      |
| 🙂 | 128578 | 1F642 |    |                                                      |
| 🙃 | 128579 | 1F643 |    |                                                      |
| 🙄 | 128580 | 1F644 |    |                                                      |
| 🤐 | 129296 | 1F910 |    |                                                      |
| 🤑 | 129297 | 1F911 |    |                                                      |
| 🤒 | 129298 | 1F912 |    |                                                      |
| 🤓 | 129299 | 1F913 |    |                                                      |
| 🤔 | 129300 | 1F914 |    |                                                      |
| 🤕 | 129301 | 1F915 |    |                                                      |
| 🤠 | 129312 | 1F920 |    |                                                      |
| 🤡 | 129313 | 1F921 |    |                                                      |
| 🤢 | 129314 | 1F922 |    |                                                      |
| 🤣 | 129315 | 1F923 |    |                                                      |
| 🤤 | 129316 | 1F924 |    |                                                      |
| 🤥 | 129317 | 1F925 |    |                                                      |
| 🤧 | 129319 | 1F927 |    |                                                      |
| 🤨 | 129320 | 1F928 |    |                                                      |
| 🤩 | 129321 | 1F929 |    |                                                      |
| 🤪 | 129322 | 1F92A |    |                                                      |
| 🤫 | 129323 | 1F92B |    |                                                      |
| 🤬 | 129324 | 1F92C |    |                                                      |
| 🤭 | 129325 | 1F92D |    |                                                      |
| 🤮 | 129326 | 1F92E |    |                                                      |
| 🤯 | 129327 | 1F92F |    |                                                      |
| 🧐 | 129488 | 1F9D0 |    |                                                      |

#### 资源

[符号大全](http://www.fhdq.net/emoji/emojifuhao.html)