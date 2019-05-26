'use strict';

const performYrNoApiRequest = require('./lib/api-request');
const endpoints = require('./lib/endpoints');

const HOST = 'https://api.met.no';
const PATH = '/weatherapi';


/**
 * Main export for this module. Creates api wrapper instances
 * @param  {Object} config
 * @return {Object}
 */
module.exports = (config) => {
  config = Object.assign({
    request: {
      timeout: 60000
    }
  }, config);

  const api = {};

  // Build API functions
  for (let i = 0; i < endpoints.length; i++) {
    // Wrap in closure to prevent value of fn from being modified
    (function () {
      const fn = endpoints[i].toLowerCase();

      api[fn] = (params, callback) => {
        params = Object.assign({}, config, params);

        if (!params.version) {
          const e = new Error('params.version is a required config required for api calls');
          if (callback) {
            callback(e);
          } else {
            throw e;
          }
        } else {

          // console.log('xxx', url.resolve(HOST, `${PATH}/${fn}/${params.version}`))
          const query = Object.entries(params.query).map(e => e.join('=')).join('&');
          const requestOpts = {
            url: HOST + PATH + '/' + fn + '/1.9?' + query
          };
          return performYrNoApiRequest(requestOpts, callback);
        }
      };
    })();
  }

  return api;
};
