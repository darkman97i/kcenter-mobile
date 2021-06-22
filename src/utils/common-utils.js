import textVersion from 'textversionjs';
import { sleep } from 'sleepjs';
import CryptoJS from 'crypto-js';
// import store from '../store/store';
import jwtDecode from 'jwt-decode';
import RouterTypes from '../../../kcenter-mobile/src/types/router-types';
// import KCTypes from '../types/kc-types';
import Common from '../ws/utils/Common';
import * as BlobUtil from 'blob-util';
import OKMTypes from '../ws/okm-types';

class CommonUtils {
  /**
   * formatSize
   *
   * @param size value
   * @returns {String} Return size in human format.
   */
  static formatSize(size) {
    let str = '0 Bytes';
    if (size > 0) {
      if (size / 1024 < 1) {
        str = size + ' Bytes';
      } else if (size / 1048576 < 1) {
        str = (size / 1024).toFixed(1) + ' KB';
      } else if (size / 1073741824 < 1) {
        str = (size / 1048576).toFixed(1) + ' MB';
      } else if (size / 1099511627776 < 1) {
        str = (size / 1073741824).toFixed(1) + ' GB';
      } else {
        str = 'BIG';
      }
    }
    return str;
  }

  /**
   * Pad value with leading zeros
   *
   * @param num The number
   * @param places Number of digits
   * @returns {string} Return a string with the number
   */
  static zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join('0') + num;
  }

  /**
   * getISO6391
   *
   * @param locale Valid locale
   * @returns {String} Return date in ISO639-1
   */
  static getISO6391(locale) {
    if (locale && locale.indexOf('-') > 0) {
      return locale.substring(0, locale.indexOf('-'));
    }
    return '';
  }

  /**
   * capitalize
   *
   * @param text The text
   * @returns {String} Return the capitalized text
   */
  static capitalize(text) {
    if (text) {
      if (text.length > 1) {
        return text.charAt(0).toUpperCase() + text.slice(1);
      } else {
        return text.toUpperCase();
      }
    } else {
      return '';
    }
  }

  /**
   * htmlToText
   *
   * @param html The html content
   * @returns {string} The text content
   */
  static htmlToText(html) {
    if (html) {
      return textVersion(html);
    }
    return '';
  }

  /**
   * textToHTML
   *
   * @param text The text content
   * @returns {string} The html content
   */
  static textToHTML(text) {
    if (text) {
      return '<p>' + text.replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>') + '</p>';
    }
    return '';
  }

  /**
   * Convert string to list ( comma is the default separator )
   *
   * @param text The text
   * @returns {*} Return array of elements
   */
  static convertStringToList(text, separator) {
    let sChar = ',';
    if (separator) {
      sChar = separator;
    }
    let array = [];
    if (text) {
      array = text.split(sChar).map(item => item.trim());
    }
    return array;
  }

  /**
   * Convert map to object ( used when sending map in rest )
   * https://2ality.com/2015/08/es6-map-json.html
   *
   * @param map The map value
   * @returns {null} Return and object with format { 'key1':'value1', 'key2': 'value2' }
   */
  static convertMapToObject(map) {
    const obj = Object.create(null);
    for (const [k, v] of map) {
      // We don’t escape the key '__proto__'
      // which can cause problems on older engines
      obj[k] = v;
    }
    return obj;
  }

  /**
   * Convert object to map ( used when receiving map from rest )
   *
   * @param obj The object value
   * @returns {Map<any, any>} Return map
   */
  static convertObjectToMap(obj) {
    const strMap = new Map();
    for (const k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    return strMap;
  }

  // /**
  //  * Get the application URl
  //  *
  //  * @returns {*} The application URL
  //  */
  // static getApplicationUrl() {
  //   let host = store.getters['repository/applicationUrl'];
  //   // host maybe null after in logout process
  //   if (host === null) {
  //     return '';
  //   }
  //   // Convert development url to production format
  //   if (process.env.NODE_ENV === 'development') {
  //     host = host.replace('8888', '8080');
  //   }
  //   return host;
  // }

  /**
   * Open a URL with an iframe
   *
   * @param url The url for downloading
   * @param sleepInMilliseconds The number of milliseconds the iframe will be available before removing. Value 0 it means will never be removed
   */
  static downloadUrlWithIframe(url, sleepInMilliseconds = 0) {
    if (url) {
      // Iframe position is always created in the top left corner with high z-index to solve scroll issue in the bottom of the page
      const iframe = document.createElement('iframe');
      iframe.style.margin = '0';
      iframe.style.padding = '0';
      iframe.style.backgroundColor = 'red';
      iframe.style.height = '0';
      iframe.style.width = '0';
      iframe.style.border = '0';
      iframe.style.visibility = 'hidden'; // hidden
      iframe.style.position = 'fixed';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.zIndex = '1000'; // Same used by bootstrap contextual menus
      iframe.src = url;

      document.body.appendChild(iframe);
      if (sleepInMilliseconds > 0) {
        sleep(sleepInMilliseconds).then(() => {
          iframe.remove();
        });
      }
    }
  }

  /**
   * Download files based in iframe or streams support
   *
   * @param uuid The uuid of a node
   * @param uuids List of uuids of nodes
   * @param useStreams Enable or disable javascript streams support, by default is set to false
   * @param ws The webservices object
   * @param addAlert The addAlert function
   * @param i18n The i18n function
   * @param name The name of the node
   * @param rpId The report Id
   * @param reportFormat The report format ( PDF, CSV, ... )
   * @param reportMapParams The report map parameters
   * @param isMail Indicate when node is a mail
   * @param isZip Indicate when action is to zip nodes
   * @returns {Promise<unknown>|Promise<*>|Promise<*|never>}
   */
  static downloadFile({
    uuid, uuids, useStreams = false, ws, addAlert, i18n, name, versionName, rpId, reportFormat, reportMapParams,
    isMail = false, isZip = false, isConvertToPDF = false, isCertificate = false, signatureName,
    isNote = false
  }) {
    if ((uuid !== undefined && uuid !== '') || (uuids !== undefined && uuids !== '' && isZip) ||
      (rpId !== undefined && rpId !== '')) {
      // Currently streams download is disabled
      if (useStreams && ws !== undefined && rpId !== undefined && rpId !== '') {
        return ws.report.execute(rpId, name, reportFormat, reportMapParams, uuid);
      } else if (useStreams && ws !== undefined && uuids !== undefined && uuids !== '' && isZip) {
        return ws.node.exportZip(uuids, true);
      } else if (useStreams && ws !== undefined && name !== undefined && name !== '') {
        if (isMail !== undefined && isMail) {
          if (isConvertToPDF !== undefined && isConvertToPDF) {
            return ws.mail.getPdf(uuid, name);
          } else {
            return ws.mail.getContent(uuid, name);
          }
        } else if (isConvertToPDF !== undefined && isConvertToPDF) {
          return ws.document.getPdf(uuid, name);
        } else if (versionName) {
          return ws.document.getContentByVersion(uuid, versionName, name);
        } else {
          return ws.document.getContent(uuid, name);
        }
      } else {
        // eslint-disable-next-line no-unused-vars
        const downloadFunction = function(resolve, reject) {
          const host = CommonUtils.getApplicationUrl();
          let downloadUrl = '';
          if (uuids !== undefined && uuids !== '' && isZip) {
            let params = '';
            uuids.forEach(function(uuid, index) {
              if (index === 0) {
                params += '?';
              } else {
                params += '&';
              }
              params += 'uuid=' + uuid;
            });
            downloadUrl = host + '/rest/nodes/zip' + params;
          } else {
            if (isMail !== undefined && isMail) {
              if (isConvertToPDF !== undefined && isConvertToPDF) {
                downloadUrl = host + '/rest/mails/' + uuid + '/pdf';
              } else {
                downloadUrl = host + '/rest/mails/' + uuid + '/content';
              }
            } else if (isConvertToPDF !== undefined && isConvertToPDF) {
              downloadUrl = host + '/rest/documents/' + uuid + '/pdf';
            } else if (isCertificate !== undefined && isCertificate) {
              downloadUrl = host + '/rest/digitalSignature/' + uuid + '/certificate?signatureName=' + signatureName;
            } else if (isNote !== undefined && isNote) {
              downloadUrl = host + '/rest/note/' + uuid + '/html';
            } else if (rpId !== undefined && rpId !== '') {
              const reportParams = {
                format: reportFormat,
                params: reportMapParams,
                uuid: uuid
              };
              const jsonValue = JSON.stringify(reportParams);
              downloadUrl = host + '/rest/reports/' + rpId + '/execute?params=' + encodeURIComponent(jsonValue);
            } else if (versionName) {
              downloadUrl = host + '/download?uuid=' + uuid + '&version=' + versionName;
            } else {
              downloadUrl = host + '/download?uuid=' + uuid;
            }
          }
          CommonUtils.downloadUrlWithIframe(downloadUrl, 0); // Do not destroy iframe in case downloading because is not possible to know when the files has started downloading
          if (addAlert !== undefined && i18n !== undefined) {
            addAlert({ variant: 'success', dismissCountDown: 10, message: i18n('kcenter.wait.process.download', { name: name }) });
          }
          resolve();
        };
        return new Promise(downloadFunction.bind({ uuid, ws }));
      }
    } return Common.getPromiseException('Missing `uuid` or ( `uuids` and `isZip`) arguments');
  }

  /**
   * Get the url link for a node
   *
   * @param uuid The uuid of the node
   * @returns {string} Return the url link for a node
   */
  static nodeURL(uuid) {
    let currentUrl = document.URL;
    if (currentUrl.includes('/uuid')) {
      currentUrl = currentUrl.substring(0, currentUrl.indexOf('/uuid'));
    }
    // Because component may be used in serveral router path, should be check if ends with browser,
    // otherwise should replace with it
    if (!currentUrl.endsWith(RouterTypes.BROWSER)) {
      currentUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/')) + RouterTypes.BROWSER;
    }
    return currentUrl + '/uuid/' + uuid;
  }

  /**
   * Get the URL share preview for a node
   *
   * @param uuid The uuid of the node
   * @returns {string} Return the url share preview for a node
   */
  static nodeSharePreviewURL(uuid) {
    return CommonUtils.getApplicationUrl() + '/shared/preview/' + uuid;
  }

  /**
   * Get the URL download with token for a node
   *
   * @param token The download token of the node
   * @returns {string} Return the url download with token for a node
   */
  static nodeDownloadWithTokenURL(token) {
    return CommonUtils.getApplicationUrl() + '/download?DTK=' + token;
  }

  /**
   * Get the URL share task for a node
   *
   * @param uuid The task is
   * @returns {string} Return the url share task for a task
   */
  static taskShareURL(taskId) {
    const currentUrl = document.URL;
    return currentUrl + '/' + taskId;
  }

  /**
   * Check if token must be refreshed
   *
   * @param token The token
   * @returns {boolean} Return true when token must be refreshed
   */
  static mustRefreshToken(token) {
    // Token time is in seconds ( not in miliseconds that's the reason why getTime is divided by 1000 )
    // If token expire in 1 hour or less must be refreshed
    if (token) {
      const dateNow = new Date();
      const tokenData = jwtDecode(token);
      return (tokenData.exp <= ((dateNow.getTime() / 1000) + (60 * 60)));
    }
    return true;
  }

  /**
   * Check if token has expired
   *
   * @param token The token
   * @returns {boolean} Return true when the token has expired
   */
  static tokenIsExpired(token) {
    // Token time is in seconds ( not in miliseconds that's the reason why getTime is divided by 1000 )
    // Check if token is expired ( current time - 5 minutes )
    if (token) {
      const dateNow = new Date();
      const tokenData = jwtDecode(token);
      return (tokenData.exp <= ((dateNow.getTime() / 1000) - (60 * 5)));
    }
    return true;
  }

  /**
   * Check if token has 2FA required
   *
   * @param token The token
   * @returns {boolean} Return true when the token has 2FA required
   */
  static tokenIs2FARequired(token) {
    if (token) {
      const tokenData = jwtDecode(token);
      return tokenData.twoFAAuthenticationRequired;
    }
  }

  /**
   * Check if token has 2FA authenticated
   *
   * @param token The token
   * @returns {boolean} Return true when the token has 2FA authenticated
   */
  static tokenIs2FAAuthenticated(token) {
    if (token) {
      const tokenData = jwtDecode(token);
      return tokenData.twoFAAuthenticated;
    }
  }

  /**
   * Function that count occurrences of a substring in a string;
   *
   * @param {String} string               The string
   * @param {String} subString            The sub string to search for
   * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
   *
   * @author Vitim.us https://gist.github.com/victornpb/7736865
   * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
   * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
   */
  static occurrences(string, subString, allowOverlapping) {
    string += '';
    subString += '';
    if (subString.length <= 0) return (string.length + 1);

    let n = 0;
    let pos = 0;
    const step = allowOverlapping ? 1 : subString.length;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      pos = string.indexOf(subString, pos);
      if (pos >= 0) {
        ++n;
        pos += step;
      } else break;
    }
    return n;
  }

  // /**
  //  * Get the pagination page list values array
  //  *
  //  * @param {Array} pageListValues  The page list values
  //  * @returns {[]} Return a list with the pagination page list values, for example [10, 20, 50, 100]
  //  */
  // static getPaginationPageList(pageListValues) {
  //   let pageList = [];
  //   if (pageListValues) {
  //     pageList = pageListValues.split(';'); // In the profiles the values are separated by ";"
  //   }
  //   // When pagination parameters init with default values
  //   if (pageList.length < 1) {
  //     pageList = KCTypes.DEFAULT_PAGE_LIST;
  //   }
  //   return pageList;
  // }

  /**
   * Check if string contains valid email
   *
   * @param email The email string
   * @returns {boolean} When true indicate valid email
   */
  static isValidEmail(email) {
    // const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
    return regex.test(email);
  }

  /**
   * Get the OS where the browser is running
   * @returns {string}
   */
  static getOS() {
    // Inspired in https://stackoverflow.com/questions/38241480/detect-macos-ios-windows-android-and-linux-os-with-js
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE', 'citrix', 'Citrix']; // Include citrix what really is the container of windows
    const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }

    return os;
  }

  /**
   * Check if browser is running in Windows OS
   *
   * @returns {boolean}
   */
  static isWindowsOS() {
    return (this.getOS() === 'Windows');
  }

  /**
   * encrypt the token
   */
  static encryptToken(clusterUuid, token) {
    // Encryption key by default is encrypted
    // let keyHex = CryptoJS.enc.Utf8.parse();
    // let bytes = CryptoJS.DES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse('encrypted text here') }, keyHex, {
    //   mode: CryptoJS.mode.ECB,
    //   padding: CryptoJS.pad.Pkcs7
    // });
    // let encryptionKey = bytes.toString(CryptoJS.enc.Utf8);

    // Encrypting the token
    const encryptionKey = clusterUuid;
    // because is removed in login, here is added 'OKM ' at the beginning
    // but the live edit token comes with OKM at the beginning
    if (!token.startsWith('OKM')) {
      token = 'OKM ' + token;
    }
    const keyHex = CryptoJS.enc.Utf8.parse(encryptionKey);
    const bytes = CryptoJS.DES.encrypt(token, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return bytes.toString();
  }

  /**
   * Check checkHasOwnProperty based in Eslint rules
   * Detailed explanation at https://eslint.org/docs/rules/no-prototype-builtins
   *
   * @param object The object to evaluate
   * @param propertyKey The name of the property
   * @returns {boolean} True when the object has property with propertyKey name
   */
  static checkHasOwnProperty(object, propertyKey) {
    return Object.prototype.hasOwnProperty.call(object, propertyKey);
  }

  /**
   * Convert binary stream response to base64
   *
   * @param data The binary stream
   * @param mimeType The mimetype of the document
   * @returns {Promise<*>} Return the base64 string
   */
  static convertImageBinaryStreamToBase64(data, mimeType) {
    const blob = BlobUtil.arrayBufferToBlob(data, mimeType);
    return BlobUtil.blobToBase64String(blob).then(function(base64String) {
      return (base64String);
    });
  }

  /**
   * Check if license is valid
   *
   * @param licenseInfo The license info
   * @returns {boolean} Return false when licenseInfo is definied and not valid
   */
  static checkLicenseValid(licenseInfo) {
    if (licenseInfo) {
      return licenseInfo.status !== OKMTypes.LICENSE_EXPIRED_HARD && licenseInfo.status !== OKMTypes.LICENSE_EXPIRED_SOFT &&
        licenseInfo.status !== OKMTypes.LICENSE_ERROR;
    } else {
      return true;
    }
  }
}

export default CommonUtils;
