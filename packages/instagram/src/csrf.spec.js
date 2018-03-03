describe('csrf', () => {
  jest.mock('request-promise-native', () => ({
    get: () => Promise.resolve({
      headers: {
        'set-cookie': [
          'sessionid=; Domain=instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/',
          'sessionid=; Domain=.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/',
          'sessionid=; Domain=www.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/',
          'sessionid=; Domain=.www.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/',
          'rur=FTW; Path=/',
          'csrftoken=CSRF_MOCK; expires=Sat, 02-Mar-2019 11:59:18 GMT; Max-Age=31449600; Path=/; Secure'
        ]
      }
    })
  }))

  const csrf = require('./csrf')

  it('should resolve with csrf token', async () => {
    const token = await csrf()

    expect(token).toBe('CSRF_MOCK')
  })
})
