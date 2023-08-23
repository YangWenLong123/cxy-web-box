## 手写功能函数

1. [isRef()](#isref)
2. [unRef](#unref)
3. [toRef](#toref)
4. [toRefs](#torefs)
5. [toValue](#tovalue)
6. [isProxy](#isproxy)
7. [isReactive](#isreactive)
8. [isReadonly](#isreadonly)
9. [shallowReactive](#shallowreactive)
10. [reactive](#reactive)
11. [shallowRef](#shallowref)
12. [ref](#ref)
13. [shallowReadonly](#shallowreadonly)
14. [readonly](#readonly)
15. [isShallow](#isshallow)

## 仓库源码
  https://github.com/vuejs/vue/blob/main/src/v3/reactivity/ref.ts

  https://github.com/vuejs/vue/blob/main/src/v3/reactivity/reactive.ts

## isRef

```js
function isRef(obj) {
  return obj && obj.__v_isRef
}
```

## unRef

```js
function unRef(ref) {
  return isRef(ref) ? ref.value : ref
}

```

## toRef

```js
export function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K
): ToRef<T[K]>

export function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K,
  defaultValue: T[K]
): ToRef<Exclude<T[K], undefined>>

export function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K,
  defaultValue?: T[K]
): ToRef<T[K]> {
  const val = object[key]
  if (isRef(val)) {
    return val as any
  }
  const ref = {
    get value() {
      const val = object[key]
      return val === undefined ? (defaultValue as T[K]) : val
    },
    set value(newVal) {
      object[key] = newVal
    }
  } as any
  def(ref, RefFlag, true)
  return ref
}
```

## toRefs

```js
export type ToRefs<T = any> = {
  [K in keyof T]: ToRef<T[K]>
}

export function toRefs<T extends object>(object: T): ToRefs<T> {
  if (__DEV__ && !isReactive(object)) {
    warn(`toRefs() expects a reactive object but received a plain one.`)
  }
  const ret: any = isArray(object) ? new Array(object.length) : {}
  for (const key in object) {
    ret[key] = toRef(object, key)
  }
  return ret
}

```
## toValue


## isProxy
```js
function isReadonly(obj) {
  return isReactive(obj) || isReadonly(obj);
}
```

## isReactive
```js
function isReactive(obj) {
	return obj && obj._is_reactive;
}
```
## isReadonly
```js
function isReadonly(obj) {
  return obj && obj._is_readonly;
}
```

## shallowReactive
```js
// 定义一个shallowReactive函数，传入一个目标对象
    function shallowReactive(target) {
      // 判断当前的目标对象是不是object类型(对象/数组)
      if (target && typeof target === 'object') {
        return new Proxy(target, {
          // 获取属性值
          get(obj, key) {
            console.log('拦截了get');
            if(key=='_is_reactive'){
            	return true
            };
            return Reflect.get(obj, key);
          },
          // 修改属性值或者添加属性
          set(obj, key, value) {
            console.log('拦截了set');
            return Reflect.set(obj, key, value);
          },
          // 删除某个属性
          deleteProperty(obj, key) {
            console.log('拦截了deleteProperty');
            return Reflect.deleteProperty(obj, key);
          }
        })
      }
      // 如果传入的是基本数据类型，那么就直接返回
      return target;
    };

     let user = shallowReactive({
       name: '张三',
       wife: {
         name: '张三老婆'
       }
     });
    // 拦截到了读和写的数据
     console.log(user.name);
     user.name = '李四';
     console.log(user.name);


    // 拦截到了读取的数据，但是拦截不到写的数据
     user.wife.name = '张三媳妇';
     console.log(user.wife.name);

    // 拦截到了删除数据
     delete user.name;

    // 只拦截到了读，但是拦截不到删除
     delete user.wife.name
```

## reactive

```js
// 定义一个reactive函数，传入一个目标对象
    function reactive(target) {
      // 判断当前的目标对象是不是object类型(对象/数组)
      if (target && typeof target === 'object') {
        // 对数组/对象中所有的数据进行reactive的递归处理
        // 判断当前的数据是不是数组
        if (Array.isArray(target)) {
          target.forEach((item, index) => {
            // 数组的数据要进行遍历操作
            target[index] = reactive(item);
          })
        } else {
          // 判断当前的数据是不是对象
          Object.keys(target).forEach(key => {
            target[key] = reactive(target[key]);
          })
        }
        return new Proxy(target, {
          // 获取属性值
          get(obj, key) {
            console.log('拦截了get');
            if(key=='_is_reactive'){
            	return true
            };
            return Reflect.get(obj, key);
          },
          // 修改属性值或者添加属性
          set(obj, key, value) {
            console.log('拦截了set');
            return Reflect.set(obj, key, value);
          },
          // 删除某个属性
          deleteProperty(obj, key) {
            console.log('拦截了deleteProperty');
            return Reflect.deleteProperty(obj, key);
          }
        })
      }
      // 如果传入的是基本数据类型，那么就直接返回
      return target;
    };

    let user = reactive({
      name: '张三',
      wife: {
        name: '张三老婆'
      }
    });

    // 拦截到了读写的数据
     console.log(user.name);
     user.name = '李四';
     console.log(user.name);

    // 拦截到了读写的数据
     console.log(user.wife.name);
     user.wife.name = '张三媳妇';
     console.log(user.wife.name);

    // 拦截到了删除的数据
     delete user.name;

    // 拦截到了删除的数据
    delete user.wife.name
```

## shallowRef

```js
// 定义一个shallowRef函数
    function shallowRef(target) {
      return {
        _is_ref: true, // 用来标识是ref对象
        // 保存target数据
        _value: target,
        get value() {
          console.log('劫持到了读取数据');
          return this._value;
        },
        set value(val) {
          console.log('劫持到了修改/设置数据');
          this._value = val;
        }
      }
    };
    let user = shallowRef({
      name: '张三',
      wife: {
        name: '张三老婆'
      }
    });

    // 劫持到了读取数据
    console.log(user.value);

    // 劫持到了修改数据
    user.value = {
      name: '李四',
      wife: {
        name: '李四老婆'
      }
    };

    // 劫持到了读取数据,劫持不到修改数据
    user.value.wife = '张三媳妇'
```

## ref

```js
// 定义一个reactive函数，传入一个目标对象
    function reactive(target) {
      // 判断当前的目标对象是不是object类型(对象/数组)
      if (target && typeof target === 'object') {
        // 对数组/对象中所有的数据进行reactive的递归处理
        // 判断当前的数据是不是数组
        if (Array.isArray(target)) {
          target.forEach((item, index) => {
            // 数组的数据要进行遍历操作
            target[index] = reactive(item);
          })
        } else {
          // 判断当前的数据是不是对象
          Object.keys(target).forEach(key => {
            target[key] = reactive(target[key]);
          })
        }
        return new Proxy(target, {
          // 获取属性值
          get(obj, key) {
            console.log('拦截了get');
            return Reflect.get(obj, key);
          },
          // 修改属性值或者添加属性
          set(obj, key, value) {
            console.log('拦截了set');
            return Reflect.set(obj, key, value);
          },
          // 删除某个属性
          deleteProperty(obj, key) {
            console.log('拦截了deleteProperty');
            return Reflect.deleteProperty(obj, key);
          }
        })
      }
      // 如果传入的是基本数据类型，那么就直接返回
      return target;
    };

    // 定义一个ref函数
    function ref(target) {
      target = reactive(target)
      return {
        _is_ref: true, // 用来标识是ref对象
        // 保存target数据
        _value: target,
        get value() {
          console.log('劫持到了读取数据');
          return this._value;
        },
        set value(val) {
          console.log('劫持到了修改/设置数据');
          this._value = val;
        }
      }
    };

    let user = ref({
      name: '张三',
      wife: {
        name: '张三老婆'
      }
    });

    // 劫持到了读取数据
    console.log(user.value);

    // 劫持到了修改数据
    user.value = {
      name: '李四',
      wife: {
        name: '李四老婆'
      }
    };

    // 劫持到了读取数据
    user.value.wife = '张三媳妇'
```

## shallowReadonly
```js
// 定义一个shallowReadonly函数
    function shallowReadonly(target) {
      // 判断当前的数据是不是对象
      if (target && typeof target === 'object') {
        return new Proxy(target, {
          get(obj, key) {
            console.log('拦截到get了');
            if(key=='_is_readonly'){
            	return true
            };
            return Reflect.get(obj, key);
          },
          set(obj, key, value) {
            console.warn('只能读取数据，不能修改数据或者添加数据');
            return true;
          },
          deleteProperty(obj, key) {
            console.log('只能读取数据，不能删除数据');
            return true;
          }
        })
      };
      return target;
    };

	let user = shallowReadonly({
      name: '张三',
      likes: ['篮球', '足球']
    });
    // 可以读取
    console.log(user.name);
    // 不能修改
    user.name = '李四';
    // 不能删除
    delete user.name;

    // 可以读取
    console.log(user.likes[0]);
    // 拦截到了读取，可以修改
    user.likes[0] = '羽毛球';
    // 拦截到了读取，可以删除
    delete user.likes[0];
```

## readonly

```js
// 定义一个readonly函数
    function readonly(target) {
      // 判断当前的数据是不是对象
      if (target && typeof target === 'object') {
        if (Array.isArray(target)) {// 判断是不是数组
          target.forEach((item, index) => {
            target[index] = readonly(item);
          })
        } else {// 判断是不是对象
          Object.keys(target).forEach(key => {
            target[key] = readonly(target[key])
          })
        }
        return new Proxy(target, {
          get(obj, key) {
            console.log('拦截到get了');
            if(key=='_is_readonly'){
            	return true
            };
            return Reflect.get(obj, key);
          },
          set(obj, key, value) {
            console.warn('只能读取数据，不能修改数据或者添加数据');
            return true;
          },
          deleteProperty(obj, key) {
            console.log('只能读取数据，不能删除数据');
            return true;
          }
        })
      };
      return target;
    };

    let user = readonly({
      name: '张三',
      likes: ['篮球', '足球']
    });
    // 可以读取
    console.log(user.name);
    // 不能修改
    user.name = '李四';
    // 不能删除
    delete user.name;

    // 可以读取
    console.log(user.likes[0]);
    // 拦截到了读取，不可以修改
    user.likes[0] = '羽毛球';
    // 拦截到了读取，不可以删除
    delete user.likes[0];
```

## isShallow

```js
export function isShallow(value: unknown): boolean {
  return !!(value && (value as Target).__v_isShallow)
}
```