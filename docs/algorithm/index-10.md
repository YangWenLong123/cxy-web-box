#### 例：数组值为字符，使用new Set()去重，适用于基本数据类型，引用类型不可以

```js
let arr = ['a', 'b', 'c', 'd', 'a', '2', 'd', 'c'];
  let setArr = (arr) => {
    let set = new Set(arr);
    return set;
  }
arr = setArr(arr);
```

```js
let arr = [1,2,3,4,5,1,2,3];
Array.from(new Set(arr));	//[1,2,3,4,5]
```

#### 例：数组去重判断元素出现次数

```js
let arr2 = ['a', 'b', 'c', 'd', 'a', '2', 'd', 'c'];
  let setArr2 = (arr) => {
    let newarr = [],
      obj = {};
    for (let i = 0; i < arr.length; i++) {
      if (!obj[arr[i]]) {
        newarr.push(arr[i]);
        obj[arr[i]] = 1;
      } else {
        obj[arr[i]]++
      }
    }
    return newarr;
  }
  arr2 = setArr2(arr2);
```

#### 例：使用indexOf判断去重

```js
let arr3 = ['a', 'b', 'c', 'd', 'a', '2', 'd', 'c'];
  let setArr3 = (arr) => {
    let newarr = [];
    for (let i = 0; i < arr.length; i++) {
      if (newarr.indexOf(arr[i]) === -1 || newarr.indexOf(arr[i]) == -1) {
        newarr.push(arr[i])
      }
    }
    return newarr;
  }
arr3 = setArr3(arr3);
```

#### 例：数组元素为对象去重

```js
let arr4 = [
    { 'name': 'along', 'age': '18', 'sex': '男' },
    { 'name': 'along2', 'age': '18', 'sex': '男' },
    { 'name': 'along3', 'age': '18', 'sex': '男' },
    { 'name': 'along', 'age': '18', 'sex': '男' },
    { 'name': 'along5', 'age': '18', 'sex': '男' }
  ]
  let objKey = (obj, keys) => {
    let n = keys.length,
      key = [];
    while (n--) {
      key.push(obj[keys[n]]);
    }
    return key.join('|');
  }
  let uniqeByKeys = (array, keys) => {
    let arr = [];
    let hash = {};
    for (let i = 0, j = array.length; i < j; i++) {
      let k = objKey(array[i], keys);
      if (!(k in hash)) {
        hash[k] = true;
        arr.push(array[i]);
      }
    }
    return arr;
  }
arr4 = uniqeByKeys(arr4, ['name']);
```

#### 例：根据字段值去重

```js
let arr5 = [
    { 'name': 'along', 'age': '18', 'sex': '男' },
    { 'name': 'along2', 'age': '18', 'sex': '男' },
    { 'name': 'along3', 'age': '18', 'sex': '男' },
    { 'name': 'along', 'age': '18', 'sex': '男' },
    { 'name': 'along5', 'age': '18', 'sex': '男' }
  ]
  let setArr5 = (arr) => {
    let result = [];
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
      if (!obj[arr[i].name]) {  //obj[arr[i].name === false  !false === true
        result.push(arr[i]);
        obj[arr[i].name] = true;
      }
    }
    return result;
  }
  arr5 = setArr5(arr5);
```

#### 例：reduce实现数组去重

```js
let person = [
    { id: 0, name: "小明" },
    { id: 1, name: "小张" },
    { id: 2, name: "小李" },
    { id: 3, name: "小孙" },
    { id: 1, name: "小周" },
    { id: 2, name: "小陈" },
  ];

  let obj = {};

  person = person.reduce((cur, next) => {
    obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
    return cur;
  }, [])
```