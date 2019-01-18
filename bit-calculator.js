/**
 * Static class for handling calculations on binary strings.
 */
class BitCalculator {

  /**
   * Static method for summing a series of binary strings.
   * @param  {...string} binaryStrings - Series of binary strings
   * @return {number} - Decimal sum of binaryStrings
   */
  static calculate(...binaryStrings) {
    const binaryStringValues = binaryStrings.map(BitCalculator.toDecimal);
    return BitCalculator.sumArray(binaryStringValues);
  }

  /**
   * Static method for converting a binaryString to a decimal.
   * @param {string} binaryString
   * @return {number} - Decimal value of binaryString
   */
  static toDecimal(binaryString) {
    const bitValues = binaryString.split('')
      .reverse()
      .map((bit, i) => {
        if (bit === '1') return Math.pow(2, i);
        else return 0;
      });
    return BitCalculator.sumArray(bitValues);
  }

  /**
   * Static method for summing an array of numbers.
   * @param {array} arrNums - Array of numbers
   * @return {number} - Sum value of arrNums
   */
  static sumArray(arrNums) {
    return arrNums.reduce((acc, cur) => acc + cur, 0);
  }

}

module.exports = BitCalculator.calculate;