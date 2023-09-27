# 内容安全策略（CSP）

**内容安全策略**（[CSP](https://developer.mozilla.org/zh-CN/docs/Glossary/CSP)）是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本（[XSS](https://developer.mozilla.org/zh-CN/docs/Glossary/Cross-site_scripting)）和数据注入攻击等。无论是数据盗取、网站内容污染还是恶意软件分发，这些攻击都是主要的手段。

CSP 被设计成完全向后兼容（除 CSP2 在向后兼容有明确提及的不一致; 更多细节查看[这里](https://www.w3.org/TR/CSP2)  章节 1.1）。不支持 CSP 的浏览器也能与实现了 CSP 的服务器正常工作，反之亦然：不支持 CSP 的浏览器只会忽略它，如常运行，默认为网页内容使用标准的同源策略。如果网站不提供 CSP 标头，浏览器也使用标准的[同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)。

为使 CSP 可用，你需要配置你的网络服务器返回  [`Content-Security-Policy`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy) HTTP 标头（有时你会看到  `X-Content-Security-Policy`  标头，但那是旧版本，并且你无须再如此指定它）。

HTMLCopy to Clipboard

```
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src https://*; child-src 'none';" />
```

**备注：**   某些功能（例如发送 CSP 违规报告）仅在使用 HTTP 标头时可用。

## [威胁](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E5%A8%81%E8%83%81)

### [缓解跨站脚本攻击](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E7%BC%93%E8%A7%A3%E8%B7%A8%E7%AB%99%E8%84%9A%E6%9C%AC%E6%94%BB%E5%87%BB)

CSP 的主要目标是减少和报告 XSS 攻击。XSS 攻击利用了浏览器对于从服务器所获取的内容的信任。恶意脚本在受害者的浏览器中得以运行，因为浏览器信任其内容来源，即使有的时候这些脚本并非来自于它本该来的地方。

CSP 通过指定有效域——即浏览器认可的可执行脚本的有效来源——使服务器管理者有能力减少或消除 XSS 攻击所依赖的载体。一个 CSP 兼容的浏览器将会仅执行从白名单域获取到的脚本文件，忽略所有的其他脚本（包括内联脚本和 HTML 的事件处理属性）。

作为一种终极防护形式，始终不允许执行脚本的站点可以选择全面禁止脚本执行。

### [缓解数据包嗅探攻击](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E7%BC%93%E8%A7%A3%E6%95%B0%E6%8D%AE%E5%8C%85%E5%97%85%E6%8E%A2%E6%94%BB%E5%87%BB)

除限制可以加载内容的域，服务器还可指明哪种协议允许使用；比如（从理想化的安全角度来说），服务器可指定所有内容必须通过 HTTPS 加载。一个完整的数据安全传输策略不仅强制使用 HTTPS 进行数据传输，也为所有的  [cookie 标记  `secure`  标识](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)，并且提供自动的重定向使得 HTTP 页面导向 HTTPS 版本。网站也可以使用  [`Strict-Transport-Security`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Strict-Transport-Security) HTTP 标头确保连接它的浏览器只使用加密通道。

## [使用 CSP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E4%BD%BF%E7%94%A8_csp)

配置内容安全策略涉及到添加  [`Content-Security-Policy`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy) HTTP 标头到一个页面，并配置相应的值，以控制用户代理（浏览器等）可以为该页面获取哪些资源。比如一个可以上传文件和显示图片页面，应该允许图片来自任何地方，但限制表单的 action 属性只可以赋值为指定的端点。一个经过恰当设计的内容安全策略应该可以有效的保护页面免受跨站脚本攻击。本文阐述如何恰当的构造这样的标头，并提供了一些例子。

### [制定策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E5%88%B6%E5%AE%9A%E7%AD%96%E7%95%A5)

你可以使用  [`Content-Security-Policy`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy) HTTP 标头来指定你的策略，像这样：

HTTPCopy to Clipboard

```
Content-Security-Policy: policy
```

策略（policy）参数是一个包含了各种描述你的 CSP 策略指令的字符串。

### [编写策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E7%BC%96%E5%86%99%E7%AD%96%E7%95%A5)

策略由一系列策略指令所组成，每个策略指令都描述了针对某个特定资源的类型以及策略生效的范围。你的策略应当包含一个  [`default-src`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/default-src)  策略指令，在其他资源类型没有符合自己的策略时应用该策略（有关完整列表，请查看  [`default-src`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/default-src)  指令的描述）。一个策略可以包含  [`default-src`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/default-src)  或者  [`script-src` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src "Currently only available in English (US)")  指令来防止内联脚本运行，并杜绝  `eval()`  的使用。一个策略也可包含一个  [`default-src`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/default-src)  或  [`style-src` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src "Currently only available in English (US)")  指令去限制来自一个  `<style>`  元素或者  `style`  属性的內联样式。对于不同类型的项目都有特定的指令，因此每种类型都可以有自己的指令，包括字体、frame、图像、音频和视频媒体、script 和 worker。

## [示例：常见用例](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E7%A4%BA%E4%BE%8B%EF%BC%9A%E5%B8%B8%E8%A7%81%E7%94%A8%E4%BE%8B)

这一部分提供了一些常用的安全策略方案示例。

### [示例 1](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E7%A4%BA%E4%BE%8B_1)

一个网站管理者想要所有内容均来自站点的同一个源（不包括其子域名）。

HTTPCopy to Clipboard

```
Content-Security-Policy: default-src 'self'
```

### [示例 2](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E7%A4%BA%E4%BE%8B_2)

一个网站管理者允许内容来自信任的域名及其子域名（域名不必须与 CSP 设置所在的域名相同）。

HTTPCopy to Clipboard

```
Content-Security-Policy: default-src 'self' *.trusted.com
```

### [示例 3](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E7%A4%BA%E4%BE%8B_3)

一个网站管理者允许网页应用的用户在他们自己的内容中包含来自任何源的图片，但是限制音频或视频需从信任的资源提供者，所有脚本必须从特定主机服务器获取可信的代码。

HTTPCopy to Clipboard

```
Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com
```

在这里，各种内容默认仅允许从文档所在的源获取，但存在如下例外：

- 图片可以从任何地方加载 (注意“\*”通配符)。
- 多媒体文件仅允许从 media1.com 和 media2.com 加载（不允许从这些站点的子域名）。
- 可运行脚本仅允许来自于 userscripts.example.com。

### [示例 4](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E7%A4%BA%E4%BE%8B_4)

一个线上银行网站的管理者想要确保网站的所有内容都要通过 SSL 方式获取，以避免攻击者窃听用户发出的请求。

HTTPCopy to Clipboard

```
Content-Security-Policy: default-src https://onlinebanking.jumbobank.com
```

该服务器仅允许通过 HTTPS 方式并仅从 onlinebanking.jumbobank.com 域名来访问文档。

### [示例 5](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E7%A4%BA%E4%BE%8B_5)

一个在线邮箱的管理者想要允许在邮件里包含 HTML，同样图片允许从任何地方加载，但不允许 JavaScript 或者其他潜在的危险内容（从任意位置加载）。

HTTPCopy to Clipboard

```
Content-Security-Policy: default-src 'self' *.mailsite.com; img-src *
```

注意这个示例并未指定  [`script-src` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src "Currently only available in English (US)")；在此 CSP 示例中，站点通过  [`default-src`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/default-src)  指令的对其进行配置，这也同样意味着脚本文件仅允许从原始服务器获取。

## [对策略进行测试](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E5%AF%B9%E7%AD%96%E7%95%A5%E8%BF%9B%E8%A1%8C%E6%B5%8B%E8%AF%95)

为降低部署成本，CSP 可以部署为仅报告（report-only）模式。在此模式下，CSP 策略不是强制性的，但是任何违规行为将会报告给一个指定的 URI 地址。此外，仅报告标头可以用来测试对策略未来的修订，而不用实际部署它。

你可以用  [`Content-Security-Policy-Report-Only`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only) HTTP 标头来指定你的策略，像这样：

HTTPCopy to Clipboard

```
Content-Security-Policy-Report-Only: policy
```

如果  [`Content-Security-Policy-Report-Only`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only)  标头和  [`Content-Security-Policy`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy)  同时出现在一个响应中，两个策略均有效。在  `Content-Security-Policy`  标头中指定的策略有强制性，而  `Content-Security-Policy-Report-Only`  中的策略仅产生报告而不具有强制性。

支持 CSP 的浏览器将始终对于每个企图违反你所建立的策略都发送违规报告，如果策略里包含一个有效的[`report-uri` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/report-uri "Currently only available in English (US)")  指令。

## [启用报告](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E5%90%AF%E7%94%A8%E6%8A%A5%E5%91%8A)

默认情况下，违规报告并不会发送。为启用发送违规报告，你需要指定  [`report-to`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/report-to)  策略指令，并提供至少一个 URI 地址去递交报告：

HTTPCopy to Clipboard

```
Content-Security-Policy: default-src 'self'; report-uri http://reportcollector.example.com/collector.cgi
```

然后你需要设置你的服务器能够接收报告；使其能够以你认为恰当的方式存储并处理这些报告。

## [违规报告的语法](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E8%BF%9D%E8%A7%84%E6%8A%A5%E5%91%8A%E7%9A%84%E8%AF%AD%E6%B3%95)

作为报告的 JSON 对象和  `application/csp-report` [`Content-Type`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type)  一起发送，并包含了以下数据：

- `blocked-uri`

  被 CSP 阻止的资源 URI。如果被阻止的 URI 来自不同的源而非  `document-uri`，那么被阻止的资源 URI 会被删减，仅保留协议、主机和端口号。

- `disposition`

  根据  [`Content-Security-Policy-Report-Only`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only)  和  `Content-Security-Policy`  标头使用情况的不同，值为  `"enforce"`  或  `"report"`。

- `document-uri`

  发生违规的文档的 URI。

- `effective-directive`

  导致违规行为发生的指令。一些浏览器可能提供不同的值，例如 Chrome 提供  `style-src-elem`  或  `style-src-attr`，即使实际执行的指令是  `style-src`。

- `original-policy`

  由  `Content-Security-Policy` HTTP 标头指定的原始策略值。

- `referrer`  已弃用   非标准

  违规发生处的文档引用（地址）。

- `script-sample`

  导致该违规的内联代码、事件处理器或样式的前 40 个字符。只适用于  `script-src*`  或  `style-src*`  包含  `'report-sample'`  的情况。

- `status-code`

  全局对象被实例化的资源的 HTTP 状态代码。

- `violated-directive`  已弃用

  导致违反策略的指令。`violated-directive`  是  `effective-directive`  字段的历史名称，并包含相同的值。

## [违规报告的样本](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E8%BF%9D%E8%A7%84%E6%8A%A5%E5%91%8A%E7%9A%84%E6%A0%B7%E6%9C%AC)

我们假设页面位于  `http://example.com/signup.html`。它使用如下策略，该策略禁止任何资源的加载，除了来自  `cdn.example.com`  的样式表。

HTTPCopy to Clipboard

```
Content-Security-Policy: default-src 'none'; style-src cdn.example.com; report-uri /_/csp-reports
```

`signup.html`  的 HTML 像这样：

HTMLCopy to Clipboard

```
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <title>Sign Up</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    Here be content.
  </body>
</html>
```

你能看出其中错误吗？这里仅允许加载自  `cdn.example.com`  的样式表，然而该页面企图从自己的源（`http://example.com`）加载。当该文档被访问时，一个兼容 CSP 的浏览器将以 POST 请求的形式发送违规报告到  `http://example.com/_/csp-reports`，内容如下：

JSONCopy to Clipboard

```
{
  "csp-report": {
    "blocked-uri": "http://example.com/css/style.css",
    "disposition": "report",
    "document-uri": "http://example.com/signup.html",
    "effective-directive": "style-src-elem",
    "original-policy": "default-src 'none'; style-src cdn.example.com; report-to /_/csp-reports",
    "referrer": "",
    "status-code": 200,
    "violated-directive": "style-src-elem"
  }
}
```

如你所见，该报告在  `blocked-uri`  字段中包含了违规资源的完整路径，但情况并非总是如此。比如，当  `signup.html`  试图从  `http://anothercdn.example.com/stylesheet.css`  加载 CSS 时，浏览器将*不会*包含完整路径，而只会保留源路径（`http://anothercdn.example.com`）。CSP 技术规范小组对此古怪行为给出了[解释](https://www.w3.org/TR/CSP/#violation-reports)。大体上说，这样是为了防止泄露跨源资源的敏感信息。

## [浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FCSP&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60http.headers.Content-Security-Policy%60%0A*+Report+started%3A+2023-09-26T07%3A11%3A15.592Z%0A%0A%3C%2Fdetails%3E&title=http.headers.Content-Security-Policy+-+%3CSUMMARIZE+THE+PROBLEM%3E&template=data-problem.yml "Report an issue with this compatibility data")

|                                                                                                                                                        | desktop                      | mobile                |                          |                              |                         |                              |                          |                              |                         |                         |                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- | --------------------- | ------------------------ | ---------------------------- | ----------------------- | ---------------------------- | ------------------------ | ---------------------------- | ----------------------- | ----------------------- | ---------------------------- |
|                                                                                                                                                        | Chrome                       | Edge                  | Firefox                  | Opera                        | Safari                  | Chrome Android               | Firefox for Android      | Opera Android                | Safari on iOS           | Samsung Internet        | WebView Android              |
| `Content-Security-Policy`                                                                                                                              | 25more\*\*Toggle history     | 14Toggle history      | 23more\*\*Toggle history | 15Toggle history             | 7more\*\*Toggle history | YesToggle history            | 23Toggle history         | YesToggle history            | 7more\*\*Toggle history | YesToggle history       | YesToggle history            |
| [`base-uri`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/base-uri)                                               | 40Toggle history             | 79Toggle history      | 35Toggle history         | 27Toggle history             | 10Toggle history        | YesToggle history            | 35Toggle history         | YesToggle history            | 9.3Toggle history       | YesToggle history       | YesToggle history            |
| [`block-all-mixed-content`Deprecated](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/block-all-mixed-content)       | YesToggle history            | 79Toggle history      | 48Toggle history         | YesToggle history            | ?Toggle history         | YesToggle history            | 48Toggle history         | YesToggle history            | ?Toggle history         | YesToggle history       | YesToggle history            |
| [`child-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/child-src)                                             | 40Toggle history             | 15Toggle history      | 45Toggle history         | 27Toggle history             | 10Toggle history        | YesToggle history            | 45Toggle history         | YesToggle history            | 9.3Toggle history       | YesToggle history       | YesToggle history            |
| [`connect-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/connect-src)                                         | 25Toggle history             | 14Toggle history      | 50more\*\*Toggle history | 15Toggle history             | 7Toggle history         | YesToggle history            | 23Toggle history         | YesToggle history            | 7Toggle history         | YesToggle history       | YesToggle history            |
| [`default-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/default-src)                                         | 25Toggle history             | 14Toggle history      | 23Toggle history         | 15Toggle history             | 7Toggle history         | YesToggle history            | 23Toggle history         | YesToggle history            | 7Toggle history         | YesToggle history       | YesToggle history            |
| [`font-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/font-src)                                               | 25Toggle history             | 14Toggle history      | 23Toggle history         | 15Toggle history             | 7Toggle history         | YesToggle history            | 23Toggle history         | YesToggle history            | 7Toggle history         | YesToggle history       | YesToggle history            |
| [`form-action`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/form-action)                                         | 40Toggle history             | 15Toggle history      | 36Toggle history         | 27Toggle history             | 10Toggle history        | YesToggle history            | 36Toggle history         | YesToggle history            | 9.3Toggle history       | YesToggle history       | YesToggle history            |
| [`frame-ancestors`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors)                                 | 40Toggle history             | 15Toggle history      | 58more\*\*Toggle history | 26Toggle history             | 10Toggle history        | YesToggle history            | 58more\*\*Toggle history | YesToggle history            | 9.3Toggle history       | YesToggle history       | YesToggle history            |
| [`frame-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-src)                                             | 25Toggle history             | 14Toggle history      | 23Toggle history         | 15Toggle history             | 7Toggle history         | YesToggle history            | 23Toggle history         | YesToggle history            | 7Toggle history         | YesToggle history       | YesToggle history            |
| [`img-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/img-src)                                                 | 25Toggle history             | 14Toggle history      | 23Toggle history         | 15Toggle history             | 7Toggle history         | YesToggle history            | 23Toggle history         | YesToggle history            | 7Toggle history         | YesToggle history       | YesToggle history            |
| [`manifest-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/manifest-src)                                       | YesToggle history            | 79Toggle history      | 41Toggle history         | YesToggle history            | NoToggle history        | YesToggle history            | 41Toggle history         | YesToggle history            | NoToggle history        | YesToggle history       | YesToggle history            |
| [`media-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/media-src)                                             | 25Toggle history             | 14Toggle history      | 23Toggle history         | 15Toggle history             | 7Toggle history         | YesToggle history            | 23Toggle history         | YesToggle history            | 7Toggle history         | YesToggle history       | YesToggle history            |
| `<meta>` support                                                                                                                                       | YesToggle history            | 18Toggle history      | 45Toggle history         | YesToggle history            | YesToggle history       | YesToggle history            | 45Toggle history         | YesToggle history            | YesToggle history       | YesToggle history       | YesToggle history            |
| [`object-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/object-src)                                           | 25Toggle history             | 14Toggle history      | 23Toggle history         | 15Toggle history             | 7Toggle history         | YesToggle history            | 23Toggle history         | YesToggle history            | 7Toggle history         | YesToggle history       | YesToggle history            |
| [`plugin-types`DeprecatedNon-standard](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/plugin-types)                 | 40 – 89Toggle history        | 15 – 89Toggle history | NoToggle history         | 27 – 75Toggle history        | 10Toggle history        | NoToggle history             | NoToggle history         | NoToggle history             | 9.3Toggle history       | NoToggle history        | NoToggle history             |
| [`prefetch-src`DeprecatedNon-standard](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/prefetch-src)                 | NoToggle history             | NoToggle history      | NoToggle history         | NoToggle history             | NoToggle history        | NoToggle history             | NoToggle history         | NoToggle history             | NoToggle history        | NoToggle history        | NoToggle history             |
| [`referrer`DeprecatedNon-standard](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/referrer)                         | 33 – 55Toggle history        | NoToggle history      | 37 – 61Toggle history    | 20 – 42Toggle history        | NoToggle history        | 33 – 55Toggle history        | 37 – 61Toggle history    | 20 – 42Toggle history        | NoToggle history        | 2.0 – 5.4Toggle history | 4.4.3 – 55Toggle history     |
| `report-sample`                                                                                                                                        | 59Toggle history             | 79Toggle history      | ?Toggle history          | 46Toggle history             | 15.4Toggle history      | 59Toggle history             | ?Toggle history          | 43Toggle history             | 15.4Toggle history      | 7.0Toggle history       | 59Toggle history             |
| [`report-to`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/report-to)                                             | 70Toggle history             | 79Toggle history      | NoToggle history         | 57Toggle history             | NoToggle history        | 70Toggle history             | NoToggle history         | 49Toggle history             | NoToggle history        | 10.0Toggle history      | 70Toggle history             |
| [`report-uri`Deprecated](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/report-uri)                                 | 25Toggle history             | 14Toggle history      | 23Toggle history         | 15Toggle history             | 7Toggle history         | YesToggle history            | 23Toggle history         | YesToggle history            | 7Toggle history         | YesToggle history       | YesToggle history            |
| [`require-trusted-types-for`Experimental](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/require-trusted-types-for) | 83Toggle history             | 83Toggle history      | NoToggle history         | 69Toggle history             | NoToggle history        | 83Toggle history             | NoToggle history         | 59Toggle history             | NoToggle history        | 13.0Toggle history      | 83Toggle history             |
| [`sandbox`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/sandbox)                                                 | 25Toggle history             | 14Toggle history      | 50Toggle history         | 15Toggle history             | 7Toggle history         | YesToggle history            | 50Toggle history         | YesToggle history            | 7Toggle history         | YesToggle history       | YesToggle history            |
| [`script-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src)                                           | 25Toggle history             | 14Toggle history      | 23Toggle history         | 15Toggle history             | 7Toggle history         | YesToggle history            | 23Toggle history         | YesToggle history            | 7Toggle history         | YesToggle history       | YesToggle history            |
| External scripts with hash                                                                                                                             | 59Toggle history             | 79Toggle history      | 116Toggle history        | 46Toggle history             | 15.6Toggle history      | 59Toggle history             | 116Toggle history        | 43Toggle history             | 15.6Toggle history      | 7.0Toggle history       | 59Toggle history             |
| Source expression allowing WebAssembly execution                                                                                                       | 97Toggle history             | 97Toggle history      | 102Toggle history        | 83Toggle history             | 16Toggle history        | 97Toggle history             | 102Toggle history        | 68Toggle history             | 16Toggle history        | 18.0Toggle history      | 97Toggle history             |
| [`script-src-attr`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src-attr)                                 | 75Toggle history             | 79Toggle history      | 108Toggle history        | 62Toggle history             | NoToggle history        | 75Toggle history             | 108Toggle history        | 54Toggle history             | NoToggle history        | 11.0Toggle history      | 75Toggle history             |
| [`script-src-elem`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src-elem)                                 | 75Toggle history             | 79Toggle history      | 108Toggle history        | 62Toggle history             | NoToggle history        | 75Toggle history             | 108Toggle history        | 54Toggle history             | NoToggle history        | 11.0Toggle history      | 75Toggle history             |
| [`strict-dynamic`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src)                                       | 52Toggle history             | 79Toggle history      | 52Toggle history         | 39Toggle history             | 15.4Toggle history      | 52Toggle history             | NoToggle history         | 41Toggle history             | 15.4Toggle history      | 6.0Toggle history       | 52Toggle history             |
| [`style-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src)                                             | 25Toggle history             | 14Toggle history      | 23Toggle history         | 15Toggle history             | 7Toggle history         | YesToggle history            | 23Toggle history         | YesToggle history            | 7Toggle history         | YesToggle history       | YesToggle history            |
| [`style-src-attr`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src-attr)                                   | 75Toggle history             | 79Toggle history      | 108Toggle history        | 62Toggle history             | NoToggle history        | 75Toggle history             | 108Toggle history        | 54Toggle history             | NoToggle history        | 11.0Toggle history      | 75Toggle history             |
| [`style-src-elem`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src-elem)                                   | 75Toggle history             | 79Toggle history      | 108Toggle history        | 62Toggle history             | NoToggle history        | 75Toggle history             | 108Toggle history        | 54Toggle history             | NoToggle history        | 11.0Toggle history      | 75Toggle history             |
| [`trusted-types`Experimental](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/trusted-types)                         | 83Toggle history             | 83Toggle history      | NoToggle history         | 69Toggle history             | NoToggle history        | 83Toggle history             | NoToggle history         | NoToggle history             | NoToggle history        | 13.0Toggle history      | 83Toggle history             |
| [`unsafe-hashes`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src)                                        | 69Toggle history             | 79Toggle history      | 109Toggle history        | 56Toggle history             | 15.4Toggle history      | 69Toggle history             | 109Toggle history        | 48Toggle history             | 15.4Toggle history      | 10.0Toggle history      | 69Toggle history             |
| [`upgrade-insecure-requests`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/upgrade-insecure-requests)             | 43Toggle history             | 17Toggle history      | 42Toggle history         | 30Toggle history             | 10.1Toggle history      | 43Toggle history             | 42Toggle history         | 30Toggle history             | 10.3Toggle history      | 4.0Toggle history       | 43Toggle history             |
| [`worker-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/worker-src)                                           | 59footnote\*\*Toggle history | 79Toggle history      | 58Toggle history         | 46footnote\*\*Toggle history | 15.5Toggle history      | 59footnote\*\*Toggle history | 58Toggle history         | 43footnote\*\*Toggle history | 15.5Toggle history      | 7.0Toggle history       | 59footnote\*\*Toggle history |
| Worker support                                                                                                                                         | YesToggle history            | 79Toggle history      | 50Toggle history         | YesToggle history            | 10Toggle history        | YesToggle history            | 50Toggle history         | YesToggle history            | 10Toggle history        | YesToggle history       | YesToggle history            |

### Legend

Tip: you can click/tap on a cell for more information.

- Full support

  Full support

- Partial support

  Partial support

- No support

  No support

- Compatibility unknown

  Compatibility unknown

- Experimental. Expect behavior to change in the future.

- Non-standard. Check cross-browser support before using.

- Deprecated. Not for use in new websites.

- See implementation notes.

- Uses a non-standard name.

- Has more compatibility info.

### [兼容性备注](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E5%85%BC%E5%AE%B9%E6%80%A7%E5%A4%87%E6%B3%A8)

在某些版本的 Safari 网络浏览器中存在一种特殊的不兼容性，即如果设置了内容安全策略标头，但没有设置相同来源（Same Origin）标头。浏览器将阻止自我托管的内容和网站外的内容，并错误地报告说这是由于内容安全政策不允许该内容。

## [参见](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#%E5%8F%82%E8%A7%81)

- [`Content-Security-Policy`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy) HTTP 标头
- [`Content-Security-Policy-Report-Only`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only) HTTP 标头
- [WebExtensions 中的安全策略](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/Content_Security_Policy)
- [Web Worker 中的 CSP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy#csp_in_workers)
- [隐私、权限和信息安全  (en-US)](https://developer.mozilla.org/en-US/docs/Web/Privacy "Currently only available in English (US)")
- [CSP 评估器](https://github.com/google/csp-evaluator)——评估你的内容安全策略
