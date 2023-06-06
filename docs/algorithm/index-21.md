## 描述

给定一个字符串，去除重复的字符，并计算每个字符出现的次数

## 实现

```js
var lengthOfLongestSubstring = function(s) {
    let arr = [],
        obj = {};

    for(let key in s) {
        if(!obj[s[key]]){
            arr.push(s[key]);
            obj[s[key]] = 1;
        } else {
            obj[s[key]]++;
        }
    }

    console.log(arr,'arr');
    console.log(obj, 'obj');
};

lengthOfLongestSubstring('abcabcbb')；

//执行结果
[ 'a', 'b', 'c' ] arr
{ a: 2, b: 4, c: 2 } obj
```