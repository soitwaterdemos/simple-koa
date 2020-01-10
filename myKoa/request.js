let url = require('url')

let request = {
  // 下面这种属性的写法称为`存取器属性`,其中的参数无作用
  get url() {
    return this.req.url
  },
  get path() {
    return url.parse(this.req.url).pathname
  }
}
module.exports = request