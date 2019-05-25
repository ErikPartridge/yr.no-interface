'use strict';

const log = require('debug')(require('../package.json').name);

/**
 * Make a request to the met.no API and handle the response.
 * Alternatively, if no callback is supplied, return the stream.
 * @param  {Object}   opts
 * @param  {Function} callback
 * @return {ReadableStream|undefined}
 */
module.exports = function performYrNoApiRequest (opts, callback) {
  // Pipe instead
  if(typeof callback !== 'function') {
    log('no callback passed so returning request object for piping');
    return request(opts);
  }
  fetch(opts['url').then((res) => {
      return res.text()      
  }).then((textData) => { 
      callback(null, textData);
  }).catch((err) => {
      callback(err, null);
  });
            
}
