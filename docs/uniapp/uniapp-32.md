-   接口数据请求，解决跨域问题

## 调用方法

```js
	import { http } from '@/utils/index.js'

  http.post('/student_chat/Chat/getChatList', {
    chat_type: ''
  }).then(res => {
    console.log(res,'res');
  }).catch(err => {
    console.log(err,'err');
  })

	http.get('', {}).then(res => {
    console.log(res,'res');
  }).catch(err => {
    console.log(err,'err');
  })
```

## 调用结果

```js
{
	"data": {
		"code": 1,
		"msg": "success",
		"data": {
			"list": [{
				"chat_no": "kf_group",
				"chat_type": "kf_group",
				"user_no": "",
				"chat_weight": 0,
				"msg_time": 0,
				"msg_unread_num": 0,
				"chat_target": {
					"target_title": "客服消息",
					"target_icon": "http://cdn.zsdx.cn/student-app/images/message/sys_kf_user.png"
				},
				"chat_user": [],
				"latest_msg": {
					"msg_id": 0,
					"msg_type": "",
					"msg_content": ""
				}
			}, {
				"chat_no": "chat_no_user_recommend",
				"chat_type": "user_recommend",
				"user_no": "user_no_user_recommend",
				"chat_weight": 0,
				"msg_time": 1583801141,
				"msg_unread_num": 0,
				"chat_target": {
					"target_title": "同校同学推荐",
					"target_icon": "http://cdn.zsdx.cn/student-app/images/message/user_recommend.png"
				},
				"chat_user": [],
				"latest_msg": {
					"msg_id": 0,
					"msg_type": "",
					"msg_content": ""
				}
			}, {
				"chat_no": "fc_c7061c8d390cf",
				"user_no": "st_c8142529456da",
				"chat_type": "social",
				"chat_weight": 0,
				"msg_time": 1585124777,
				"msg_unread_num": 0,
				"latest_msg": {
					"msg_id": 11371,
					"msg_type": "emoji",
					"msg_content": "{"url":"http://pic.wxhand.com/dev/phaadmin_image/04d98272df70e4017eb981f9cbeaf054.png","title":"奇怪脸","preview_url":"","w":154,"h":154}"
				},
				"chat_user": {
					"student_no": "st_c8142529456da",
					"true_name": "你可愿与我再并肩",
					"head_img": "http://pic.wxhand.com/dev/student_image/9e3f6cea939ce916e18b449d9549e49f!Thumbwidth320",
					"sex": 1,
					"is_system": 0,
					"candle_step": 2,
					"candle_status": 0,
					"stuagent_level": 1
				},
				"chat_shop": [],
				"chat_company": []
			}, {
				"chat_no": "fc_a905236cd4dcf",
				"user_no": "st_87ca94738e53c",
				"chat_type": "social",
				"chat_weight": 0,
				"msg_time": 1583801141,
				"msg_unread_num": 0,
				"latest_msg": {
					"msg_id": 9865,
					"msg_type": "card_image",
					"msg_content": "{"image_url":"http:\/\/cdn.zsdx.cn\/student-app\/images\/message\/msg_exam_result.png","app_action":{"action":"app_page","target":"forum_exam_result","param":{"submit_id":"490"}}}"
				},
				"chat_user": {
					"student_no": "st_87ca94738e53c",
					"true_name": "掌大客服",
					"head_img": "http://cdn.zsdx.cn/student-app/images/message/sys_kf.png",
					"sex": 1,
					"is_system": 1,
					"candle_step": 0,
					"candle_status": 0,
					"stuagent_level": 0
				},
				"chat_shop": [],
				"chat_company": []
			}]
		}
	},
	"statusCode": 200,
	"header": {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json; charset=utf-8",
		"X-Powered-By": "PHP/7.1.4",
		"Access-Control-Allow-Methods": "POST, GET, OPTIONS",
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Max-Age": "86400",
		"Date": "Wed, 25 Mar 2020 12:17:47 GMT",
		"Access-Control-Allow-Headers": "zsdx-session-ticket, zsdx-app-type, zsdx-app-uuid, zsdx-version, zsdx-device-info, content-type",
		"Set-Cookie": "SERVERID=d3438ece8edc13d4d09e5c8a2df783d4|1585138667|1585138188;Path=/",
		"Transfer-Encoding": "Identity",
		"Connection": "keep-alive"
	},
	"errMsg": "request:ok",
	"config": {
		"url": "/student_chat/Chat/getChatList",
		"data": {
			"chat_type": "social"
		},
		"method": "POST",
		"baseUrl": "http://student-app-api.zsdx.cn/api",
		"dataType": "json",
		"params": {},
		"header": {
			"content-type": "application/json",
			"zsdx-app-type": 1,
			"zsdx-app-uuid": "",
			"zsdx-device-info": "...",
			"zsdx-session-ticket": "...",
			"zsdx-version": "..."
		},
		"custom": {},
		"sslVerify": true
	}
}
```

