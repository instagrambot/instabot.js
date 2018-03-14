const os = require('os');

os.homedir = () => '/home/user/';

const mockFs = require('mock-fs');
const Nest = require('./index');

describe('Nest', () => {
  beforeEach(() => mockFs());
  afterEach(() => mockFs.restore());

  given('nest', () => new Nest(given.options));

  describe('.constructor', () => {
    it('should set default path', () => {
      expect(given.nest.path).toBe('/home/user/.instabot.js');
    });

    it('should set given path', () => {
      given('options', () => ({ path: '/foo/bar' }));

      expect(given.nest.path).toBe('/foo/bar');
    });
  });
});
