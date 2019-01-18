const { expect } = require('chai');

describe('Defaulted Functions', () => {

  const add = (a, b) => a + b;

  describe('With original arguments defaulted to { b: 9 }', () => {

    let add2 = null;

    before(() => {
      add2 = defaultArguments(add, { b: 9 });
    });

    it('should handle a single argument', () => {
      expect(add2(10)).to.equal(19);
    });

    it('should handle two arguments', () => {
      expect(add2(10, 7)).to.equal(17);
    });

    it('should return NaN to no arguments', () => {
      expect(add2()).to.be.NaN;
    });

    describe('With subsequent arguments defaulted to { b: 3, a: 2 }', () => {

      let add3 = null;

      before(() => {
        add3 = defaultArguments(add2, { b: 3, a: 2 });
      });

      it('should handle a single argument', () => {
        expect(add3(10)).to.equal(13);
      });

      it('should handle no arguments', () => {
        expect(add3()).to.equal(5);
      });

      it('should handle only a second argument', () => {
        expect(add3(undefined, 10)).to.equal(12);
      });

    });

  });

  describe('With original arguments defaulted to { c: 3 }', () => {

    let add4 = null;

    before(() => {
      add4 = defaultArguments(add, { c: 3 });
    });

    it('should return NaN to one argument', () => {
      expect(add4(10)).to.be.NaN;
    });

    it('should handle two arguments', () => {
      expect(add4(10, 10)).to.equal(20);
    });

  });

});