## 原理

-   Vue.js 是采用 Object.defineProperty 的 getter 和 setter，并结合观察者模式来实现数据绑定的。当把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用 Object.defineProperty 将它们转为 getter/setter。用户看不到 getter/setter，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。

## Object.defineProperty

-   定义

```js
Object.defineProperty()方法会直接在一个对象上定义一个新属性，或者修改一个对象现有属性，这个方法执行完成后，会返回修改后的这个对象。
```

-   语法

```js
Object.defineProperty(obj, prop, descriptor)
```

-   obj 要处理的目标对象
-   prop 要定义或者修改的属性名称
-   descriptor 将被定义或修改的属性描述符

<!---->

-   使用方法

```js
var obj = {};
obj.name = 'hunger';
obj['age'] = 3;
Object.defineProperty(obj, 'intro', {
    value: 'hello world'
});
```

以上三种方法都可以用来定义/修改一个属性。

* * *

`configurable`

```js
var obj = {};
Object.defineProperty(obj, 'intro', {
    configurable: false,
    value: 'hello world'
});
obj.intro = 'hello';
console.log(obj.intro); //'hello world'
delete obj1.intro;
console.log(obj1.intro); //'hello world'
```

`configurable` 默认值为false 不能通过Object.defineProperty 修改属性，也无法删除该属性。

* * *

`enumberable`

```js
var obj2 = {name: 'zhangsan'};
Object.defineProperty(obj2, 'age', {
    value: 3,
    enumerable: false
});
for(var key in obj2) {
    console.log('obj2', key); //obj2 name
}
```

`enumberable` 遍历对象的时候会忽略当前属性，默认值为false

* * *

`writable`

```js
var obj3 = {name: 'lisi'};
Object.defineProperty(obj3, 'age', {
    value: 3,
    writable: false
})
obj3.age = 4;
console.log(obj3.age); //3
```

`writable` 默认为false 修改对象时，无法对属性进行修改

* * *

存取描述符

-   get:一个给属性提供getter 的方法，如果没有getter 则为undefined，该方法返回值被用作属性值，默认为undefined。
-   set:一个给属性提供setter的方法，如果没有setter 则为undefined。该方法将接受唯一参数，并将参数的新值分配给该属性。默认为undefined

```js
var obj4 = {};
var age;
Object.defineProperty(obj4, 'age', {
    get: function() {
        console.log('get age');
        return age;
    },
    set: function(val) {
        console.log('set age');
        age = val;
    }
})
obj4.age = 100; // set age
console.log(obj4.age); //get age
```

数据描述符和存取描述符是不能同时存在的。

## Object.defineProperty实现数据双向绑定

```js
<input type='text' id='txt' />
<p id='showTxt'></p>
const obj = {};
Object.defineProperty(obj, 'txt', {
    get: function () {
        return obj;
    },
    set: function (val) {
        document.getElementById('showTxt').innerHTML = val;
    }
})
document.addEventListener('keyup', function(e){
    obj.txt = e.target.value;
})
```

## Proxy实现数据双向绑定

```js
const obj = {};
const newObj = new Proxy(obj,{
  get: function(target, key, receiver){
    return Reflect.get(target, key, receiver)
  },
  set: function (target, key, value, receiver){
    if(key === 'text'){
      document.getElementById('txt').value = value;
      document.getElementById('showTxt').innerHTML = value;

    }
    return Reflect.set(target, key, value, receiver)
  }
})
document.addEventListener('keyup',function(e){
newObj.text = e.target.value;
})
```

## 实现mvvm数据单项绑定

-   概念

<!---->

 -     MVVM（Model-View-ViewModel）是一种用于吧数据和UI分离的设计模式。 MVVM中的Model标识应用程序使用的数据。Model保存信息，但通常不处理行为，不会对信息进行再次加工。数据的格式化是由View处理的。行为一般认为是业务逻辑，封装在ViewModel中。
    -   View 是与用户进行交互的桥梁。
    -   ViewModel 充当数据转换器，将Model信息转换为View信息，将命令从View传递到Model。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe4b3d37a4ef495086915d02bb439263~tplv-k3u1fbpfcp-zoom-1.image)

-   思考

<!---->

 -     假设有如下代码，data里面的name 会和视图中{{name}}一一映射，修改data里的值，会直接引起视图中对应的数据变化。

```js
<body>
    <div id="app">{{name}}</div>
    <script>
        function mvvm() {
            //todo
        }
        var vm = new mvvm({
            el: '#app',
            data: {
                name: 'along'
            }
        })
    </script>
</body>
```

-   如何实现上述的MVVM？

```js
<div id="app"><h1>{{name}}-{{age}}</h1></div>
    <script>
    function observe(data) {
        if(!data || typeof data !== 'object') return;
        for(var key in data) {
            let val = data[key];
            let subject = new Subject();
            Object.defineProperty(data, key, {
                enumerable: true,
                configurable: true,
                get: function() {
                    // console.log(val);
                    if(currentObserver) {
                        currentObserver.subscribeTo(subject);
                    }
                    return val;
                },
                set: function(newVal) {
                    val = newVal;
                    subject.notify();
                }
            })
            if(typeof val === 'object') {
                observe(val);
            }
        }
    }
    let id = 0;
    let currentObserver = null;
    class Subject {
        constructor() {
            this.id = id++;
            this.observers = [];
        }
        addObserver(observer) {
            this.observers.push(observer);
        }
        removeObserver(observer) {
            var index = this.observers.indexOf(observer);
            if(index > -1) {
                this.observers.splice(index, 1);
            }
        }
        notify() {
            this.observers.forEach(observer=> {
                observer.update();
            })
        }
    }
    class Observer{
        constructor(vm, key, cb) {
            this.subjects = {};
            this.vm = vm;
            this.key = key;
            this.cb = cb;
            this.value = this.getValue();
        }
        update() {
            let oldVal = this.value;
            let value = this.getValue();
            console.log(value, oldVal)
            if(value !== oldVal) {
                this.value = value;
                this.cb.bind(this.vm)(value, oldVal);
            }
        }
        subscribeTo(subject) {
            if(!this.subjects[subject.id]) {
                console.log('subscribeTo...', subject);
                subject.addObserver(this);
                this.subjects[subject.id] = subject;
            }
        }
        getValue() {
            currentObserver = this;
            let value = this.vm.$data[this.key];
            currentObserver = null;
            return value;
        }
    }
    class mvvm {
        constructor(opts) {
            this.init(opts);
            observe(this.$data);
            this.compile();
        }
        init(opts) {
            this.$el = document.querySelector(opts.el);
            this.$data = opts.data;
            this.observers = [];
        }
        compile() {
            this.traverse(this.$el);
        }
        traverse(node) {
            console.log(node)
            if(node.nodeType === 1) {
                node.childNodes.forEach(childNode=>{
                    this.traverse(childNode);
                })
            }else if(node.nodeType === 3) {
                //文本
                this.renderText(node);
            }
        }
        renderText(node) {
            let reg = /{{(.+?)}}/g
            let match;
            while(match = reg.exec(node.nodeValue)) {
                let raw = match[0];
                let key = match[1].trim();
                node.nodeValue = node.nodeValue.replace(raw, this.$data[key]);
                new Observer(this, key, function(val, oldVal) {
                    node.nodeValue = node.nodeValue.replace(oldVal, val);
                })
            }
        }
    }
    let vm = new mvvm({
        el: '#app',
        data: {
            name: 'wenlong',
            age: 23
        }
    })
    setInterval(function() {
        vm.$data.age++
    }, 1000);
    </script>
```