// 洋葱模型
function app() { }
app.middlewares = []
app.use = function (cb) {
  app.middlewares.push(cb)
}
app.use((ctx, next) => {
  console.log(1)
  next()
  console.log(2)
})
app.use((ctx, next) => {
  console.log(3)
  next()
  console.log(4)
})
app.use((ctx, next) => {
  console.log(5)
  next()
  console.log(6)
})

function dispatch(index) {
  // 先取出第一个中间件,令其执行
  // 索引index自增1，调用next()
  if (index === app.middlewares.length) {
    return
  }
  let middleware = app.middlewares[index]
  middleware({}, () => dispatch(index + 1))
}
dispatch(0)