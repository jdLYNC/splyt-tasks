/**
 * Static class for creating defaulted functions.
 */
class DefaultedFunction {
  
  /**
   * Handles all tasks to create a defaulted function 
   * @param {function} func - The function to assign defaults to
   * @param {object} defaultsConfig - The defaults to assign to the function
   * @return {function} - The defaulted function
   */
  static create(func, defaultsConfig = {}) {
    const argNames = func.argNames || DefaultedFunction.getArgNames(func);
    const defaultValues = argNames.map(name => defaultsConfig[name]);
    const defaultedFunction = DefaultedFunction.createNewFunction(func, argNames, defaultValues);
    return defaultedFunction;
  }

  /**
   * Specific function to create defaulted function, called from create method once arguments generated.
   * @param {function} func - The function to assign defaults to
   * @param {array} argNames - The name of the arguments of the original function
   * @param {array} defaultValues - The default values to assign to the function
   * @return {function} - The defaulted function
   */
  static createNewFunction(func, argNames, defaultValues) {
    function newFunc(...newArgs) {
      const finalArgs = argNames.map((_, i) => {
        if (newArgs[i] === undefined) return defaultValues[i];
        else return newArgs[i];
      });
      return func(...finalArgs);
    }

    Object.assign(newFunc, { argNames });
    return newFunc;
  }

  /**
   * Uses func.toString and RegExp to obtain argument names from original function
   * @param {function} func - Function to obtain argument names from
   * @return {array} - Array of argument names
   */
  static getArgNames(func) {
    const [_, argString] = func.toString().match(/\((.*)\)/);
    const argNames = argString.split(', ')
    return argNames;
  }
}

module.exports = DefaultedFunction.create;