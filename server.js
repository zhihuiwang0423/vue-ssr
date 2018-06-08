const Koa = require('koa')
const app = new Koa()
const fs = require('fs')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')

const resolve = file => path.resolve(__dirname, file)

const renderer = createBundleRenderer(
  require('./dist/vue-ssr-server-bundle.json'),{
    runInNewContext: false,
  template: fs.readFileSync(resolve('./index.html'), 'utf-8'),
  clientManifest: require('./dist/vue-ssr-client-manifest.json')
  })

  function renderToString (context) {
    return new Promise((resolve, reject) => {
      renderer.renderToString(context, (err, html) => err ? reject(err) : resolve(html))
    })
  }

  app.use(require('koa-static')(resolve('./dist')))
  app.use(async (ctx, next) => {
    try {
      const context = {
        title: '服务端渲染测试',
        url: ctx.url
      }
      ctx.body = await renderToString(context)

      ctx.set('Content-Type', 'text/html')
      ctx.set('Server', 'Koa2 server side render')
    } catch (e) {
      console.log('error')
      next()
    }
  })
// app.use(ctx => {
//   ctx.body = 'Hello Koa'
// })
app.listen(3002).on('listening', () => {
  console.log('http://127.0.0.1:3002')
}).on('error', err => console.log(err))

