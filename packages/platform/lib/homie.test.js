const os = require('os');

os.homedir = () => '/home/user/';

const mockFs = require('mock-fs');
const Homie = require('./homie');
const { pathExistsSync } = require('fs-extra');

describe('Homie', () => {
  given('file', () => 'example.json');
  given('options', () => {});

  given('subject', () => {
    mockFs({
      [Homie.root]: {
        [given.file]: given.content || '',
      },
    });

    return new Homie(given.file, given.options);
  });

  afterEach(() => mockFs.restore());

  describe('.constructor', () => {
    it('should create file with given name', () => {
      given('file', () => 'new.json');

      const path = `${Homie.root}/${given.file}`;

      expect(pathExistsSync(path)).toBe(false);
      given.subject; // eslint-disable-line no-unused-expressions
      expect(pathExistsSync(path)).toBe(true);
    });

    it('should parse json from file', () => {
      given('content', () => '{ "foo": "bar" }');
      expect(given.subject.state).toEqual({ foo: 'bar' });
    });

    it('should use defaults when file empty', () => {
      given('options', () => ({ defaults: { two: 2 } }));
      expect(given.subject.state).toEqual({ two: 2 });
    });

    it('should merge width defaults', () => {
      given('content', () => '{ "one": 1 }');
      given('options', () => ({ defaults: { two: 2 } }));

      expect(given.subject.state).toEqual({ one: 1, two: 2 });
    });
  });
});