## index.js

```js
import Request from './request'

const http = new Request()

http.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = 'http://student-app-api.zsdx.cn/api' /* 根域名配置 */
	config.header = {
		...config.header,
    //请求头配置处理,配置接口需要的参数
		'zsdx-app-type': '',
		'zsdx-app-uuid': '',
		'zsdx-device-info': '',
		'zsdx-session-ticket': '',
		'zsdx-version': ''
    //请求头配置处理,配置接口需要的参数
	}
	return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode) => {
	return statusCode === 200
}

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		...config.header
	}
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
	  cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	return config
})

http.interceptor.response((response) => { /* 请求之后拦截器 */
	// if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
	//   return Promise.reject(response)
	// }
	// if (response.config.custom.verification) { // 演示自定义参数的作用
	//   return response.data
	// }
	if(response.data.code == '1001') {	//	异常处理
		//...
	} else {
		return response
	}
}, (response) => { // 请求错误做点什么
	return response
})

export {
	http
}
```

## request.js

```js
export default class Request {
  config = {
    baseUrl: '',
    header: {
      'content-type': 'application/json'
    },
    method: 'GET',
    dataType: 'json',
    // #ifndef MP-ALIPAY || APP-PLUS
    responseType: 'text',
    // #endif
    custom: {},
    // #ifdef MP-ALIPAY
    timeout: 30000,
    // #endif
    // #ifdef APP-PLUS
    sslVerify: true
    // #endif
  }

  static posUrl (url) { /* 判断url是否为绝对路径 */
    return /(http|https)://([\w.]+/?)\S*/.test(url)
  }

  static mergeUrl (url, baseUrl, params) {
    let mergeUrl = Request.posUrl(url) ? url : `${baseUrl}${url}`
    if (Object.keys(params).length !== 0) {
      const paramsH = Request.addQueryString(params)
      mergeUrl += mergeUrl.includes('?') ? `&${paramsH}` : `?${paramsH}`
    }
    return mergeUrl
  }

  static addQueryString (params) {
    let paramsData = ''
    Object.keys(params).forEach(function (key) {
      paramsData += key + '=' + encodeURIComponent(params[key]) + '&'
    })
    return paramsData.substring(0, paramsData.length - 1)
  }

  /**
   * @property {Function} request 请求拦截器
   * @property {Function} response 响应拦截器
   * @type {{request: Request.interceptor.request, response: Request.interceptor.response}}
   */
  interceptor = {
    /**
     * @param {Request~requestCallback} cb - 请求之前拦截,接收一个函数（config, cancel）=> {return config}。第一个参数为全局config,第二个参数为函数，调用则取消本次请求。
     */
    request: (cb) => {
      if (cb) {
        this.requestBeforeFun = cb
      }
    },
    /**
     * @param {Request~responseCallback} cb 响应拦截器，对响应数据做点什么
     * @param {Request~responseErrCallback} ecb 响应拦截器，对响应错误做点什么
     */
    response: (cb, ecb) => {
      if (cb) {
        this.requestComFun = cb
      }
      if (ecb) {
        this.requestComFail = ecb
      }
    }
  }

  requestBeforeFun (config) {
    return config
  }

  requestComFun (response) {
    return response
  }

  requestComFail (response) {
    return response
  }

  /**
   * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
   * @param { Number } statusCode - 请求响应体statusCode（只读）
   * @return { Boolean } 如果为true,则 resolve, 否则 reject
   */
  validateStatus (statusCode) {
    return statusCode === 200
  }

  /**
   * @Function
   * @param {Request~setConfigCallback} f - 设置全局默认配置
   */
  setConfig (f) {
    this.config = f(this.config)
  }

  /**
   * @Function
   * @param {Object} options - 请求配置项
   * @prop {String} options.url - 请求路径
   * @prop {Object} options.data - 请求参数
   * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
   * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
   * @prop {Object} [options.header = config.header] - 请求header
   * @prop {Object} [options.method = config.method] - 请求方法
   * @returns {Promise<unknown>}
   */
  async request (options = {}) {
    options.baseUrl = this.config.baseUrl
    options.dataType = options.dataType || this.config.dataType
    // #ifndef MP-ALIPAY || APP-PLUS
    options.responseType = options.responseType || this.config.responseType
    // #endif
    // #ifdef MP-ALIPAY
    options.timeout = options.timeout || this.config.timeout
    // #endif
    options.url = options.url || ''
    options.data = options.data || {}
    options.params = options.params || {}
    options.header = options.header || this.config.header
    options.method = options.method || this.config.method
    options.custom = { ...this.config.custom, ...(options.custom || {}) }
    // #ifdef APP-PLUS
    options.sslVerify = options.sslVerify === undefined ? this.config.sslVerify : options.sslVerify
    // #endif
    options.getTask = options.getTask || this.config.getTask
    return new Promise((resolve, reject) => {
      let next = true
      const cancel = (t = 'handle cancel', config = options) => {
        const err = {
          errMsg: t,
          config: config
        }
        reject(err)
        next = false
      }

      const handleRe = { ...this.requestBeforeFun(options, cancel) }
      const _config = { ...handleRe }
      if (!next) return
      const requestTask = uni.request({
        url: Request.mergeUrl(_config.url, _config.baseUrl, _config.params),
        data: _config.data,
        header: _config.header,
        method: _config.method,
        // #ifdef MP-ALIPAY
        timeout: _config.timeout,
        // #endif
        dataType: _config.dataType,
        // #ifndef MP-ALIPAY || APP-PLUS
        responseType: _config.responseType,
        // #endif
        // #ifdef APP-PLUS
        sslVerify: _config.sslVerify,
        // #endif
        complete: (response) => {
          response.config = handleRe
          if (this.validateStatus(response.statusCode)) { // 成功
            response = this.requestComFun(response)
            resolve(response)
          } else {
            response = this.requestComFail(response)
            reject(response)
          }
        }
      })
      if (handleRe.getTask) {
        handleRe.getTask(requestTask, handleRe)
      }
    })
  }

  get (url, options = {}) {
    return this.request({
      url,
      method: 'GET',
      ...options
    })
  }

  post (url, data, options = {}) {
    return this.request({
      url,
      data,
      method: 'POST',
      ...options
    })
  }

  // #ifndef MP-ALIPAY
  put (url, data, options = {}) {
    return this.request({
      url,
      data,
      method: 'PUT',
      ...options
    })
  }

  // #endif

  // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
  delete (url, data, options = {}) {
    return this.request({
      url,
      data,
      method: 'DELETE',
      ...options
    })
  }

  // #endif

  // #ifdef APP-PLUS || H5 || MP-WEIXIN
  connect (url, data, options = {}) {
    return this.request({
      url,
      data,
      method: 'CONNECT',
      ...options
    })
  }

  // #endif

  // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
  head (url, data, options = {}) {
    return this.request({
      url,
      data,
      method: 'HEAD',
      ...options
    })
  }

  // #endif

  // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
  options (url, data, options = {}) {
    return this.request({
      url,
      data,
      method: 'OPTIONS',
      ...options
    })
  }

  // #endif

  // #ifdef APP-PLUS || H5 || MP-WEIXIN
  trace (url, data, options = {}) {
    return this.request({
      url,
      data,
      method: 'TRACE',
      ...options
    })
  }

  // #endif

  upload (url, {
    // #ifdef APP-PLUS
    files,
    // #endif
    // #ifdef MP-ALIPAY
    fileType,
    // #endif
    filePath,
    name,
    header,
    formData = {},
    custom = {},
    params = {},
    getTask
  }) {
    return new Promise((resolve, reject) => {
      let next = true
      const globalHeader = { ...this.config.header }
      delete globalHeader['content-type']
      delete globalHeader['Content-Type']
      const pubConfig = {
        baseUrl: this.config.baseUrl,
        url,
        // #ifdef MP-ALIPAY
        fileType,
        // #endif
        filePath,
        method: 'UPLOAD',
        name,
        header: header || globalHeader,
        formData,
        params,
        custom: { ...this.config.custom, ...custom },
        getTask: getTask || this.config.getTask
      }
      // #ifdef APP-PLUS
      if (files) {
        pubConfig.files = files
      }
      // #endif
      const cancel = (t = 'handle cancel', config = pubConfig) => {
        const err = {
          errMsg: t,
          config: config
        }
        reject(err)
        next = false
      }

      const handleRe = { ...this.requestBeforeFun(pubConfig, cancel) }
      const _config = {
        url: Request.mergeUrl(handleRe.url, handleRe.baseUrl, handleRe.params),
        // #ifdef MP-ALIPAY
        fileType: handleRe.fileType,
        // #endif
        filePath: handleRe.filePath,
        name: handleRe.name,
        header: handleRe.header,
        formData: handleRe.formData,
        complete: (response) => {
          response.config = handleRe
          if (typeof response.data === 'string') {
            response.data = JSON.parse(response.data)
          }
          if (this.validateStatus(response.statusCode)) { // 成功
            response = this.requestComFun(response)
            resolve(response)
          } else {
            response = this.requestComFail(response)
            reject(response)
          }
        }
      }
      // #ifdef APP-PLUS
      if (handleRe.files) {
        _config.files = handleRe.files
      }
      // #endif
      if (!next) return
      const requestTask = uni.uploadFile(_config)
      if (handleRe.getTask) {
        handleRe.getTask(requestTask, handleRe)
      }
    })
  }

  download (url, options = {}) {
    return new Promise((resolve, reject) => {
      let next = true
      const pubConfig = {
        baseUrl: this.config.baseUrl,
        url,
        method: 'DOWNLOAD',
        header: options.header || this.config.header,
        params: options.params || {},
        custom: { ...this.config.custom, ...(options.custom || {}) },
        getTask: options.getTask || this.config.getTask
      }
      const cancel = (t = 'handle cancel', config = pubConfig) => {
        const err = {
          errMsg: t,
          config: config
        }
        reject(err)
        next = false
      }

      const handleRe = { ...this.requestBeforeFun(pubConfig, cancel) }
      if (!next) return
      const requestTask = uni.downloadFile({
        url: Request.mergeUrl(handleRe.url, handleRe.baseUrl, handleRe.params),
        header: handleRe.header,
        complete: (response) => {
          response.config = handleRe
          if (this.validateStatus(response.statusCode)) { // 成功
            response = this.requestComFun(response)
            resolve(response)
          } else {
            response = this.requestComFail(response)
            reject(response)
          }
        }
      })
      if (handleRe.getTask) {
        handleRe.getTask(requestTask, handleRe)
      }
    })
  }
}

/**
 * setConfig回调
 * @return {Object} - 返回操作后的config
 * @callback Request~setConfigCallback
 * @param {Object} config - 全局默认config
 */
/**
 * 请求拦截器回调
 * @return {Object} - 返回操作后的config
 * @callback Request~requestCallback
 * @param {Object} config - 全局config
 * @param {Function} [cancel] - 取消请求钩子，调用会取消本次请求
 */
/**
 * 响应拦截器回调
 * @return {Object} - 返回操作后的response
 * @callback Request~responseCallback
 * @param {Object} response - 请求结果 response
 */
/**
 * 响应错误拦截器回调
 * @return {Object} - 返回操作后的response
 * @callback Request~responseErrCallback
 * @param {Object} response - 请求结果 response
 */
```


