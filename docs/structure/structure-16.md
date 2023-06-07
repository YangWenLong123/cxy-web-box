常规axios封装，根据实际场景进行调整

```js
import Vue from "vue";
import Axios from "axios";
import qs from "qs";
import Cookie from 'js-cookie';

let sessionTicket = '';//接口请求需要在Headers中携带的参数

/**
 * 自定义axios实例/server
 * @param   {string}       baseURL              //这里可以设置环境变量切换不同环境url
 * @param   {Number}       timeout              //请求超时
 * @param   {String}       method               //请求方法,默认为get
 * @param   {Boolean}      withCredentials      //表示跨域请求是否使用凭证
 * @param   {Function}     transformRequest     //只能用在PUT，GET，POST上，向服务器发送数据前修改请求数据
 */
const server = axios.create({
    baseURL: '',
    timeout: 5000,
    method: 'post',
    withCredentials: false,
    transformRequest: [function (data) {
        let resData = data;

        if(!(resData instanceof FormData)) {
            resData = Qs.stringify(resData);
        }
        return resData;
    }]
});

/**
 * 添加请求拦截器
 */
server.interceptors.request.use(function(config) {
    //发送请求之前做些什么
    config.headers['session-ticket'] = sessionTicket;
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    return config;
}, function (error) {
    return Promise.reject(error);
});

/**
 * 添加响应拦截器,对响应数据做点什么
 */
server.interceptors.response.use(function(response) {
    if(response.data.code == 1001) {
        //TODO
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

/**
 * 添加请求超时拦截器
 */
server.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;

    if(!config || !config.retry) return Promise.reject(err);
    config.__retryCount = config.__retryCount || 0;
    if(config.__retryCount >= config.retry) {
        // 请求超时可以在这里这里设置跳转页面

        return Promise.reject(err);
    }
    config.__retryCount += 1;
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });

    return backoff.then(function() {
        return server(config);
    });
});

/**
 * 封装GET方法
 * @param   {String}    url             //url
 * @param   {Object}    uparamsrl       //参数
 */
export function get(url,params={}){
    return new Promise((resolve,reject) => {
        server.get(url,{
            params: Qs.parse(params)
        }).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err);
        });
    });
}

/**
 * 封装POST方法
 * @param   {String}    url             //url
 * @param   {Object}    data            //参数
 */
export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        server.post(url,Qs.parse(data)).then(response => {
            resolve(response.data);
        },
        err => {
            reject(err);
        });
    });
}
```

```js
import {post, get} from '@/assets/js/require';
Vue.prototype.$post = post;
Vue.prototype.$get = get;

this.$post('',{}).then(res=> {
  //
});
```

贪婪封装

```js
import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import store from '../store/Store'

let bus = new Vue()

// axios.defaults.timeout = 5000

let normalAxios = axios.create() // 普通 axios
let greedAxios = axios.create() // 贪婪型 axios，当前 URL 存在正在进行的请求时，abort 掉前面的请求，以最后一次为准
let cancel
let promiseArr = {}
const CancelToken = axios.CancelToken

// 普通请求拦截器
normalAxios.interceptors.request.use(
  config => {
    let token = store.state.token
    if (token) {
      config.headers.Authorization = `${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

normalAxios.interceptors.response.use(
  response => {
    return response
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 401 :
          store.dispatch('logout')
          router.replace({
            path: '/login'
          })
      }
    }
    return Promise.reject(err)
  })

// 贪婪型请求拦截器
// 当前 URL 存在正在进行的请求时，abort 掉前面的请求，以最后一次为准
greedAxios.interceptors.request.use(
  config => {
    let token = store.state.token
    if (token) {
      config.headers.Authorization = `${token}`
    }
    if (promiseArr[config.url]) {
      promiseArr[config.url]('greed request abort')
      promiseArr[config.url] = cancel
    } else {
      promiseArr[config.url] = cancel
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

greedAxios.interceptors.response.use(
  response => {
    return response
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 401 :
          store.dispatch('logout')
          router.replace({
            path: '/login'
          })
      }
    }
    return Promise.reject(err)
  })

// 判断元素类型
function toType (obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}

// 参数过滤函数
function filterNull (o) {
  if (toType(o) === 'file') {
    return o
  }
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

function apiAxios ({method, url, params, config, axiosType}) {
  if (params) {
    params = filterNull(params)
  }
  let axiosObj = axiosType === 'greed' ? greedAxios : normalAxios
  let initConfig = {
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    withCredentials: false,
    cancelToken: new CancelToken(c => {
      if (axiosType === 'greed') {
        cancel = c
      }
    })
  }
  let axiosConfig
  if (config && toType(config) === 'object') {
    axiosConfig = Object.assign(initConfig, config)
  } else {
    axiosConfig = initConfig
  }
  return axiosObj(axiosConfig)
    .then(function (res) {
      if (res.data.code === 0) {
        return Promise.resolve(res.data)
      } else {
        bus.$message.error(res.data.message)
        return Promise.reject(res.data)
      }
    })
    .catch(function (err) {
      console.log(err)
      if (!err.code && err.constructor.name !== 'Cancel') {
        bus.$message.error('请求失败')
      }
      return Promise.reject(err)
    })
}

export default {
  get: function (url, params, config) {
    return apiAxios({method: 'GET', url, params, config})
  },
  greedGet: function(url, params, config) {
    return apiAxios({method: 'GET', url, params, config, axiosType: 'greed'})
  },
  post: function (url, params, config) {
    return apiAxios({method: 'POST', url, params, config})
  },
  put: function (url, params, config) {
    return apiAxios({method: 'PUT', url, params, config})
  },
  delete: function (url, params, config) {
    return apiAxios({method: 'DELETE', url, params, config})
  }
}
```

参考

axios-npm

<https://www.npmjs.com/package/axios>

axios中文文档

<https://www.kancloud.cn/yunye/axios/234845>