import OKMException from '../okm-exception';

class Common {
  /**
   * getPromise exception inspired in https://www.datchley.name/es6-promises/
   *
   * @param message The message of the error
   * @returns {Promise<any>}
   */
  static getPromiseException(message) {
    // eslint-disable-next-line no-unused-vars
    return new Promise(function(resolve, reject) {
      throw new OKMException(message);
    });
  }
}

export default Common;
