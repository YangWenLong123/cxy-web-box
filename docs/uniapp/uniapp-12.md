-   swiper默认高度150px

```js
<swiper
  class="user-swiper"
  :current="index"
  :duration="500"
  :style="{height: items[index] + 'px'}"
>
<swiper-item
    v-for="(item,index) in price"
    :key="index"
    class="user-item"
>
  <image :src="item" mode="widthFix" :class=" 'swiper-img' + index " class="user-image"></image>
</swiper-item>
</swiper>
```

```js
this.items = [];
this.price.map((item,index)=>{
    let view = uni.createSelectorQuery().select('.swiper-img' + index);
    view.fields({
        size: true
        },
        data => {
            this.items.push(data.height);
            console.log(this.items, 'items');
    }).exec();
})
```