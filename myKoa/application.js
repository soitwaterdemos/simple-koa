let http = require("http")
let context = require("./context.js")
let request = require("./request.js")
let response = require("./response.js")

class Koa {
  constructor() {
    this.context = context
    this.request = request
    this.response = response
    this.middlewares = []
  }
  use(cb) {
    this.middlewares.push(cb)
  }
  listen() {
    let server = http.createServer(this.handleRequest.bind(this))
    server.listen(...arguments)
  }
  handleRequest(req, res) {
    // 默认页面找不到
    res.statusCode = 404
    let ctx = this.createContext(req, res)
    let composeMiddleware = this.compose(ctx, this.middlewares)
    // composeMiddleware是1个promise,当它执行完时,才会改变ctx.body
    composeMiddleware.then(() => {
      let body = ctx.body
      if (typeof body === 'undefined') {
        res.end(`Not Found`)
      } else if (typeof body === `string`) {
        res.end(body)
      }
    })
  }
  createContext(req, res) {
    // 希望ctx应该拿到context的属性，但是不修改context
    let ctx = Object.create(this.context);
    // ctx是Koa对原生http-server的req/res的封装
    // 以下的写法其实都是一个含义
    ctx.request = Object.create(this.request)
    ctx.req = ctx.request.req = req
    ctx.response = Object.create(this.response)
    ctx.res = ctx.response.res = res
    return ctx
  }
  compose(ctx, middlewares) {
    function dispatch(index) {
      if (index === middlewares.length) return Promise.resolve()
      let middleware = middlewares[index]
      // 递归创建嵌套的promise
      return Promise.resolve(middleware(ctx, () => dispatch(index + 1)))
    }
    return dispatch(0)
  }
}

module.exports = Koa