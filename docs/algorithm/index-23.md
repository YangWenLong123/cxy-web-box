## 描述

将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的

## 示例

```js
输入： [1,2,4] [1,3,4]
输入： [1,1,2,3,4]
```

## 实现

```js
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
let dummyHead = new ListNode()
    let ret = dummyHead

    while(l1 != null || l2 != null) {
        if(l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                dummyHead.next = l1
                l1 = l1.next
            }else if(l1.val > l2.val) {
                dummyHead.next = l2
                l2 = l2.next
            }
            dummyHead = dummyHead.next
        }else if(l1 != null){
            dummyHead.next = l1
            break
        }
        else {
            dummyHead.next = l2
            break
        }
    }
    return ret.next
};
```