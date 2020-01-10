let Koa = require('./myKoa/application.js')
let app = new Koa()
let log = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`in log`)
      resolve()
    }, 1000)
  })
}

app.use(async (ctx, next) => {
  console.log(1)
  await next()
  console.log(2)
})
app.use(async (ctx, next) => {
  console.log(3)
  await log()
  next()
  console.log(4)
})
app.use((ctx, next) => {
  console.log(5)
  next()
  console.log(6)
})

app.listen(3000)

// 打印结果: 1 3 2 'in log' 5 6 4