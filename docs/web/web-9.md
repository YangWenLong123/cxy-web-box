#### 代码/MessageSocket.js

```js
export default class MessageSocket {
    constructor (context, object) {
        this.json = object || {};//参数
        this.context = context;//this
        this.ws = null;//socket对象
        this.socketUrl = '';//socket地址
        this.isHeartCheck = false;//是否开启心跳检测
        this.reConnectTime = 0;//断线重连间隔时间
        this.heartServerTimeout = null;//心跳检测定时器
        if(JSON.stringify(this.json) !== '{}') {
            this.isHeartCheck = this.json.isHeartCheck;
            this.socketUrl = object.socketUrl;
            this.reConnectTime = object.reConnectTime;
        }
        this.init();//初始化连接
    }

    init () {
        if(!Reflect.has(window, "WebSocket")) {
            this.context.$notify({
                title: '提示',
                message: '您的浏览器不支持WebSocket',
                type: 'warning',
                duration: 2000
            });
            return false;
        }
        if(!this.socketUrl) {
            this.context.$notify({
                title: '提示',
                message: 'WebSocket地址为空',
                type: 'warning',
                duration: 2000
            });
            return false;
        }

        this.ws = new WebSocket(this.socketUrl);
        this.eventListenerSocket();
        if(this.isHeartCheck) {
            //TODO 和后端约定
        }
    }

    eventListenerSocket () {
        this.ws.addEventListener('open', () => {
            //TODO 默认连接触发
        });

        this.ws.addEventListener('message', evt => {
            this.monitorMessage(evt.data);
        });

        this.ws.addEventListener('error', evt => {
            console.log('连接异常', evt);
        });

        this.ws.addEventListener('close', evt => {
            this.context.commit('global/SET_READY_STATE', false);

            //断线重连
            clearTimeout(this.heartServerTimeout);
            this.heartServerTimeout = setTimeout(()=>{
                this.context.commit('global/RELINK_SOCKET', this.context.state.global.socket);
            }, this.reConnectTime);
            console.log('连接已关闭', evt);
        });
    }

    monitorMessage (data) {
        console.log('----接收数据----', data);
    }
}
```

#### 状态管理/global.js

```js
import MessageSocket from '@/assets/js/socket.js';
export default {
    namespaced: true,
    state: {
        readyState: '',//socket连接状态
        socket: {},//连接参数
    },
    getters () {},
    mutations: {
        //连接socket
        INIT_CONNECT_SOCKET (state, object) {
            let socket = new MessageSocket(this, {
                isHeartCheck: object.isHeartCheck,
                socketUrl: object.socketUrl,
                reConnectTime: object.reConnectTime
            });

            state.socket = {
                ...object
            };

            setTimeout(()=>{
                let readyState = socket.ws.readyState === WebSocket.OPEN;

                state.readyState = readyState;

                console.log(readyState ? 'socket连接成功' : 'socket连接失败');
            },500);
        },

        //设置socket状态
        SET_READY_STATE (state, redyState) {
            state.readyState = redyState;
        },

        //断线重连
        RELINK_SOCKET (state ,object) {
            if(!state.readyState) {
                this.commit('global/INIT_CONNECT_SOCKET', object);
            }
        }
    },
    actions () {
    }
};
```

#### 使用

可以在本地编写一个socket服务，用于服务端.

```js
this.$store.commit('global/INIT_CONNECT_SOCKET', {
  isHeartCheck: true,
  socketUrl: 'ws://127.0.0.1:6080',//测试地址
  reConnectTime: 2000
} );
```