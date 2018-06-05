// 第 1 步：创建一个 Vue 实例
import Vue from 'vue'
// 第 2 步：创建一个 renderer
// const renderer = require('vue-server-renderer').createRenderer()
import renderer from 'vue-server-renderer'
const fs = require('fs')
const app = new Vue({
  // template: `<div>Hello World</div>`
  template: fs.readFileSync('./index.template.html', 'utf-8')
})
// 第 3 步：将 Vue 实例渲染为 HTML
// 在 2.5.0+，如果没有传入回调函数，则会返回 Promise：
renderer.renderToString(app).then(html => {
  console.log(html)
}).catch(err => {
  console.error(err)
})
