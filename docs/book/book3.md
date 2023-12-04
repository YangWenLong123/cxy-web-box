## 前言

近期写了一个医院端项目，需要用到扫码枪识别条形码、二维码的内容，经过一番尝试，也完成了这个功能，现在就分享一下这个接入流程。

## 扫码枪原理

1. 光源发出一束光线。

2. 光线经过透镜集中成窄而亮的光束。

3. 光束照射在被扫描物体上的条形码或二维码上。

4. 条形码或二维码中黑色条和白色空白反射不同量的光。

5. 光电元件（如光电二极管或 CCD 线性阵列传感器）接收到反射光，并产生一个电信号。

6. 电信号经过放大和处理后，转换成数字数据。

7. 数字数据传输到连接的设备（如电脑、收银机等）进行进一步分析和使用。

## 扫码枪作用

1. 快速读取条形码或二维码: 扫描枪能够迅速而准确地捕捉和解码条形码或二维码上所包含的信息，比手工输入更高效。

2. 数据采集与自动化: 扫描枪使得数据采集过程自动化和准确性提高，避免了人工录入的错误和耗时。

3. 应用广泛: 扫描枪用于各行各业，如商超零售、仓储物流、图书馆、医疗保健等领域，有效地促进了工作效率和减轻了人员负担。

## 接入到 web 项目

### 订阅

```js
//订阅
import keypressServer from "@/utils/common/keypress";

keypressServer.subscribe(
  "name",
  (data) => {
    // TODO
  },
  { single_scene: false }
);
```

```js
// 取消订阅
keypressServer.unsubscribe("name");
```

```js
// keypress.js
class keypressServer {
  constructor() {
    this.observers = []; //订阅内容
    this.callback = null;
    // 上一次记录的时间戳
    this.lastTimeStamp = null;
    // 记录内容
    this.codeString = "";
    // 是否处在扫码枪模式
    this.isScanInput = false;
    this.addEventKeypress();
  }

  addEventKeypress() {
    console.log("###########监听影像式条码扫描平台###############");
    window.addEventListener("keypress", (e) => {
      this.keypressEnterValue(e);
    });
  }

  keypressEnterValue(e) {
    // 监听键盘事件
    const timeStamp = e.timeStamp;
    // console.log('timeStamp', e.timeStamp);
    // 第一次记录字符
    if (this.lastTimeStamp == null) {
      this.lastTimeStamp = timeStamp;
    }
    // 时间间隔
    const diffTime = timeStamp - this.lastTimeStamp;
    // 是否在 正常的扫码枪输入的时间间隔 范围之内
    const isNormalDiffTime = diffTime < 50;
    // 是否 进入扫码模式 且在允许的时间间隔 范围之内
    const isScanDiffTime =
      this.isScanInput && !isNormalDiffTime && diffTime < 1000;

    // 距上次记录间隔小于指定时间，或者 如果是扫码枪模式，允许一次较大时间
    if (isNormalDiffTime || isScanDiffTime) {
      if (isScanDiffTime) {
        this.isScanInput = false;
      }
      // 如果是回车
      if (e.keyCode == "13") {
        // 有内容，则发送事件, 没有则跳出
        if (!this.codeString) return;
        // 提取出记录到的内容
        const Result = this.codeString;
        this.codeString = "";
        // 触发事件
        setTimeout(async () => {
          this.keypressValue(Result);
        }, 0);
      } else {
        // 小于100ms认为接下来是扫码枪模式
        if (isNormalDiffTime) this.isScanInput = true;
        // 则堆加入内容
        this.codeString += String.fromCharCode(e.keyCode);
      }
    } else {
      this.isScanInput = false;
      if (e.keyCode != "13") this.codeString = String.fromCharCode(e.keyCode);
    }
    // 记录当前输入的时间
    this.lastTimeStamp = timeStamp;
  }

  /**
   * @description 扫码内容处理
   * @param {*} result
   */
  keypressValue(result) {
    console.log("Result:" + result, "Length:" + String(result).length);

    if (result) {
      this.release(result);
    }
  }

  // 订阅
  subscribe(name, callback, config = { single_scene: false }) {
    const is =
      this.observers.filter((item) => item?.sub_name === name).length > 0;
    if (is) return;

    if (config.single_scene && this.observers.length) {
      this.observers.map((item) => (item.single_scene = false));
    }

    this.observers.push({
      sub_name: name,
      callback: callback || function () {},
      single_scene: config.single_scene,
    });

    console.log("observers", this.observers);
  }

  // 取消订阅
  unsubscribe(name, config = { single_scene: false }) {
    if (config.single_scene) {
      this.observers.map((item) => (item.single_scene = false));
    }
    const names = this.observers.map((item) => item?.sub_name);
    const i = names.indexOf(name);
    if (i === -1) return;

    this.observers.splice(i, 1);
  }

  // 发送
  release(result) {
    if (this.observers.length) {
      const isSingle =
        this.observers.filter((item) => !!item.single_scene).length > 0;

      if (isSingle) {
        this.observers.forEach(async (el) => {
          if (el?.single_scene) await el.callback(result);
        });
      } else {
        this.observers.forEach(async (el) => {
          await el.callback(result);
        });
      }
    }
  }
}

export default new keypressServer();
```
