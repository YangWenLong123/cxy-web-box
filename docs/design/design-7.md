## 前言

对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。

## 类图分析

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90b37519656f4519bf6a5f2c177b530e~tplv-k3u1fbpfcp-zoom-1.image)

-   左侧是Observer，就是观察者,他有一个update方法，当观察者需要被触发的时候就会执行update().
-   右侧是主题，主题可以绑定多个观察者，放在observers里面。主题可以设置状态setState(),可以获取状态getState().当状态设置完成后,他会触发所有的观察者notifyAllObservers(),并触发所有观察者里面的update()方法。
-   观察者定义好后，它就等待着被触发，然后执行更新.

## 案例演示

```js
// 主题，接收状态变化，触发每个观察者
class Subject {
  constructor() {
      this.state = 0
      this.observers = []
  }
  getState() {
      return this.state
  }
  setState(state) {
      this.state = state
      this.notifyAllObservers()
  }
  attach(observer) {
      this.observers.push(observer)
  }
  notifyAllObservers() {
      this.observers.forEach(observer => {
          observer.update()
      })
  }
}

// 观察者，等待被触发
class Observer {
  constructor(name, subject) {
      this.name = name
      this.subject = subject
      this.subject.attach(this)
  }
  update() {
      console.log(`${this.name} update, state: ${this.subject.getState()}`)
  }
}

// 测试代码
let s = new Subject()
new Observer('o1', s)
new Observer('o2', s)

s.setState(1)


-----------------------执行结果-----------------------
  o1 update, state: 1
	o2 update, state: 1
```