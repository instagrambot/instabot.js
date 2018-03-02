/* eslint-env jest */

function request () {}

request.defaults = () => request
request.get = () => {}
request.post = () => {}

module.exports = request
