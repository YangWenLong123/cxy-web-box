### 数组扁平化

#### 示例

```js
const arr = [1, [2, [3, 4]], 5, [6]];
```

#### 方法

1.递归

```js
const flatten = (arr) => {
    let res = [];
    arr.map(item => {
        if(Array.isArray(item)) {
            res = res.concat(flatten(item));
        } else {
            res.push(item);
        }
    });
    return res;
}
```

2.reduce

```js
const flatten = (arr) => {
    return arr.reduce((result, item)=> {
        return result.concat(Array.isArray(item) ? flatten(item) : item);
    }, []);
}
```

3.flat

```js
const flatten = (arr) => {
    return arr.flat(Infinity)
}
```

#### 运行结果

```js
const result = flatten(arr);
console.log(result);

// 运行结果
[1, 2, 3, 4, 5, 6]
```

### 数组转树形结构

#### 示例

```js
const arr = [
    {
        name: '小明',
        id: 1,
        pid: 0,
    },
    {
        name: '小花',
        id: 11,
        pid: 1,
    },
    {
        name: '小华',
        id: 111,
        pid: 11,
    },
    {
        name: '小李',
        id: 112,
        pid: 11,
    },
    {
        name: '小红',
        id: 12,
        pid: 1,
    },
    {
        name: '小王',
        id: 2,
        pid: 0,
    },
    {
        name: '小林',
        id: 21,
        pid: 2,
    },
    {
        name: '小李',
        id: 22,
        pid: 2,
    }
]
```

#### 方法

1.非递归

```js
 const arrayToTree = (arr) => {
    let result = [];
    if (!Array.isArray(arr) || arr.length === 0) {
        return result
    }
    let map = {};
    arr.forEach(item => map[item.id] = item);
    arr.forEach(item => {
        const parent = map[item.pid];
        if(parent){
            (parent.children || (parent.children=[])).push(item);
        } else {
            result.push(item);
        }
    })
    return result
}
```

2.递归

```js
const arrayToTree = (arr, pid) => {
    let res = [];
    arr.forEach(item => {
        if(item.pid === pid){
            let itemChildren = arrayToTree(arr,item.id);
            if(itemChildren.length) {
                item.children = itemChildren;
            }
            res.push(item);
        }
    });
    return res;
}
```

#### 运行结果

```js
// const result = arrayToTree(arr);
const result = arrayToTree(arr, 0);
console.log(result);

// 运行结果
[
    {
        "name": "小明",
        "id": 1,
        "pid": 0,
        "children": [
            {
                "name": "小花",
                "id": 11,
                "pid": 1,
                "children": [
                    {
                        "name": "小华",
                        "id": 111,
                        "pid": 11
                    },
                    {
                        "name": "小李",
                        "id": 112,
                        "pid": 11
                    }
                ]
            },
            {
                "name": "小红",
                "id": 12,
                "pid": 1
            }
        ]
    },
    {
        "name": "小王",
        "id": 2,
        "pid": 0,
        "children": [
            {
                "name": "小林",
                "id": 21,
                "pid": 2
            },
            {
                "name": "小李",
                "id": 22,
                "pid": 2
            }
        ]
    }
]
```

### 树形结构转数组(扁平化)

#### 示例

```js
const tree = [
    {
        name: '小明',
        id: 1,
        pid: 0,
        children: [
            {
                name: '小花',
                id: 11,
                pid: 1,
                children: [
                    {
                        name: '小华',
                        id: 111,
                        pid: 11,
                    },
                    {
                        name: '小李',
                        id: 112,
                        pid: 11,
                    }
                ]
            },
            {
                name: '小红',
                id: 12,
                pid: 1,
            }
        ]
    },
    {
        name: '小王',
        id: 2,
        pid: 0,
        children: [
            {
                name: '小林',
                id: 21,
                pid: 2,
            },
            {
                name: '小李',
                id: 22,
                pid: 2,
            }
        ]
    }
]
```

#### 方法

1.深度优先遍历

```js
const treeToArray = (tree) => {
    let stack = tree,
        result = [];
    while(stack.length !== 0){
        let pop = stack.pop();
        result.push({
            id: pop.id,
            name: pop.name,
            pid: pop.pid
        })
        let children = pop.children
        if(children){
            for(let i = children.length-1; i >=0; i--){
                stack.push(children[i])
            }
        }
    }
    return result
}
```

2.广度优先遍历

```js
const treeToArray = (tree) => {
    let queue = tree,
        result = [];
    while(queue.length !== 0){
        let shift = queue.shift();
        result.push({
            id: shift.id,
            name: shift.name,
            pid: shift.pid
        })
        let children = shift.children
        if(children){
            for(let i = 0; i < children.length; i++){
                queue.push(children[i])
            }
        }
    }
    return result
}
```

