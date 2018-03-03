describe('http', () => {
  jest.mock('request-promise-native', () => {
    function fn () {}

    fn.defaults = () => fn
    fn.get = () => {}
    fn.post = () => {}

    return fn
  })

  jest.mock('./csrf.js', () => () => Promise.resolve('CSRF_MOCK'))

  const given = require('given2')
  const request = require('request-promise-native')
  const Http = require('./http')

  given('subject', () => new Http())

  describe('.constructor', () => {
    it('should set initial state and prepare adapter', () => {
      jest.spyOn(request, 'defaults').mockReturnValue('foo')

      const baseUrl = 'https://www.instagram.com/'

      expect(given.subject.csrf).toBe(null)
      expect(given.subject.adapter).toBe('foo')
      expect(request.defaults).toHaveBeenLastCalledWith({
        baseUrl,
        Referer: baseUrl
      })
    })
  })

  describe('.prepare', () => {
    it('should prepare csrf', async () => {
      await given.subject.prepare()
      expect(given.subject.csrf).toBe('CSRF_MOCK')
    })
  })
})
