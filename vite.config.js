/*
 * @Author: along
 * @Description:
 * @Date: 2023-05-30 19:45:20
 * @LastEditors: along
 * @LastEditTime: 2023-05-31 16:23:42
 * @FilePath: /cxy-web-box/vite.config.js
 */
export default {
  base: './',
  build: {
    rollupOptions: {
      output: {
        // 定义输出目录
        dir: 'dist',
        // 定义输出文件名
        assetFileNames: 'assets/[name].[hash][ext]'
      }
    }
  }
}
