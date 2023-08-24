## defineComponent

`defineComponent`是Vue3中的一个全局API，它的主要作用是在TypeScript环境下提供对组件选项内的类型的推导，使得在编写Vue组件时能够享受到`TypeScript`的类型检查和自动补全等特性。实际运行时，`defineComponent`并没有任何操作，它只是返回传递给它的对象.

示例

```ts
// model/articleModel
export interface ArticleModel {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
}
```

```ts
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch, nextTick, PropType } from 'vue'
import ImageCropUpload from 'vue-image-crop-upload'
import { ArticleModel } from '@/model/articleModel'

export default defineComponent({
  // components
  components: {
    ImageCropUpload
  },
  // props
  props: {
    list: {
      type!: Array,
      required: true
    },
    list2: {
      type: [] as PropType<Array<ArticleModel>>,
      default: () => {
        return []
      }
    },
  },
  // emits
  emits: ['input', 'src-file-set'],
  // setup
  setup (props, contex) {
    // reactive
    const state = reactive({
      visible: false,
      value: ''
    })

    // computed
    const show = computed({
      get: () => {
        return props.value
      },
      set: (value) => {
        contex.emit('input', [...value])
      }
    })

    // watch
    watch(() => state.visible, (value) => {
      // TODO
    })

    // methods
    const cropSuccess = (value: string, visible: boolean) => {
      contex.emit('src-file-set', value, visible)
    }

    // onMounted
    onMounted(() => {
      nextTick(() => {
        // TODO
      })
    })

    return {
      show,
      cropSuccess,
      ...toRefs(state)
    }
  }
})
</script>
```