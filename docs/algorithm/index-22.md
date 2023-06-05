#### 描述

给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。

请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

你可以假设 nums1 和 nums2 不会同时为空。

#### 示例

```js
nums1 = [1, 3]
nums2 = [2]

则中位数是 2.0
```

```js
nums1 = [1, 2]
nums2 = [3, 4]

则中位数是 (2 + 3)/2 = 2.5
```

#### 实现

思路：

1.  1.  首先合并两个数组
    1.  进行排序
    1.  判断是偶数项数组还是技术项数组
    1.  进行中位数计算

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let nums3 = nums1.concat(nums2);
    let nums4 = nums3.sort((a,b)=>{
        return a - b
    })

    if(nums4.length % 2) {
        return nums4[(nums4.length - 1) / 2]
    } else {
        return (nums4[nums4.length / 2] +  nums4[(nums4.length / 2) - 1]) / 2
    }
};

//分析
执行用时：124 ms
内存消耗：42.9 MB
```