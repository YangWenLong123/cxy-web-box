#### 前言

代码注释的作用主要是容易被理解和被维护。

上千行代码，给自己看，容易回忆，给同事看，协同工作。

####

#### 顶部文档注释

```js
 /*
 * @description: 描述
 * @Author: 开发人员
 * @Date: 开始时间
 * @Last Modified by: 最后编辑人
 * @Last Modified time: 最后编辑时间
 * @Version: 当前开发版本
 */
```

#### 函数

```js
/**
 * @func
 * @todo 这个函数需要优化
 * @desc 一个带参数的函数
 * @param {string} a 		- 参数a
 * @param {number} b=1 	- 参数b默认值为1
 * @param {string} c=1 	- 参数c有两种支持的取值 1—表示x 2—表示xx
 * @param {object} d 		- 参数d为一个对象
 * @param {string} d.e 	- 参数d的e属性
 * @param {string} d.f 	- 参数d的f属性
 * @param {object[]} g 	- 参数g为一个对象数组
 * @param {string} g.h 	- 参数g数组中一项的h属性
 * @param {string} g.i 	- 参数g数组中一项的i属性
 * @param {string} [j] 	- 参数j是一个可选参数
 * @returns {boolean} 返回值为true
 */
```

#### 变量

```js
//无注释

itemList: [],
loading: false,
myAlert: 'handlemyAlert',
logOut: 'handlelogout',
getRadio: 'handlelgetRadio',
getSelect: 'handlegetSelect',
insertAtCaret: 'handleinsertAtCaret',
radio: '1',
item_name: '',
check_status: true,
datamigration_run: true,
ckbuttonList: this.$t('odmDictionary.ckbuttonList').split('-'),
publicPath:
  process.env.BASE_URL +
  'tools/edit_chek.html?form_id=' +
  this.$props.formId +
  '&dbname=' +
  this.$store.getters.projectInfo.study_db +
  '&draftid=' +
  this.$store.getters.draft.id +
  '&tempform_id=&t=' +
  Math.random(),
logicFilter: {
  key: 'form_oid',
  value: '',
  querySymbol: 1
},
listLoading: false,
loadingac: false,
logicList: [],
dataList: [],
dataListexp: [],
checkfiledList: [],
checktypelist: [],
checkvisitList: [],
actionypelist: [],
conditionList: []
```

```js
//有注释

props: {
		// 倒计时的时间，秒为单位
		timestamp: {
			type: [Number, String],
			default: 0
		},
		// 是否自动开始倒计时
		autoplay: {
			type: Boolean,
			default: true
		},
		// 用英文冒号(colon)或者中文(zh)当做分隔符，false的时候为中文，如："11:22"或"11时22秒"
		separator: {
			type: String,
			default: 'colon'
		},
		// 分隔符的大小，单位rpx
		separatorSize: {
			type: [Number, String],
			default: 24
		},
		// 分隔符颜色
		separatorColor: {
			type: String,
			default: "#303133"
		},
		// 字体颜色
		color: {
			type: String,
			default: '#303133'
		},
		// 字体大小，单位rpx
		fontSize: {
			type: [Number, String],
			default: 24
		},
		// 背景颜色
		bgColor: {
			type: String,
			default: '#fff'
		},
		// 数字框高度，单位rpx
		height: {
			type: [Number, String],
			default: 40
		},
		// 是否显示数字框
		showBorder: {
			type: Boolean,
			default: false
		},
		// 边框颜色
		borderColor: {
			type: String,
			default: '#303133'
		},
    // 边框圆角
    borderRadius: {
        type: String,
        default: '4rpx'
    },
		// 是否显示秒
		showSeconds: {
			type: Boolean,
			default: true
		},
		// 是否显示分钟
		showMinutes: {
			type: Boolean,
			default: true
		},
		// 是否显示小时
		showHours: {
			type: Boolean,
			default: true
		},
		// 是否显示“天”
		showDays: {
			type: Boolean,
			default: true
		},
		// 当"天"的部分为0时，不显示
		hideZeroDay: {
			type: Boolean,
			default: false
		}
	}

  data() {
    return {
      d: '00', // 天的默认值
      h: '00', // 小时的默认值
      i: '00', // 分钟的默认值
      s: '00', // 秒的默认值
      timer: null ,// 定时器
      seconds: 0, // 记录不停倒计过程中变化的秒数
    };
  }
```

#### HTML代码块，CSS代码块

```js
<!-- desc start -->
<view class="z-countdown-item" :style="[itemStyle]" v-if="showDays && (hideZeroDay || (!hideZeroDay && d != '00'))">
    <text class="z-countdown-time" :style="[letterStyle]">{{ d }}</text>
</view>
<!-- desc end -->

<!-- desc start -->
. {
  font-size: 20px;
}
<!-- desc end -->
```

#### 如何快速给代码添加注释

<https://marketplace.visualstudio.com/items?itemName=OBKoro1.korofileheader>

###

###