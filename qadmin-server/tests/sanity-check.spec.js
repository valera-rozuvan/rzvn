const { expect } = require('chai');
require('mocha');

const { hello } = require('./sanity-check');

describe('Sanity Check', () => {
  it('should return hello world', () => {
    const result = hello();
    expect(result).to.equal('Hello world!');
  });
});
