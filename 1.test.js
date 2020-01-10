let koa = require('koa')
let app = new koa()

app.use((ctx, next) => {
  ctx.body = 'hello, mf!'
})

app.listen(3000)