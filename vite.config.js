
import { defineConfig } from 'vite'
// import Vue from '@vitejs/plugin-vue'
// import Markdown from 'vite-plugin-vue-markdown'
// import MarkdownPreview from 'vite-plugin-markdown-preview'

const config = defineConfig({
  server: {
    host: 8889,
    open: true

  },
  // plugins: [
  //   Vue({
  //     include: [/\.vue$/, /\.md$/],
  //   }),
  //   Markdown(),
  //   MarkdownPreview(),
  // ],
})

export default config
