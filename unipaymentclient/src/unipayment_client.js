/*jshint -W069 */

/**
 * @class unipayment_client
 * @type {function(): unipayment_client}
 */
const uni_payment_client = (function () {
    'use strict';

    const axios = require('axios');
    const os = require('os');
    const crypto = require('crypto');
    let apiHost = '';
    let clientId = '';
    let clientSecret = '';
    let apiVersion = '1.0'

    const SDK_NAME = "unipayment_sdk_node/1.0.1 (" + os.type() + ' ' + os.release() + ')';

    /**
     * Constructor
     * @param options
     */
    function uni_payment_client(options) {
        if (typeof options !== 'object') {
            throw new Error('"configuration" object is missing. Constructor should be called with a json object');
        }
        apiHost = (typeof options === 'object') ? options.apiHost : options;
        apiHost = apiHost ? apiHost : 'https://sandbox-api.unipayment.io';
        if (apiHost.length === 0) {
            throw new Error('apiHost parameter must be specified as a string.');
        }

        const missingValues = [];
        if (options.clientId) {
            clientId = options.clientId;
        } else {
            missingValues.push('clientId');
        }

        if (options.clientSecret) {
            clientSecret = options.clientSecret;
        } else {
            missingValues.push('clientSecret');
        }

        if (options.apiVersion) {
            apiVersion = options.apiVersion;
        } else {
            missingValues.push('apiVersion');
        }

        if (missingValues.length > 0) {
            const errorString = missingValues.join(", ");
            if (missingValues.length === 1) {
                throw new Error(errorString + " is missing in configuration.");
            } else {
                throw new Error(errorString + " are missing in configuration.");
            }
        }
    }

    /**
     * Get Invoices
     * @method
     */
    uni_payment_client.prototype.createInvoice = (parameters) => {
        if (parameters === undefined) {
            parameters = {};
        }

        if (!parameters.hasOwnProperty('page_no')) {
            parameters['page_no'] = 1;
        }

        if (!parameters.hasOwnProperty('page_size')) {
            parameters['page_size'] = 10;
        }

        const url = apiHost + '/v' + apiVersion + '/invoices'
        return axios.post(url, parameters, {
            headers: {
                'User-Agent': SDK_NAME,
                'Authorization': 'Hmac ' + signRequest(clientId, clientSecret, url, 'POST', JSON.stringify(parameters)),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

    /**
     * Get Invoices
     * @method
     */
    uni_payment_client.prototype.getInvoices = (parameters) => {
        if (parameters === undefined) {
            parameters = {};
        }

        const params = [];
        for (const p in parameters)
            if (parameters.hasOwnProperty(p)) {
                params.push(p + "=" + parameters[p]);
            }
        const queryString = params.join("&");

        let url = apiHost + '/v' + apiVersion + '/invoices'
        if (params.length > 0) {
            url += '?' + queryString;
        }
        return axios.get(url, {
            headers: {
                'User-Agent': SDK_NAME,
                'Authorization': 'Hmac ' + signRequest(clientId, clientSecret, url, 'GET', ''),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

    /**
     * Query Invoice By Invoice ID
     * @method
     */
    uni_payment_client.prototype.queryInvoiceById = (invoiceId) => {
        if (invoiceId === undefined || invoiceId === null || invoiceId.trim() === '') {
            throw new Error('"invoiceId" parameter is missing.');
        }
        const url = apiHost + '/v' + apiVersion + '/invoices/' + invoiceId
        return axios.get(url, {
            headers: {
                'User-Agent': SDK_NAME,
                'Authorization': 'Hmac ' + signRequest(clientId, clientSecret, url, 'GET', ''),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

    /**
     * Query Ips
     * @method
     */
    uni_payment_client.prototype.queryIps = () => {
        const url = apiHost + '/v' + apiVersion + '/ips'
        return axios.get(url, {
            headers: {
                'User-Agent': SDK_NAME,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

    /**
     * Get Currencies
     * @method
     */
    uni_payment_client.prototype.getCurrencies = () => {
        const url = apiHost + '/v' + apiVersion + '/currencies'
        return axios.get(url, {
            headers: {
                'User-Agent': SDK_NAME,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

    /**
     * Get Exchange Rates by Fiat Currency
     * @method
     */
    uni_payment_client.prototype.getExchangeRatesByFiatCurrency = (fiatCurrency) => {
        if (fiatCurrency === undefined || fiatCurrency === null || fiatCurrency.trim() === '') {
            throw new Error('"fiatCurrency" parameter is missing.');
        }
        const url = apiHost + '/v' + apiVersion + '/rates/' + fiatCurrency
        return axios.get(url, {
            headers: {
                'User-Agent': SDK_NAME,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

    /**
     * Get Exchange Rate by Currency Pair
     * @method
     */
    uni_payment_client.prototype.getExchangeRateByCurrencyPair = (fiatCurrency, cryptoCurrency) => {
        if (fiatCurrency === undefined || fiatCurrency === null || fiatCurrency.trim() === '') {
            throw new Error('"fiatCurrency" parameter is missing.');
        }
        if (cryptoCurrency === undefined || cryptoCurrency === null || cryptoCurrency.trim() === '') {
            throw new Error('"cryptoCurrency" parameter is missing.');
        }
        const url = apiHost + '/v' + apiVersion + '/rates/' + fiatCurrency + '/' + cryptoCurrency
        return axios.get(url, {
            headers: {
                'User-Agent': SDK_NAME,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };


     /**
     * Check IPN
     * @method
     */
    uni_payment_client.prototype.checkIpn = (notify) => {
        if (notify === undefined || notify === null || notify.trim() === '') {
            throw new Error('"notify" parameter is missing.');
        }

        const url = apiHost + '/v' + apiVersion + '/ipn'
        return axios.post(url, notify, {
            headers: {
                'User-Agent': SDK_NAME,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

    /**
     * Sign Request
     * @param clientId Client ID
     * @param clientSecret Client Secret
     * @param uri URL
     * @param requestMethod Request Method
     * @param body Request Body
     */
    function signRequest(clientId, clientSecret, uri, requestMethod, body) {
        const requestTimeStamp = Math.round(Date.now() / 1000);
        const requestUri = encodeURIComponent(uri.toLowerCase());
        let requestContentBase64String = '';
        if (body !== undefined && body !== null && body.trim() !== '') {
            requestContentBase64String = crypto.createHash('md5').update(body).digest("base64")
        }
        const nonce = crypto.randomBytes(16).toString("hex");
        const signatureRawData = clientId + requestMethod + requestUri + requestTimeStamp + nonce + requestContentBase64String;
        const signature = crypto.createHmac('SHA256', clientSecret).update(signatureRawData).digest('base64');
        return clientId + ':' + signature + ':' + nonce + ':' + requestTimeStamp;
    }

    return uni_payment_client;
})();

exports.uni_payment_client = uni_payment_client;