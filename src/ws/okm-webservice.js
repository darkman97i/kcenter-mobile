/**
 * The `OKMWebservice` class allows using the REST API of a OpenKM Platform instance.
 *
 * @example
 * import OKMWebservice from 'okmwebservice';
 *
 * const ws = new OKMWebservice({
 *   baseUrl: 'http://localhost:8080/openkm'
 * });
 * const username = 'okmAdmin';
 * const password = 'password';
 * ws.auth.login(username, password).then( response => {
 *  console.log(response);
 * });
 */
class OKMWebservice {
  // eslint-disable-next-line no-unused-vars
  constructor(opts = {}) {
    this._restURL =  '/rest';
    this._jSessionId = '';
    this._token = '';
  }

  /**
   * Set the token in webservice modules variables
   *
   * @param token - The authorization token value
   */
  setToken(token) {
    this._token = token;
  }

  /**
   * Get the current token
   * @returns {*} Return the current token
   */
  getToken() {
    return this._token;
  }

  /**
   * Set the JSESSIONID in webservice module
   *
   * @param jSessionId
   */
  setJSessionId(jSessionId) {
    this._jSessionId = jSessionId;
  }

  /**
   * Get the JSESSIONID
   *
   * @returns {string} Return the JSESSIONID value
   */
  getJSessionId() {
    return this._jSessionId;
  }

  /**
   * Set the host url
   *
   * @param hostUrl - The host url
   */
  setHostUrl(hostUrl) {
    console.log(hostUrl);
  }
}

export default OKMWebservice;
