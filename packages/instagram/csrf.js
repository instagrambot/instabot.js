const request = require('request-promise-native')
const { Cookie } = require('tough-cookie')

module.exports = async () => {
  const resp = await request.get('https://www.instagram.com/', { resolveWithFullResponse: true })
  const setCookie = resp.headers['set-cookie'] || []
  const cookies = setCookie.map(Cookie.parse)
  const csrf = cookies.find(x => x.key === 'csrftoken')

  if (csrf) return csrf.value
}
