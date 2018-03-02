const request = require('request-promise-native')
const { Cookie } = require('tough-cookie')

module.exports = async () => {
  const cookies = await request
    .get('https://www.instagram.com/', { resolveWithFullResponse: true })
    .then(resp => resp.headers['set-cookie'] || [])
    .then(cookies => cookies.map(Cookie.parse))

  return cookies.find(x => x.key === 'csrftoken')
}
