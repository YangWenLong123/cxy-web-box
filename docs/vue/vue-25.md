设计模式是解决软件开发过程某些特定问题而提出的一系列解决方案或者思路，使用设计模式可以帮助我们提高代码的可重用性、可扩展性和可维护性等，综合来说就是提高代码的健壮性。各行各业有属于自己的套路，比如音乐上的和弦套路，设计模式就是编程领域的套路，使用套路能让我们少走弯路，提高工作效率。今天给大家分享的是**Javascript设计模式之装饰模式**及其在业务代码上的应用。

## 定义与特征

**装饰者(decorator)模式**能够在不改变对象自身的基础上，动态的给某个对象添加额外的职责，不会影响原有接口的功能。
根据定义，我们能够使用装饰模式去扩展已有的方法，优势是不需要修改原来的方法。

## 代码示例

比如我们要实现在调用某个方法的时候，打印日志：

```js
// 定义一个log方法
function log(fn){
    return function(...arg){
        console.log("日志:",`${fn.name}方法调用了`)
        fn.call(this,...arg)
    }
}
// 使用log方法装饰需要打印日志的方法
function test(){
    console.log("test方法本尊")
}
const newTest = log(test)
newTest()
```

又比如使用装饰模式实现防抖：

```js
function debounce(fn,wait){
    let timer
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.call(this,...args)
        },wait)
    }
}
document.querySelector('#btn').onclick = debounce((a) => {
	console.log('点击方法调用了')
},500)
```

通过以上示例，可以确认的是装饰模式的确能够在扩展方法，但有一个显而易见的问题————函数嵌套函数，可读性不高
不过庆幸的是，es6出了新语法————装饰器。

使用装饰器，以上示例中函数嵌套函数就变成了下面这种：

```js
@log
function test(){
    console.log("test方法本尊")
}

@debounce(500)
function onBtnClick(){
    console.log('点击方法调用了')
}
```

## 装饰器

装饰器是ES的一种新语法，能够增强类与方法,但是目前还处于提案的第三阶段，暂未定案。
因此需要注意的是，在普通js项目中，需要借助babel编译。

如何定义一个装饰器？
以上文中log装饰函数为例，定义一个log装饰器：

```js
const log = function (target, name, descriptor) {
    const method = descriptor.value
    descriptor.value = function (...args) {
        console.log(`调用${name}方法了`)
        method.call(this, ...args)
    }
}

// 调用方式
@log
function test(){
    console.log("test方法本尊")
}
```

以上就是一个简单的装饰器，如果需要在装饰器中传递参数呢？
答案是可以创建一个高阶函数，下面以防抖装饰器为例

```js
const debounce = function (wait) {
    return function(target, name, descriptor){
        const method = descriptor.value
        let timer
        descriptor.value = function (...args) {
            setTimeout(()=>{
                method.call(this, ...args)
            },wait)
        }
    }
}

// 调用方式
@debounce(500)
function onBtnClick(){
    console.log('点击方法调用了')
}
```

### 如何在Vue项目中使用装饰器？

除了一些老项目，现在是用vue-cli3及其以上版本创建的vue项目默认已经支持了装饰器语法。
如果项目中使用了eslint，那么需要在jsconfig.json或者eslintrc.js文件中新增以下配置

```js
"parserOptions":{
    "ecmaFeatures":{
      "legacyDecorators":true,
    },
}
```

如果vscode中安装了Vetur插件，在装饰器代码处可能会有类似**Property assignment expected.Vetur(1136)** 的红线提示，虽然不影响使用，但是会逼死强迫症，
那么想关闭这个提示，需要在vscode的setting.json中新增以下配置：

```js
"vetur.validation.script": false
```

接下来就可以愉快的使用装饰器啦

### vue项目中装饰器的应用

通常，提交表单之前需要验证参数有没有通过，验证通过了才调用提交的接口，代码一般是这样的：

```js
submitForm() {
  this.$refs['formName'].validate(async (valid) => {
    if (valid) {
      try {
        // 调用接口
        await this.fetchApi();
        this.$message.success('提交成功')
      } catch(error) {
        console.log(error);
      }
    } else {
      console.log('error submit');
      return false;
    }
  });
}
```

以上代码的问题显而易见，既有if...else，又有try...catch，而且每个带有参数验证的表单都需要这么写，很麻烦，那么如何使用装饰器去优化呢？

```js
export function validate(refName) {
  return function (target,name, descriptor) {
    const fn = descriptor.value;
    descriptor.value = function (...args) {
      this.$refs[refName].validate(valid => {
        if (valid) {
          fn.call(this, ...args);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    };
  };
}

// 调用
import { Validate } from '@/utils/decorator'
export default {
    methods:{
        @Validate('formName')
        async submitForm() {
            try {
                // 调用接口
                await this.handleTest();
                this.$message.success('提交成功')
            } catch(error) {
                console.log(error);
            }
        }
    }
}
```

同理，我们还可以封装”确认装饰器“:

```js
export function Confirm(config) {
  return function (target, name, descriptor) {
    const fn = descriptor.value;
    let _instance = null;
    descriptor.value = function (...args) {
      Vue.prototype
        .$confirm(
          config.message,
          config.title,
          Object.assign(
            {
              beforeClose: (action, instance, done) => {
                _instance = instance;
                if (action === "confirm") {
                  instance.confirmButtonLoading = true;
                  fn.call(this, instance, done, ...args);
                } else {
                  done();
                }
              },
            },
            config.options || {}
          )
        )
        .then(() => {
          _instance.confirmButtonLoading = false;
        });
    };
    return descriptor;
  };
}

// 调用
import { Confirm } from "@/utils/decorator";
export default {
    methods:{
        @Confirm({
            title: "提示",
            message: "此操作将永久删除该文件, 是否继续?",
        })
        handleDelete(instance, done) {
            setTimeout(() => {
                done();
                setTimeout(() => {
                    instance.confirmButtonLoading = false;
                    this.$message({
                    type: "success",
                    message: "删除成功!",
                    });
                }, 300);
            }, 2000);
        }
    }
}
```

## 总结

装饰模式可以给方法添加功能，提高代码复用性，而装饰器是装饰模式的一种具体实现，在日常业务开发中，可以把功能性代码封装成装饰器，用来装饰业务代码，可以给减少代码嵌套，提高可读性。