## 查询星座

```js
//m 月 d 日
getConstellation (m, d) {
  return m- (d < "102223444433".charAt(m - 1) - -19);
}

const consteList = [
  '摩羯座',
  '水瓶座',
  '双鱼座',
  '白羊座',
  '金牛座',
  '双子座',
  '巨蟹座',
  '狮子座',
  '处女座',
  '天秤座',
  '天蝎座',
  '射手座',
  '摩羯座',
];
```

## 一维数组转二维数组

```js
let a = [
  {code: '1', name: 'a'},
  {code: '1', name: 'b'},
  {code: '3', name: 'c'},
  {code: '4', name: 'd'}
]

let nA = [
	[
    {code: '1', name: 'a'},
    {code: '1', name: 'b'}
  ],
  [
  	{code: '3', name: 'c'},
  ],
  [
  	{code: '4', name: 'd'},
  ]
]

const filterData = list => {
  if(!list.length) return [];

  let map = new Map();
  let newArr = [];

  list.forEach(item => {
    map.has(item.code) ? map.get(item.code).push(item) : map.set(item.code, [item]);
  })

  newArr = [...map.values()];

  return newArr;
}
```