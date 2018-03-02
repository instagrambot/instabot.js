jest.mock('request-promise-native')
jest.mock('./csrf.js', () => () => Promise.resolve('fooCsrf'))

const request = require('request-promise-native')
const Http = require('./http')

describe('http', () => {
  describe('.constructor', () => {
    it('should set initial state and prepare adapter', () => {
      jest.spyOn(request, 'defaults').mockReturnValue('foo')

      const http = new Http()
      const baseUrl = 'https://www.instagram.com/'

      expect(http.csrf).toBe(null)
      expect(http.adapter).toBe('foo')
      expect(request.defaults).toHaveBeenLastCalledWith({
        baseUrl,
        Referer: baseUrl
      })
    })
  })

  describe('.prepare', () => {
    it('should prepare csrf', async () => {
      const http = new Http()
      await http.prepare()

      expect(http.csrf).toBe('fooCsrf')
    })
  })
})
