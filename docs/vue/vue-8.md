## 全局过滤器之单一挂载

```js
dateTmp:要过滤的值
fmtTmp:传入的参数，可接收多个参数

<template>
  {{ 1577533308698 | dateFormat('yyyy/MM/dd HH:mm:ss') }}
  //2019/12/28 19:41:48
</template>

Vue.filter('dateFormat', function (dateTmp, fmtTmp) {
  let fmt = fmtTmp
  let date = dateTmp

  if (!fmt) {
    fmt = 'yyyy.MM.dd'
  }
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  let week = {
    '0': '日',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六'
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[date.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
});
```

## 全局过滤器之批量挂载

```js
//filters.js
export function slice (temp,num) {
    return temp.slice(0,num);
}
```

```js
//main.js
import * as filters from '@/assets/js/filters';

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
```

```js
{{ '123456' | slice(4) }} //1234
```

## 组件内过滤器

```js
<template>
  {{ msg | setSize }}
  //我要被过...
</template>

<script>
  export default {
		data () {
    	return {
      	msg: '我要被过滤'
      }
    },
		filters: {
    	setSize (value) {
      	if (value.length > 4) {
        	return value.splice(0,4) + '...';
        } else {
        	return value;
        }
      }
    }
	}
</script>
```