## 前言

任意值（Any）用来表示允许赋值为任意类型。

## 什么是任意值类型

如果一个普通类型，在赋值过程中改变类型是不会被允许的:

```js
let str: string = '我是字符串';
str = 1;	//Type '1' is not assignable to type 'string'.
```

但如果是any类型的变量，那么它是允许被改变为任意类型的.

```js
let an: any = '任意值';
an = 2;
```

## 任意值的属性和方法

在任意值上访问属性和方法都是被允许的。也可以这样理解，声明一个值为任意值后，对它的任何操作，返回的内容的类型都是任意值.

```js
let anySay: any = 'any';

anySay.getName
any.SetName('zhangsnan')


let anyThing: any = {
    name: function (name) {
        return name;
    },
    age: 18
}

anyThing.age //18
anyThing.name('jack') //jack
```

## 未声明类型的变量

如果一个变量未声明类型,那么它将会被识别未任意类型

```js
let somthing;

somthing = '1';
somthing = true;
somthing = null;
somthing = undefined;

somthing //undefined
```

## 测试用例

```js
let debug:boolean = true;
let a: any = '1';//任意值允许随意修改

a = 2;

// 未声明类型 则被识别为任意值
let b;

b = '7';
b = true;

debug && console.log({
  a: a,
  b: b
});

-----------------------------------------------------------------------------------

{ a: 2, b: true }
```


## 参考

<https://ts.xcatliu.com/basics/any.html>