#### 运行结果

```js
const result = treeToArray(tree);
console.log(result);

// 运行结果
[
    {
        "name": "小明",
        "id": 1,
        "pid": 0
    },
    {
        "name": "小花",
        "id": 11,
        "pid": 1
    },
    {
        "name": "小华",
        "id": 111,
        "pid": 11
    },
    {
        "name": "小李",
        "id": 112,
        "pid": 11
    },
    {
        "name": "小红",
        "id": 12,
        "pid": 1
    },
    {
        "name": "小王",
        "id": 2,
        "pid": 0
    },
    {
        "name": "小林",
        "id": 21,
        "pid": 2
    },
    {
        "name": "小李",
        "id": 22,
        "pid": 2
    }
]
```

### 数筛选,保留符合条件的数据并返回树结构

#### 示例

```js
const tree = [
    {
        name: '小明',
        id: 1,
        pid: 0,
        show: true,
        children: [
            {
                name: '小花',
                id: 11,
                pid: 1,
                show: true,
                children: [
                    {
                        name: '小华',
                        id: 111,
                        pid: 11,
                    },
                    {
                        name: '小李',
                        id: 112,
                        pid: 11,
                        show: true,
                    }
                ]
            },
            {
                name: '小红',
                id: 12,
                pid: 1,
            }
        ]
    },
    {
        name: '小王',
        id: 2,
        pid: 0,
        show: true,
        children: [
            {
                name: '小林',
                id: 21,
                pid: 2,
            },
            {
                name: '小李',
                id: 22,
                pid: 2,
            }
        ]
    }
]
```

#### 方法

筛选出show=true的数据

```js
const filterTreeByFunc = (tree, func) => {
    if (!Array.isArray(tree) || tree.length === 0) {
        return []
    }
    return tree.filter(item => {
        item.children = item.children && filterTreeByFunc(item.children, func)
        return func(item) || (item.children && item.children.length)
    })
}

const func = (item) => {
    return item.show === true
}
```

#### 运行结果

```js
const result = filterTreeByFunc(tree, func);
console.log(result);

// 运行结果
[
    {
        "name": "小明",
        "id": 1,
        "pid": 0,
        "show": true,
        "children": [
            {
                "name": "小花",
                "id": 11,
                "pid": 1,
                "show": true,
                "children": [
                    {
                        "name": "小李",
                        "id": 112,
                        "pid": 11,
                        "show": true
                    }
                ]
            }
        ]
    },
    {
        "name": "小王",
        "id": 2,
        "pid": 0,
        "show": true,
        "children": []
    }
]
```

### 查找某一节点在树中路径

#### 示例

```js
const tree = [
    {
        name: '小明',
        id: 1,
        pid: 0,
        children: [
            {
                name: '小花',
                id: 11,
                pid: 1,
                children: [
                    {
                        name: '小华',
                        id: 111,
                        pid: 11,
                    },
                    {
                        name: '小李',
                        id: 112,
                        pid: 11,
                    }
                ]
            },
            {
                name: '小红',
                id: 12,
                pid: 1,
            }
        ]
    },
    {
        name: '小王',
        id: 2,
        pid: 0,
        children: [
            {
                name: '小林',
                id: 21,
                pid: 2,
            },
            {
                name: '小李',
                id: 22,
                pid: 2,
            }
        ]
    }
]
```

#### 方法

```js
const getNodePath = (tree, id) => {
    if (!Array.isArray(tree) || tree.length === 0) {
        return []
    }
    const path = []
    const treeFindPath = (tree, id, path) => {
        for (const item of tree) {
            path.push(item.id);
            if (item.id === id) {
                return path
            }
            if (item.children) {
                const findChildren = treeFindPath(item.children,id, path);
                if (findChildren.length) {
                    return findChildren;
                }
            }
            path.pop();
        }
        return [];
    }
    return treeFindPath(tree, id, path)
}
```

#### 运行结果

```js
const result = getNodePath(tree, 112);
console.log(result);

// 运行结果
[1, 11, 112]
```

### 模糊查询树

#### 示例

