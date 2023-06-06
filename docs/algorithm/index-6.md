## 介绍

**散列**是一种常用的数据存储技术，散列后的数据可以快速的插入或取用。散列所使用的数据结构叫散列表。

**散列算法**的作用是尽可能的在数据结构中找到一个值。

**基本特点：** 插入，删除，取用数据都非常快，但是查询效率很低，如果你希望快速查找一般是借助其他的数据结构，比如二叉查找树。

## 示例

我们将要使用最常见的散列函 数——“lose lose”散列函数，方法是简单地将每个键值中的每个字母的ASCII值相加。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4824b82551a64261a7320569215d17dc~tplv-k3u1fbpfcp-zoom-1.image)

## HashTable类

先实一个简单的散列函数，它是HashTable类中的一个私有方法：

```js
var loseloseHashCode = function (key) {
    var hash = 0; //存储ASCII总和
    for (var i = 0; i < key.length; i++) { //对key值遍历
        hash += key.charCodeAt(i); //计算每个字符的ASCII值相加
    }
    return hash % 37; //和任意数做除法
};
```

## 完整代码

```js
class hashTable {
    constructor() {
        this.table = new Array(7);
    }
    put(key) {
        let pos = this.loseloseHashCode(key);
        this.table[pos] = key;

    }
    get(key) {
        return table[loseloseHashCode(key)];
    }
    remove(key) {
        table[loseloseHashCode(key)] = undefined;
    }
    showDistro() {
        let n = 0;
        for (let i = 0, len = this.table.length; i < len; ++i) {
            if (this.table[i] !== 'undefined') {
                console.log(`${i}:${this.table[i]}`)
            }
        }
    }
    loseloseHashCode(key) {
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        console.log('hashValue:' + hash)
        return hash % this.table.length;
    }
}

let dataa = ['Clayton', 'Raymond', 'kitty', 'Miachale'];
let htable = new hashTable();
dataa.forEach(item=>{
  htable.put(item)
})
htable.showDistro()

//执行结果
hashValue:730
hashValue:730
hashValue:565
hashValue:788
0:undefined
1:undefined
2:Raymond
3:undefined
4:Miachale
5:kitty
6:undefined
```

结论：simpleHash在计算某些值的哈希值时，会有键一样而丢失的情况，那么需要一个更好的散列函数。