/* eslint-disable import/first */

jest.mock('lodash/debounce', () => x => x);

import os from 'os';
import mockFs from 'mock-fs';
import { pathExistsSync, readJsonSync } from 'fs-extra';
import Homie from './homie';

os.homedir = () => '/home/user/';

describe('Homie', () => {
  given('file', () => 'example.json');
  given('defaults', () => {});

  given('subject', () => {
    mockFs({
      [Homie.root]: {
        [given.file]: given.content || '',
      },
    });

    return new Homie(given.file, given.defaults);
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
      given('defaults', () => ({ two: 2 }));
      expect(given.subject.state).toEqual({ two: 2 });
    });

    it('should merge width defaults', () => {
      given('content', () => '{ "one": 1 }');
      given('defaults', () => ({ two: 2 }));

      expect(given.subject.state).toEqual({ one: 1, two: 2 });
    });
  });

  describe('.save', () => {
    it('should call when state changed', async () => {
      given('content', () => '{ "one": 1 }');

      const path = `${Homie.root}/${given.file}`;

      given.subject.state.one = 2;

      await moment();

      expect(readJsonSync(path)).toEqual({ one: 2 });
    });
  });
});