```js
const tree = [
    {
        name: '小明前端专家',
        id: 1,
        pid: 0,
        children: [
            {
                name: '小花前端程序媛',
                id: 11,
                pid: 1,
                children: [
                    {
                        name: '小华划水运动员',
                        id: 111,
                        pid: 11,
                    },
                    {
                        name: '小李摸鱼运动员',
                        id: 112,
                        pid: 11,
                    }
                ]
            },
            {
                name: '小红摸鱼程序员',
                id: 12,
                pid: 1,
            }
        ]
    },
    {
        name: '小王内卷王',
        id: 2,
        pid: 0,
        children: [
            {
                name: '小林摸鱼王',
                id: 21,
                pid: 2,
            },
            {
                name: '小李后端程序员',
                id: 22,
                pid: 2,
            }
        ]
    }
]
```

#### 方法

```js
const fuzzyQueryTree = (arr, value) => {
    if (!Array.isArray(arr) || arr.length === 0) {
        return []
    }
    let result = [];
    arr.forEach(item => {
        if (item.name.indexOf(value) > -1) {
            const children = fuzzyQueryTree(item.children, value);
            const obj = { ...item, children }
            result.push(obj);
        } else {
            if (item.children && item.children.length > 0) {
                const children = fuzzyQueryTree(item.children, value);
                const obj = { ...item, children }
                if (children && children.length > 0) {
                    result.push(obj);
                }
            }
        }
    });
    return result;
};
```

#### 运行结果

```js
const result = fuzzyQueryTree(tree,'程序');
console.log(result);

// 运行结果
[
    {
        "name": "小明前端专家",
        "id": 1,
        "pid": 0,
        "children": [
            {
                "name": "小花前端程序媛",
                "id": 11,
                "pid": 1,
                "children": []
            },
            {
                "name": "小红摸鱼程序员",
                "id": 12,
                "pid": 1,
                "children": []
            }
        ]
    },
    {
        "name": "小王内卷王",
        "id": 2,
        "pid": 0,
        "children": [
            {
                "name": "小李后端程序员",
                "id": 22,
                "pid": 2,
                "children": []
            }
        ]
    }
]
```

### 树节点添加属性

#### 示例

```js
const tree = [
    {
        name: '小明',
        id: 1,
        pid: 0,
        children: [
            {
                name: '小花',
                id: 11,
                pid: 1,
                children: [
                    {
                        name: '小华',
                        id: 111,
                        pid: 11,
                    },
                    {
                        name: '小李',
                        id: 112,
                        pid: 11,
                    }
                ]
            },
            {
                name: '小红',
                id: 12,
                pid: 1,
            }
        ]
    },
    {
        name: '小王',
        id: 2,
        pid: 0,
        children: [
            {
                name: '小林',
                id: 21,
                pid: 2,
            },
            {
                name: '小李',
                id: 22,
                pid: 2,
            }
        ]
    }
]
```

#### 方法

```js
const addAttrToNodes = (tree) => {
    tree.forEach((item) => {
        item.title = '新生代农民工'
        if (item.children && item.children.length > 0) {
            addAttrToNodes(item.children)
        }
    })
    return tree
}
```

####

#### 运行结果

```js
const result = addAttrToNodes(tree);
console.log(result);

// 运行结果
[
    {
        "name": "小明",
        "id": 1,
        "pid": 0,
        "children": [
            {
                "name": "小花",
                "id": 11,
                "pid": 1,
                "children": [
                    {
                        "name": "小华",
                        "id": 111,
                        "pid": 11,
                        "title": "新生代农民工"
                    },
                    {
                        "name": "小李",
                        "id": 112,
                        "pid": 11,
                        "title": "新生代农民工"
                    }
                ],
                "title": "新生代农民工"
            },
            {
                "name": "小红",
                "id": 12,
                "pid": 1,
                "title": "新生代农民工"
            }
        ],
        "title": "新生代农民工"
    },
    {
        "name": "小王",
        "id": 2,
        "pid": 0,
        "children": [
            {
                "name": "小林",
                "id": 21,
                "pid": 2,
                "title": "新生代农民工"
            },
            {
                "name": "小李",
                "id": 22,
                "pid": 2,
                "title": "新生代农民工"
            }
        ],
        "title": "新生代农民工"
    }
]
```

### 树节点删除属性

#### 示例

```js
const tree = [
    {
        name: '小明',
        id: 1,
        pid: 0,
        children: [
            {
                name: '小花',
                id: 11,
                pid: 1,
                children: [
                    {
                        name: '小华',
                        id: 111,
                        pid: 11,
                    },
                    {
                        name: '小李',
                        id: 112,
                        pid: 11,
                    }
                ]
            },
            {
                name: '小红',
                id: 12,
                pid: 1,
            }
        ]
    },
    {
        name: '小王',
        id: 2,
        pid: 0,
        children: [
            {
                name: '小林',
                id: 21,
                pid: 2,
            },
            {
                name: '小李',
                id: 22,
                pid: 2,
            }
        ]
    }
]
```

