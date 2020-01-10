let url = require('url')

let response = {
  set body(value) {
    // 只要调用了body，状态码就变成200
    this.res.statusCode = 200
    this._body = value
  },
  get body() {
    return this._body
  }
}

module.exports = response