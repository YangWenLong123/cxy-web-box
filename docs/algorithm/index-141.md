#### 前言

In computer science, an in-place algorithm is an algorithm which transforms input using no auxiliary data structure. However a small amount of extra storage space is allowed for auxiliary variables. The input is usually overwritten by the output as the algorithm executes. In-place algorithm updates input sequence only through replacement or swapping of elements. An algorithm which is not in-place is sometimes called not-in-place or out-of-place.

像 wiki 里面说的，原地算法是基本上不需要额外辅助的数据结构,然而,允许少量额外的辅助变量来转换数据的算法。在计算复杂性理论中，原地算法包含使用O(1)空间复杂度的所有算法，DSPACE(1)类型。

#### 判断回文

如下几个示例，20200202和aba是一个回文

'aba' => true

'accad' => false

'20200202' => true

```js
function isPalindromeStr (str) {
	const middle = Math.floor(str.length / 2);
  for(let i = 0; i < middle; i++) {
  	if(str[i] !== str[str.length - i - 1]) {
    	return false;
    }
  }
  return true;
}
```