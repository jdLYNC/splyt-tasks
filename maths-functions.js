/**
 * Class for expressing numbers and mathematical operators as functions/methods.
 */
class MathsFunctions {
  /**
   * Creates a mathsFunctions instance with the desired numberConfig.
   * @param {object} numberConfig - Object with number name (string) as key and value (number) as value
   */
  constructor(numberConfig) {
    const numberMethods = Object.entries(numberConfig)
      .reduce((acc, [name, number]) => Object.assign(acc, {
        [name]: MathsFunctions.numberFunction(number)
      }));

    Object.assign(this, numberMethods);
  }

  /**
   * Method to return division function with right operand in place
   * @param {number} x - The right operand
   * @return {function} - Curried division function
   */
  dividedBy(x) {
    return (y) => y / x;
  }
  
  /**
   * Method to return subtraction function with right operand in place
   * @param {number} x - The right operand
   * @return {function} - Curried subtraction function
  */
  minus(x) {
    return (y) => y - x;
  }

  /**
   * Static method for creating number functions.
   * @param {number} n - Number value of function
   * @return {function} - Curried function
   */
  static numberFunction(n) {
    return (operation) => {
      if (!operation) return n;
      else return operation(n);
    }
  }

  /**
   * Method to return addition function with right operand in place
   * @param {number} x - The right operand
   * @return {function} - Curried addition function
  */
  plus(x) {
    return (y) => y + x;
  }

  /**
   * Method to return multiplication function with right operand in place
   * @param {number} x - The right operand
   * @return {function} - Curried multiplication function
  */
  times(x) {
    return (y) => y * x;
  }

}

module.exports = new MathsFunctions({
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
});