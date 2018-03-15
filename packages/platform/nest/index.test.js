const os = require('os');

os.homedir = () => '/home/user/';

const mockFs = require('mock-fs');
const Nest = require('./index');
const { pathExistsSync } = require('fs-extra');

describe('Nest', () => {
  beforeEach(() => mockFs());
  afterEach(() => mockFs.restore());

  given('subject', () => new Nest());

  describe('.constructor', () => {
    it('should ensure root path', () => {
      expect(pathExistsSync(Nest.root)).toBe(false);
      given.subject; // eslint-disable-line no-unused-expressions
      expect(pathExistsSync(Nest.root)).toBe(true);
    });
  });
});