## 文档说明

```js
- 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
- 支持全局挂载
- 支持多个全局配置实例
- 支持自定义验证器
- 支持文件上传/下载（如不使用可以删除class里upload，download 方法）
- 把 http-request 文件夹放到项目 utils/ 目录下

**Example**
---
创建实例

``` javascript
const http = new Request();
```

执行` GET `请求

``` javascript
http.get('/user/login', {params: {userName: 'name', password: '123456'}}).then(res => {

}).catch(err => {

})
// 局部修改配置，局部配置优先级高于全局配置
http.get('/user/login', {
    params: {userName: 'name', password: '123456'}, /* 会加在url上 */
    header: {}, /* 会覆盖全局header */
    dataType: 'json',
    // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
    custom: {auth: true}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
    // #ifndef MP-ALIPAY || APP-PLUS
    responseType: 'text',
    // #endif
    // #ifdef MP-ALIPAY
    timeout: 30000, // 仅支付宝小程序支持
    // #endif
    // #ifdef APP-PLUS
    sslVerify: true, // 验证 ssl 证书 仅5+App安卓端支持（HBuilderX 2.3.3+）
    // #endif
    // 返回当前请求的task, options。请勿在此处修改options。非必填
    getTask: (task, options) => {
         // setTimeout(() => {
         //   task.abort()
         // }, 500)
    }
}).then(res => {

}).catch(err => {

})
```
执行` POST `请求

``` javascript
http.post('/user/login', {userName: 'name', password: '123456'} ).then(res => {

}).catch(err => {

})
// 局部修改配置，局部配置优先级高于全局配置
http.post('/user/login', {userName: 'name', password: '123456'}, {
    params: {}, /* 会加在url上 */
    header: {}, /* 会覆盖全局header */
    dataType: 'json',
    // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
    custom: {auth: true}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
    // #ifndef MP-ALIPAY || APP-PLUS
    responseType: 'text',
    // #endif
    // #ifdef MP-ALIPAY
    timeout: 30000, // 仅支付宝小程序支持
    // #endif
    // #ifdef APP-PLUS
    sslVerify: true, // 验证 ssl 证书 仅5+App安卓端支持（HBuilderX 2.3.3+）
    // #endif
    // 返回当前请求的task, options。请勿在此处修改options。非必填
    getTask: (task, options) => {
         // setTimeout(() => {
         //   task.abort()
         // }, 500)
    }
}).then(res => {

}).catch(err => {

})
```
执行` upload `请求

``` javascript
  http.upload('api/upload/img', {
    params: {}, /* 会加在url上 */
    files: [], // 仅5+App支持
    fileType: 'image/video/audio', // 仅支付宝小程序，且必填。
    filePath: '', // 要上传文件资源的路径。
    // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
    custom: {auth: true}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
    name: 'file', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
    header: {},
    formData: {}, // HTTP 请求中其他额外的 form data
    // 返回当前请求的task, options。请勿在此处修改options。非必填
    getTask: (task, options) => {
      // task.onProgressUpdate((res) => {
      //   console.log('上传进度' + res.progress);
      //   console.log('已经上传的数据长度' + res.totalBytesSent);
      //   console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
      //
      //   // 测试条件，取消上传任务。
      //   if (res.progress > 50) {
      //     uploadTask.abort();
      //   }
      // });
    }
  }).then(res => {
    // 返回的res.data 已经进行JSON.parse
  }).catch(err => {

  })
