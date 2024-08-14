const UniPaymentSDK = require('./UniPaymentSDK');

/**
 * CommonAPI Class
 *
 * This class provides methods to interact with common utility endpoints
 * of the UniPayment API. It includes methods for pinging the API, querying
 * IPs, retrieving currency information, fetching exchange rates, and checking IPNs.
 */
class CommonAPI {
    constructor(config) {
        this.sdk = new UniPaymentSDK(config);
    }

    /**
     * Ping the API to check its availability.
     *
     * @param {boolean} [usePost=false] - Whether to use a POST request instead of GET.
     * @returns {Promise} - A promise that resolves with the API response.
     */
    ping(usePost = false) {
        if (usePost === true) {
            return this.sdk.post('/ping');
        }
        return this.sdk.get('/ping');
    }

    /**
     * Query the list of IPs used by the API.
     *
     * @returns {Promise} - A promise that resolves with the list of IPs.
     */
    queryIps() {
        return this.sdk.get('/ips');
    }

    /**
     * Retrieve the list of supported currencies.
     *
     * @returns {Promise} - A promise that resolves with the list of currencies.
     */
    getCurrencies() {
        return this.sdk.get('/currencies');
    }

    /**
     * Get exchange rates by a specific fiat currency.
     *
     * @param {string} fiatCurrency - The fiat currency for which to retrieve exchange rates.
     * @returns {Promise} - A promise that resolves with the exchange rates for the specified fiat currency.
     */
    getExchangeRatesByFiatCurrency(fiatCurrency) {
        this.sdk._validateParameter(fiatCurrency, 'fiatCurrency');
        return this.sdk.get(`/rates/${fiatCurrency}`);
    }

    /**
     * Get the exchange rate for a specific currency pair.
     *
     * @param {string} fiatCurrency - The fiat currency in the pair.
     * @param {string} cryptoCurrency - The cryptocurrency in the pair.
     * @returns {Promise} - A promise that resolves with the exchange rate for the specified currency pair.
     */
    getExchangeRateByCurrencyPair(fiatCurrency, cryptoCurrency) {
        this.sdk._validateParameter(fiatCurrency, 'fiatCurrency');
        this.sdk._validateParameter(cryptoCurrency, 'cryptoCurrency');
        return this.sdk.get(`/rates/${fiatCurrency}/${cryptoCurrency}`);
    }

    /**
     * Check IPN (Instant Payment Notification) with the provided notification data.
     *
     * @param {Object} notify - The notification data to check.
     * @returns {Promise} - A promise that resolves with the API response.
     */
    checkIpn(notify) {
        this.sdk._validateParameter(notify, 'notify');
        return this.sdk.post('/ipn', notify);
    }
}

module.exports = CommonAPI;
