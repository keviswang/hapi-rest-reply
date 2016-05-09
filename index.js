'use strict'
const Boom = require('boom')
const internals = {}

internals.success = function (data, message) {
  return this.response({
    code: 0,
    message,
    data
  })
}

internals.fail = function (data, message) {
  return this.response({
    code: -1,
    message,
    data
  })
}

internals.notFound = function (message) {
  return this.response(Boom.notFound(message))
}

internals.unauthorized = function(message) {
  return this.response(Boom.unauthorized(message))
}

exports.register = function (server, options, next) {
  server.decorate('reply', 'success', internals.success)
  server.decorate('reply', 'fail', internals.fail)
  server.decorate('reply', 'notFound', internals.notFound)
  server.decorate('reply', 'unauthorized', internals.unauthorized)
  next()
}


exports.register.attributes = {
    pkg: require('./package.json')
}
