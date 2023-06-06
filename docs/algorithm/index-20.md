## 描述

一个数据是否被另一个数组包含，在写需求时遇到这个点，如果被包含了，需要改变上级状态，否者上级状态清空。

## 分析

```js
let a = [1,2,3,4,5,6];
let b = [1,2,3,4,5,6,7];

/**
 * a是否被b包含
 * 分析
 *      1.b的长度小于a或者a的长度大于b,那么a肯定不会被b包含
 *      2.获取a的长度a_length
 *      3.获取a与b的并集c并去重处理,获取c的长度c_length,如果c_length == a_length ,则a被b包含
 * @param {Array} a //数组a
 * @param {Array} b //数组b
 */
function isPart (a, b) {
if(b.length < a.length || a.length > b.length) {
    return false;
} else {
    let c = b.filter(item => a.includes(item));

    if(a.length == c.length) {
        console.log('true');
    } else {
        console.log('false');
    }
}
}
isPart(a,b);
```