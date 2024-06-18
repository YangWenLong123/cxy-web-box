## react 介绍及快速入门

<div style="font-size: 19px; font-weight: 500; margin-top: 30px">你将会学习到</div>

- [如何创建项目](#创建项目)
- [如何创建和嵌套组件](#如何创建和嵌套组件)
- [如何添加标签和样式](#如何添加标签和样式)
- [如何显示数据](#如何显示数据)
- [如何渲染条件和列表](#如何渲染条件和列表)
- [如何对事件做出响应并更新界面](#如何对事件做出响应并更新界面)
- [如何在组件间共享数据](#如何在组件间共享数据)

## 创建项目

### react

首先，确保你的机器上安装了 Node.js（版本 >= 14.0.0）和 npm（版本 >= 5.6）。
打开终端或命令提示符，然后运行以下命令来创建一个名为 my-app 的新 React 项目：

```
npx create-react-app my-app
```

### Next.js

**[Next.js 的页面路由](https://nextjs.org/) 是一个全栈的 React 框架**。它用途广泛，可让你创建任何规模的 React 应用程序——从大部分的静态博客到复杂的动态应用程序。要创建新的 Next.js 项目，请在终端中运行：

```
npx create-next-app@latest
```

如果你是 Next.js 的新手，请查看 [Next.js 课程](https://nextjs.org/learn)。

Next.js 由 [Vercel](https://vercel.com/) 维护。你可以 [将 Next.js 应用](https://nextjs.org/docs/app/building-your-application/deploying) 部署到 Node.js 或 serverless 上，也可以部署到你自己的服务器上。[完全静态的 Next.js 应用](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports) 可以部署在任何支持静态服务的地方。

### Remix

**[Remix](https://remix.run/) 是一个具有嵌套路由的全栈式 React 框架**。它可以把你的应用分成嵌套部分，该嵌套部分可以并行加载数据并响应用户操作进行刷新。要创建一个新的 Remix 项目，请运行：

```
npx create-remix
```

如果你是 Remix 的新手，请查看 Remix 的 [博客教程](https://remix.run/docs/en/main/tutorials/blog)（短）和 [应用教程](https://remix.run/docs/en/main/tutorials/jokes)（长）。

Remix 由 [Shopify](https://www.shopify.com/) 维护。当你创建一个 Remix 项目时，你需要 [选择你的部署目标](https://remix.run/docs/en/main/guides/deployment)。你可以通过使用或编写 [适配器](https://remix.run/docs/en/main/other-api/adapter) 将 Remix 应用部署到 Node.js 或 serverless 上进行托管。

## 如何创建和嵌套组件

React 应用程序是由 组件 组成的。一个组件是 UI（用户界面）的一部分，它拥有自己的逻辑和外观。组件可以小到一个按钮，也可以大到整个页面。

React 组件是返回标签的 JavaScript 函数：

```js
function MyButton() {
  return <button>I'm a button</button>;
}
```

至此，你已经声明了 `MyButton`，现在把它嵌套到另一个组件中：

```js
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

你可能已经注意到 `MyButton` 是以大写字母开头的。你可以据此识别 React 组件。React 组件必须以`大写字母开头`，而 `HTML 标签则必须是小写字母`。

## 如何添加标签和样式

### 使用 JSX 编写标签

JSX 比 HTML 更加严格。你必须闭合标签，如 `<br />`。你的组件也不能返回多个 JSX 标签。你必须将它们包裹到一个共享的父级中，比如 `<div>...</div>` 或使用空的 `<>...</>` 包裹：

```js
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>
        Hello there.
        <br />
        How do you do?
      </p>
    </>
  );
}
```

如果你有大量的 HTML 需要移植到 JSX 中，你可以使用 [在线转换器](https://transform.tools/html-to-jsx)。

### 添加样式

在 React 中，你可以使用 `className` 来指定一个 CSS 的 class。它与 HTML 的 [`class`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/class) 属性的工作方式相同：

```
<img className="avatar" />
```

然后，你可以在一个单独的 CSS 文件中为它编写 CSS 规则：

```
/* In your CSS */

.avatar {

  border-radius: 50%;

}
```

React 并没有规定你如何添加 CSS 文件。最简单的方式是使用 HTML 的 [`link`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link) 标签。如果你使用了构建工具或框架，请阅读其文档来了解如何将 CSS 文件添加到你的项目中。

## 如何显示数据

SX 会让你把标签放到 JavaScript 中。而大括号会让你 “回到” JavaScript 中，这样你就可以从你的代码中嵌入一些变量并展示给用户。例如，这将显示 user.name：

```js
return <h1>{user.name}</h1>;
```

你还可以将 JSX 属性 “转义到 JavaScript”，但你必须使用大括号 而非 引号。例如，`className="avatar"` 是将 "avatar" 字符串传递给 className，作为 CSS 的 class。但 `src={user.imageUrl}` 会读取 JavaScript 的 `user.imageUrl` 变量，然后将该值作为 src 属性传递：

```js
return <img className="avatar" src={user.imageUrl} />;
```

你也可以把更为复杂的表达式放入 JSX 的大括号内，例如 字符串拼接：

```js
const user = {
  name: "Hedy Lamarr",
  imageUrl: "https://i.imgur.com/yXOvdOSs.jpg",
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={"Photo of " + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize,
        }}
      />
    </>
  );
}
```

在上面示例中，`style={{}}` 并不是一个特殊的语法，而是 `style={ }` JSX 大括号内的一个普通 `{}` 对象。当你的样式依赖于 JavaScript 变量时，你可以使用 style 属性。

## 如何渲染条件和列表

React 没有特殊的语法来编写条件语句，因此你使用的就是普通的 JavaScript 代码。例如使用 if 语句根据条件引入 JSX：

```js
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return <div>{content}</div>;
```

如果你喜欢更为紧凑的代码，可以使用 条件 ? 运算符。与 if 不同的是，它工作于 JSX 内部：

```js
<div>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</div>
```

当你不需要 else 分支时，你还可以使用 逻辑 && 语法：

```js
<div>{isLoggedIn && <AdminPanel />}</div>
```

### 渲染列表

```js
const products = [
  { title: "Cabbage", isFruit: false, id: 1 },
  { title: "Garlic", isFruit: false, id: 2 },
  { title: "Apple", isFruit: true, id: 3 },
];

export default function ShoppingList() {
  const listItems = products.map((product) => (
    <li
      key={product.id}
      style={{
        color: product.isFruit ? "magenta" : "darkgreen",
      }}
    >
      {product.title}
    </li>
  ));

  return <ul>{listItems}</ul>;
}
```

## 如何对事件做出响应并更新界面

### 响应事件

你可以通过在组件中声明 事件处理 函数来响应事件：

```js
function MyButton() {
  function handleClick() {
    alert("You clicked me!");
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

注意，onClick={handleClick} 的结尾没有小括号！不要 调用 事件处理函数：你只需 把函数传递给事件 即可。当用户点击按钮时 React 会调用你传递的事件处理函数。

### 更新界面

首先，从 React 引入 `useState`：

```js
import { useState } from "react";
```

现在你可以在你的组件中声明一个 state 变量：

```js
function MyButton() {
  const [count, setCount] = useState(0);
  // ...
```

你将从 useState 中获得两样东西：当前的 state（count），以及用于更新它的函数（setCount）。你可以给它们起任何名字，但按照惯例会像 [something, setSomething] 这样为它们命名。

案例：

如果你多次渲染同一个组件，每个组件都会拥有自己的 state

```js
import { useState } from "react";

export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}
```

## 如何在组件间共享数据

```js
import { useState } from "react";

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return <button onClick={onClick}>Clicked {count} times</button>;
}
```
