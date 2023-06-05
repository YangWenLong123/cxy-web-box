双指针，指的是在遍历对象的过程中，不是普通的使用单个指针进行访问，而是使用两个相同方向（*快慢指针*）或者相反方向（*对撞指针*）的指针进行扫描，从而达到相应的目的。

对撞指针：对撞指针是指在数组中，将指向最左侧的索引定义为左指针(left)，最右侧的定义为右指针(right)，然后从两头向中间进行数组遍历。

快慢指针：快慢指针也是双指针，但是两个指针从同一侧开始遍历数组，将这两个指针分别定义为快指针（fast）和慢指针（slow），两个指针以不同的策略移动，直到两个指针的值相等（或其他特殊条件）为止，如 fast 每次增长两个，slow 每次增长一个。

***对撞指针***

题：给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

```js
输入：nums = [-4,-1,0,3,10]
输出：[0,1,9,16,100]
解释：平方后，数组变为 [16,1,0,9,100]
排序后，数组变为 [0,1,9,16,100]
```

```
输入：nums = [-7,-3,2,3,11]
输出：[4,9,9,49,121]
```

题解：

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    let res = [];
    let [left, right] = [0, nums.length - 1];

    while(left <= right) {
        let leftNum = Math.abs(nums[left]);
        let rightNum = Math.abs(nums[right]);

        if(leftNum < rightNum) {
            res.unshift(rightNum * rightNum);
            right--;
        } else {
            res.unshift(leftNum * leftNum);
            left++;
        }
    }

    return res;
};
```