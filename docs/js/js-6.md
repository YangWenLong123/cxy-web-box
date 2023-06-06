## if...else语句

条件判断语句指的是根据指定的条件所返回的布尔值结果,来执行特定的语句.

```js
if (condition_1) {
  statement_1;
}else if (condition_2) {
  statement_2;
}else if (condition_n_1) {
  statement_n;
}else {
  statement_last;
}
```

## switch语句

switch 语句允许一个程序求一个表达式的值并且尝试去匹配表达式的值到一个 case 标签。如果匹配成功，这个程序执行相关的语句。break代表执行结束，跳出当前switch，不会再向下匹配执行代码。

```js
const fruittype = 'Bananas';

switch (fruittype) {
   case "Oranges":
      document.write("Oranges are $0.59 a pound.<br>");
      break;
   case "Apples":
      document.write("Apples are $0.32 a pound.<br>");
      break;
   case "Bananas":
      document.write("Bananas are $0.48 a pound.<br>");
      break;
   case "Cherries":
      document.write("Cherries are $3.00 a pound.<br>");
      break;
   case "Mangoes":
   case "Papayas":
      document.write("Mangoes and papayas are $2.79 a pound.<br>");
      break;
   default:
      document.write("Sorry, we are out of " + fruittype + ".<br>");
}
```

## throw语句

使用throw语句抛出一个异常。当你抛出异常，你规定一个含有值的表达式要被抛出。

```js
hrow "Error2";   // String type
throw 42;         // Number type
throw true;       // Boolean type
throw {toString: function() { return "I'm an object!"; } };
```

## try...catch语句

try...catch 语句标记一块待尝试的语句，并规定一个以上的响应应该有一个异常被抛出。如果我们抛出一个异常，try...catch语句就捕获它。

```js
try {
  throw 'error'
} catch (error) {
  console.log('捕获' + error);
} finally {
  console.log('我会默认执行');
}
```