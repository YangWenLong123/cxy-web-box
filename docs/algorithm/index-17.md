***算法描述如下：***

a. 将数组的第一个位置设置为边界(0)

b. 将数组最后的一个元素所在的位置设置为上边界(数组长度-1)

c. 若下边界小于等于上边界，则做如下操作

ⅰ. 将终点设置为(上边界+下边界) / 2

ⅱ. 如果查询值小于中点，将下边界设为中点下标 - 1

ⅲ. 如果查询值大于中点，将上边界设为中点下标 + 1

ⅳ. 否则中点元素即为要查找的数据，return

***题目：***

给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

***示例：***

```js
输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4

-----------------------------------------------------------------------------------

输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1
```

***解题：***

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    if(nums.length === 0) return -1;
    if(nums.length === 1 && nums[0] === target) return 0;
    if(nums.length === 1 && nums[0] !== target) return -1;
    let min = 0;
    max = nums.length - 1;

    while(min <= max) {
      let mid = Math.floor((min + max) / 2);

      if(nums[mid] == target) {
        return mid;
      } else if (nums[mid] > target) {
        max = mid - 1;
      } else if (nums[mid] < target) {
        min = mid + 1;
      }
    }

    return -1;
};
```

***题目：***

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用时间复杂度为 O(log n) 的算法。

***示例：***

```js
输入: nums = [1,3,5,6], target = 5
输出: 2

-----------------------------------------------------------------------------------

输入: nums = [1,3,5,6], target = 2
输出: 1

-----------------------------------------------------------------------------------

输入: nums = [1,3,5,6], target = 7
输出: 4

-----------------------------------------------------------------------------------

输入: nums = [1,3,5,6], target = 0
输出: 0
-----------------------------------------------------------------------------------

输入: nums = [1], target = 0
输出: 0
```

***解题：***

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    if(nums.length === 1 && nums[0] > target) return 0;
    if(nums.length === 1 && nums[0] < target) return 1;
  	if(nums[nums.length - 1] < target) return nums.length;
    if(nums[0] > target) return 0;
    if(nums.includes(target)) {
        let min = 0,
            max = nums.length - 1,
            mid;

        while(min <= max) {
            mid = Math.floor((min + max) / 2);

            if(nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                min = mid + 1;
            } else if (nums[mid] > target) {
                max = mid - 1;
            }
        }
    } else {
        let a = 0,
            b = nums.length - 1,
            c;

        while(a < b) {
            c = Math.floor((a + b) / 2);

            if(nums[c] > target && nums[c - 1] < target) {
                return c;
            } else if (nums[c] < target && nums[c + 1] > target) {
                return c + 1;
            } else if(nums[c] > target) {
                b = c - 1;
            } else if (nums[c] < target) {
                a = c + 1;
            }
        }
    }
};
```

```js
/**
 * @desc 查找右边界
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let len=nums.length
    let res=0

    if(len===0) return res

    let left=0
    let right=len-1

    while(left<right){//右边界
        let mid =(left+right)>>1
        if(nums[mid]>=target){
            right=mid
        }else if(nums[mid]<target){
            left=mid+1
        }
    }
    // 注意应该考虑2种情况：
    // 1.target存在
    // 2.target不存在，为最值
        //1）target最大
        //2）target最小
    // 当右边界>=target时，说明target存在或target最小--【取代右边界的位置】【情况1和2.1】
    // 当右边界<target时，说明所有数都小于target，target应该放在右边界+1【情况2.2】
    if(nums[right]]<target){
        return right+1
    }
    return right //循环终止条件left>right，left可能越界，优先采用right
};
```