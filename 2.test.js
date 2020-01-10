let koa = require('./myKoa/application.js')
let app = new koa()
app.use((ctx) => {
  console.log(`mf, hello`)
  console.log(ctx.req.url)
  console.log(ctx.request.req.url)
  console.log(ctx.request.url)
  // ctx会代理ctx.request上的属性
  console.log(ctx.url)
  ctx.response.body = 'hello'
})
app.listen(3000)