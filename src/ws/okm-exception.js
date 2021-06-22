class OKMException extends Error {
  constructor(message, error = '', status = '', statusText = '', errorData = '',
    errorName = '', errorMessage = '', serverStack = '', serverDate = '', errorList = []) {
    super(message);
    this.error = error;
    this.status = status;
    this.statusText = statusText;
    this.errorData = errorData;
    this.errorName = errorName;
    this.errorMessage = errorMessage;
    this.errorList = errorList;
    this.serverDate = serverDate;
    this.serverStack = serverStack;
    this.name = this.constructor.name;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      // this.stack = (new Error(message)).stack;
      this.stack = OKMException.createStack(this);
    }
  }

  /**
   * setError
   */
  setError(error) {
    this.error = error;
  }

  /**
   * setStatus
   */
  setStatus(status) {
    this.status = status;
  }

  /**
   * setStatusText
   */
  setStatusText(statusText) {
    this.statusText = statusText;
  }

  /**
   * setErrorData
   */
  setErrorData(errorData) {
    this.errorData = errorData;
  }

  /**
   * setErrorName
   */
  setErrorName(errorName) {
    this.errorName = errorName;
  }

  /**
   * setErrorMessage
   */
  setErrorMessage(errorMessage) {
    this.errorMessage = errorMessage;
  }

  /**
   * setErrorList
   */
  setErrorList(errorList) {
    this.errorList = errorList;
  }

  /**
   * setErrorStack
   */
  setServerStack(serverStack) {
    this.serverStack = serverStack;
  }

  /**
   * setServerDate
   */
  setServerDate(serverDate) {
    this.serverDate = serverDate;
  }

  /**
   * @return {string}
   */
  toString() {
    return this.getPrettyMessage();
  }

  /**
   * @return {string}
   */
  getPrettyMessage() {
    return `${this.message}, Error: ${this.error}, Code: ${this.status}.`;
  }

  /**
   * @param {CustomError} error
   * @return {string}
   * @private
   */
  static createStack(error) {
    return typeof Error.captureStackTrace === 'function'
      ? Error.captureStackTrace(error, error.constructor)
      : (new Error()).stack;
  }
}

export default OKMException;
