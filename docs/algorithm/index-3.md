#### 介绍

要存储多个元素，一般都会选择数组，但是这种数据结构有一个缺点：一般数组的大小都是固定的，从数组的起点或中间插入或移除元素成本有点高。这时候就可以选择链表。

链表存储有序的元素集合，但不同于数组，链表的元素在内存中不是连续放置的，每个元素由一个存储元素本身的节点个指向下一个元素的引用组成。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d1f2b42c02842aea2eb04565e861195~tplv-k3u1fbpfcp-zoom-1.image)

相对于传统的数组，链表的一个好处在于，添加或移除元素的时候不需要移动其他元素。然 而，链表需要使用指针，因此实现链表时需要额外注意。数组的另一个细节是可以直接访问任何 位置的任何元素，而要想访问链表中间的一个元素，需要从起点（表头）开始迭代列表直到找到所需的元素。

#### 创建链表

```js
function LinkedList() {
 let Node = function(element){ // Node辅助类,要加入列表的项。element要加入的值，next表示指向列表下一个节点
 		this.element = element;
 		this.next = null;
 };
 let length = 0; // 存储列表项数量
 let head = null; // 存储第一个节点的引用，存到变量head中。
 this.append = function(element){}; //向列表项尾部添加新的项
 this.insert = function(position, element){}; //向列表指定位置插入新的项
 this.removeAt = function(position){}; //从列表特定位置移除一项
 this.remove = function(element){}; //从列表中移除一项
 this.indexOf = function(element){}; //返回元素在列表的索引,没有则返回-1
 this.isEmpty = function() {}; //如果链表中不包含任何元素，返回true，如果链表长度大于0，则返回false
 this.size = function() {}; //返回链表的长度
 this.getHead = function(){};
 this.toString = function(){}; //输入链表元素值
 this.print = function(){};
}
```

#### 向链表尾部添加元素

两种场景：列表为空，添加的是第一个元素；列表不为空，向其追加元素

```js
this.append = function (element) {
    let node = new Node(element), //传入element值，作为Node项
        current; //{2}
    if (head === null) { //列表中第一个节点为空时，此时head指向node
        head = node;
    } else {
        current = head;
        //循环列表，直到找到最后一项
        while (current.next) {
            current = current.next;
        }
        //找到最后一项，将其next赋为node，建立链接
        current.next = node;
    }
    length++; //更新列表的长度
};
```

#### 从链表中移除元素

两种场景：移除第一个元素；移除第一个以外的元素。

```js
this.removeAt = function (position) {
    //检查越界值
    if (position > -1 && position < length) {
        let current = head,
            previous,
            index = 0;
        //移除第一项
        if (position === 0) {
            head = current.next;
        } else {
            while (index++ < position) {
                previous = current;
                current = current.next;
            }
            //将previous与current的下一项链接起来：跳过current，从而移除它
            previous.next = current.next;
        }
        length--;
        return current.element;
    } else {
        return null;
    }
};
```

#### 在任意位置插入元素

```js
this.insert = function (position, element) {
    //检查越界值
    if (position >= 0 && position <= length) {
        let node = new Node(element),
            current = head,
            previous,
            index = 0;
        if (position === 0) { //在第一个位置添加
            node.next = current;
            head = node;
        } else {
            while (index++ < position) {
                previous = current;
                current = current.next;
            }
            node.next = current;
            previous.next = node;
        }
        length++; //更新列表的长度
        return true;
    } else {
        return false;
    }
};
```

#### toString方法

```js
this.toString = function () {
    let current = head,
        string = '';
    while (current) {
        string += current.element + (current.next ? 'n' : '');
        current = current.next;
    }
    return string;
};
```

#### indexOf方法

```js
this.indexOf = function (element) {
    let current = head,
        index = -1;
    while (current) {
        if (element === current.element) {
            return index;
        }
        index++;
        current = current.next;
    }
    return -1;
};
```

#### isEmpoty方法

```js
this.isEmpty = function() {
		return length === 0;
};
```

#### size方法

```js
this.size = function() {
		return length;
};
```

#### getHead方法

```js
this.getHead = function(){
		return head;
};
```