```
**luch-request API**
--
``` javascript
 http.request({
    method: 'POST', // 请求方法必须大写
    url: '/user/12345',
    data: {
      firstName: 'Fred',
      lastName: 'Flintstone'
    },
    params: { // 会拼接到url上
      token: '1111'
    },
    // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
    custom: {}, // 自定义参数
    // 返回当前请求的task, options。请勿在此处修改options。非必填
    getTask: (task, options) => {
      // setTimeout(() => {
      //   task.abort()
      // }, 500)
    }
  })

  // 具体参数说明：[uni.uploadFile](https://uniapp.dcloud.io/api/request/network-file)
  http.upload('api/upload/img', {
    params: {}, /* 会加在url上 */
    files: [], // 仅5+App支持
    fileType: 'image/video/audio', // 仅支付宝小程序，且必填。
    filePath: '', // 要上传文件资源的路径。
    name: 'file', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
    header: {}, // 如填写，会覆盖全局header,
    custom: {}, // 自定义参数
    formData: {}, // HTTP 请求中其他额外的 form data
    // 返回当前请求的task, options。请勿在此处修改options。非必填
    getTask: (task, options) => {
      // setTimeout(() => {
      //   task.abort()
      // }, 500)
    }
  }).then(res => {
    // 返回的res.data 已经进行JSON.parse
  }).catch(err => {

  })

  // 具体参数说明：[uni.downloadFile](https://uniapp.dcloud.io/api/request/network-file?id=downloadfile)
  http.download('api/download', {
    params: {}, /* 会加在url上 */
    header: {}, // 如填写，会覆盖全局header,
    custom: {}, // 自定义参数
    // 返回当前请求的task, options。非必填
    getTask: (task, options) => {
      // setTimeout(() => {
      //   task.abort()
      // }, 500)
    }
  }).then(res => {

  }).catch(err => {

  })
