/*
 * @Author: along
 * @Description:
 * @Date: 2023-06-05 20:05:04
 * @LastEditors: along
 * @LastEditTime: 2023-08-17 18:03:36
 * @FilePath: /cxy-web-box/vite.config.js
 */

import { defineConfig } from "vite";
// import Vue from '@vitejs/plugin-vue'
// import Markdown from 'vite-plugin-vue-markdown'
// import MarkdownPreview from 'vite-plugin-markdown-preview'

const config = defineConfig({
  server: {
    hmr: {
      overlay: false,
    },
  },
  // server: {
  //   host: 8889,
  //   open: true
  // },
  // plugins: [
  //   Vue({
  //     include: [/\.vue$/, /\.md$/],
  //   }),
  //   Markdown(),
  //   MarkdownPreview(),
  // ],
});

export default config;
