#### 单例模式

-   定义：保证一个类只有一个实例，并提供一个访问它的全局访问点
-   需求：一些对象我们往往只需要一个，比如线程池，全局缓存，浏览器中的window对象，登陆浮窗等。
-   优点：可以用来划分命名空间，减少全局变量的数量/可以被实例化，且再次实例化生成的也是第一个实例

```js
let Leader = (()=>{
    let _instance = null;
    //一个待实例化的类
    function _module(){
        this.name = 'xxx';
        this.callLeader = ()=>{
            return 'The Leader Is ' + this.name;
        }
        this.setLeader = (name) => {
            this.name = name;
        }
    }
    return {
        getInstance:()=>{
            if(!_instance){
                _instance = new _module();
            }
            return _instance;
        }
    }
})();
let leader_01 = Leader.getInstance();
leader_01.setLeader('hhh');

let leader_02 = Leader.getInstance();
log(leader_02.callLeader())

log(leader_01 === leader_02);   //true
结论：并不是通过new新获取的对象，它们都是同一个对象。
```