```


请求方法别名 / 实例方法

``` javascript
http.request(config)
http.get(url[, config])
http.upload(url[, config])
http.delete(url[, data[, config]])
http.head(url[, data[, config]])
http.post(url[, data[, config]])
http.put(url[, data[, config]])
http.connect(url[, data[, config]])
http.options(url[, data[, config]])
http.trace(url[, data[, config]])
```

**全局请求配置**
--
``` javascript
{
    baseUrl: '',
    header: {
      'content-type': 'application/json'
    },
    method: 'GET',
    dataType: 'json',
    // #ifndef MP-ALIPAY || APP-PLUS
    responseType: 'text',
    // #endif
    // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
    custom: {}, // 全局自定义参数默认值
    // #ifdef MP-ALIPAY
    timeout: 30000,
    // #endif
    // #ifdef APP-PLUS
    sslVerify: true,
    // #endif
    // 局部优先级高于全局，返回当前请求的task,options。请勿在此处修改options。非必填
    // getTask: (task, options) => {
    // 相当于设置了请求超时时间500ms
    //   setTimeout(() => {
    //     task.abort()
    //   }, 500)
    // }
  }
```


全局配置修改` setConfig `

``` javascript
/**
     * @description 修改全局默认配置
     * @param {Function}
*/
http.setConfig((config) => { /* config 为默认全局配置*/
    config.baseUrl = 'http://www.bbb.cn'; /* 根域名 */
    config.header = {
        a: 1,
        b: 2
    }
    return config
})
```

自定义验证器` validateStatus `

``` javascript
/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
*/
http.validateStatus = (statusCode) => { // 默认
     return statusCode === 200
}

