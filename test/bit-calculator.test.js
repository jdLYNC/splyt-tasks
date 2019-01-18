const { expect } = require('chai');
const calculate = require('../bit-calculator');

describe('Bit Calculator', () => {

  it('should handle 10 + 10', () => {
    expect(calculate('10', '10')).to.equal(4);
  });

  it('should handle 10 + 0', () => {
    expect(calculate('10', '0')).to.equal(2);
  });
  
  it('should handle 101 + 10', () => {
    expect(calculate('101', '10')).to.equal(7);
  });

});