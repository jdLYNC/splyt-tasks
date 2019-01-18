const { expect } = require('chai');
const {
  one, two, three, four, five, six, seven, eight, nine, plus, minus, times, dividedBy
} = require('../maths-functions');

describe('Maths Functions', () => {

  it('should handle 7 * 5', () => {
    expect(seven(times(five()))).to.equal(35);
  });

  it('should handle 4 + 9', () => {
    expect(four(plus(nine()))).to.equal(13);
  });

  it('should handle 8 - 3', () => {
    expect(eight(minus(three()))).to.equal(5);
  });

  it('should handle 6 / 2', () => {
    expect(six(dividedBy(two()))).to.equal(3);
  });

});