let proto = {

}
defineGetter(`request`, `url`)
defineGetter(`request`, `path`)
defineGetterSetter('response', 'body')

// 令ctx代理ctx.request上的属性
// 即取ctx.url其实取的是ctx.request.url
function defineGetter(property, name) {
  Object.defineProperty(proto, name, {
    get: function () {
      return this[property][name]
    }
  })
}

function defineGetterSetter(property, name) {
  Object.defineProperty(proto, name, {
    set(val) {
      this[property][name] = val
    },
    get: function () {
      return this[property][name]
    }
  })
}

module.exports = proto