#### 方法

```js
const removeAttrFromNode = (tree) => {
    tree.forEach((item) => {
        delete item.title
        if (item.children && item.children.length > 0) {
            removeAttrFromNode(item.children)
        }
    })
    return tree
}
```

#### 运行结果

```js
const result = removeAttrFromNode(tree);
console.log(result);

// 运行结果
[
    {
        "name": "小明",
        "id": 1,
        "pid": 0,
        "children": [
            {
                "name": "小花",
                "id": 11,
                "pid": 1,
                "children": [
                    {
                        "name": "小华",
                        "id": 111,
                        "pid": 11
                    },
                    {
                        "name": "小李",
                        "id": 112,
                        "pid": 11
                    }
                ]
            },
            {
                "name": "小红",
                "id": 12,
                "pid": 1
            }
        ]
    },
    {
        "name": "小王",
        "id": 2,
        "pid": 0,
        "children": [
            {
                "name": "小林",
                "id": 21,
                "pid": 2
            },
            {
                "name": "小李",
                "id": 22,
                "pid": 2
            }
        ]
    }
]
```

### 删除树中的空childre

#### 示例

```js
const tree = [
    {
        name: '小明',
        id: 1,
        pid: 0,
        children: [
            {
                name: '小花',
                id: 11,
                pid: 1,
                children: [
                    {
                        name: '小华',
                        id: 111,
                        pid: 11,
                    },
                    {
                        name: '小李',
                        id: 112,
                        pid: 11,
                        children: []
                    }
                ]
            },
            {
                name: '小红',
                id: 12,
                pid: 1,
                children: []
            }
        ]
    },
    {
        name: '小王',
        id: 2,
        pid: 0,
        children: [
            {
                name: '小林',
                id: 21,
                pid: 2,
            },
            {
                name: '小李',
                id: 22,
                pid: 2,
                children: []
            }
        ]
    }
]
```

#### 方法

```js
const removeEmptyChildren = (tree) => {
    tree.forEach((item) => {
        if (item.children && item.children.length ===0) {
            delete item.children
        } else if (item.children && item.children.length > 0) {
            removeEmptyChildren(item.children)
        }
    })
    return tree
}
```

#### 运行结果

```js
const result = removeEmptyChildren(tree);
console.log(result);

// 运行结果
[
    {
        "name": "小明",
        "id": 1,
        "pid": 0,
        "children": [
            {
                "name": "小花",
                "id": 11,
                "pid": 1,
                "children": [
                    {
                        "name": "小华",
                        "id": 111,
                        "pid": 11
                    },
                    {
                        "name": "小李",
                        "id": 112,
                        "pid": 11
                    }
                ]
            },
            {
                "name": "小红",
                "id": 12,
                "pid": 1
            }
        ]
    },
    {
        "name": "小王",
        "id": 2,
        "pid": 0,
        "children": [
            {
                "name": "小林",
                "id": 21,
                "pid": 2
            },
            {
                "name": "小李",
                "id": 22,
                "pid": 2
            }
        ]
    }
]
```

### 获取树中所有的叶子节点

#### 示例

```js
const tree = [
    {
        name: '小明',
        id: 1,
        pid: 0,
        children: [
            {
                name: '小花',
                id: 11,
                pid: 1,
                children: [
                    {
                        name: '小华',
                        id: 111,
                        pid: 11,
                    },
                    {
                        name: '小李',
                        id: 112,
                        pid: 11,
                    }
                ]
            },
            {
                name: '小红',
                id: 12,
                pid: 1,
            }
        ]
    },
    {
        name: '小王',
        id: 2,
        pid: 0,
        children: [
            {
                name: '小林',
                id: 21,
                pid: 2,
            },
            {
                name: '小李',
                id: 22,
                pid: 2,
            }
        ]
    }
]
```

#### 方法

```js
const getAllLeaf = (tree) => {
    const result = []
    const getLeaf = (tree) => {
        tree.forEach((item) => {
            if (!item.children) {
                result.push(item)
            } else {
                getLeaf(item.children)
            }
        })
    }
    getLeaf(tree)
    return result
}
```

#### 运行结果

```js
const result = getAllLeaf(tree);
console.log(result);

// 运行结果
[
    {
        "name": "小华",
        "id": 111,
        "pid": 11
    },
    {
        "name": "小李",
        "id": 112,
        "pid": 11
    },
    {
        "name": "小红",
        "id": 12,
        "pid": 1
    },
    {
        "name": "小林",
        "id": 21,
        "pid": 2
    },
    {
        "name": "小李",
        "id": 22,
        "pid": 2
    }
]
```