// 举个栗子
http.validateStatus = (statusCode) => {
   return statusCode && statusCode >= 200 && statusCode < 300
}
```

**拦截器**
--

在请求之前拦截

``` javascript
/**
 * @param { Function} cancel - 取消请求,调用cancel 会取消本次请求，但是该函数的catch() 仍会执行; 不会进入响应拦截器
 *
 * @param {String} text ['handle cancel'| any] - catch((err) => {}) err.errMsg === 'handle cancel'。非必传，默认'handle cancel'
 * @cancel {Object} config - catch((err) => {}) err.config === config; 非必传，默认为request拦截器修改之前的config
 * function cancel(text, config) {}
 */
 http.interceptor.request((config, cancel) => { /* cancel 为函数，如果调用会取消本次请求。需要注意：调用cancel,本次请求的catch仍会执行。必须return config */
    config.header = {
      ...config.header,
      a: 1
    }
    // if (config.custom.auth) {
    //   config.header.token = 'token'
    // }
    /**
    if (!token) { // 如果token不存在，调用cancel 会取消本次请求，不会进入响应拦截器，但是该函数的catch() 仍会执行
      cancel('token 不存在', config) //  把修改后的config传入，之后响应就可以拿到修改后的config。 如果调用了cancel但是不传修改后的config，则catch((err) => {}) err.config 为request拦截器修改之前的config
    }
    **/
    return config
  })
```

在请求之后拦截

``` javascript
http.interceptor.response((response) => { /* 对响应成功做点什么 （statusCode === 200），必须return response*/
  //  if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
  //    return Promise.reject(response)
  //  }
 // if (response.config.custom.verification) { // 演示自定义参数的作用
  //   return response.data
  // }
  console.log(response)
  return response
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200），必须return response*/
  console.log(response)
  return response
})
```

**常见问题**
--
1. 为什么会请求两次？
    - 总有些小白问这些很那啥的问题，有两种可能，一种是‘post三次握手’，还有一种可能是`本地访问接口时跨域请求，所以浏览器会先发一个option 去预测能否成功，然后再发一个真正的请求`（自己观察请求头，Request Method，百度简单请求）。
2. 如何跨域？
    - 问的人不少，可以先百度了解一下。<a href="https://ask.dcloud.net.cn/article/35267" target="_blank">如何跨域</a>
3. post 怎么传不了数组的参数啊？
    - <a href="https://uniapp.dcloud.io/api/request/request" target="_blank">uni-request</a> <br>
      可以点击看一下uni-request 的api 文档，data支持的文件类型只有<code>Object/String/ArrayBuffer</code>这个真跟我没啥关系 0.0
4. 'Content-Type' 为什么要小写？
    - hbuilderX 更新至‘2.3.0.20190919’ 后，uni.request post请求，如果 ‘Content-Type’ 大写，就会在后面自动拼接‘ application/json’，请求头变成
      `Content-Type: application/json;charset=UTF-8 application/json`，导致后端无法解析类型，`Status Code 415`，post 请求失败。但是小写就不会出现这个问题。至于为什么我也没有深究，我现在也不清楚这是他们的bug,还是以后就这样规范了。我能做的只有立马兼容，至于后边uni官方会不会继续变动也不清楚。
````