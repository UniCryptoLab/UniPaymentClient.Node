const UniPaymentSDK = require('./UniPaymentSDK');

/**
 * ExchangeAPI Class
 *
 * This class provides methods to interact with the currency exchange-related
 * endpoints of the UniPayment API. It allows for retrieving exchange quotes,
 * accepting quotes, querying exchange orders, and retrieving specific exchange orders by ID.
 */
class ExchangeAPI {
    constructor(config) {
        this.sdk = new UniPaymentSDK(config);
    }

    /**
     * Get a currency exchange quote.
     *
     * @param {string} fromCurrency - The currency to exchange from.
     * @param {string} toCurrency - The currency to exchange to.
     * @param {number} exchangeAmount - The amount of currency to exchange.
     * @returns {Promise} - A promise that resolves with the exchange quote.
     * @throws {Error} - Throws an error if `exchangeAmount` is not a valid number.
     */
    getQuote(fromCurrency, toCurrency, exchangeAmount) {
        this.sdk._validateParameter(fromCurrency, 'fromCurrency');
        this.sdk._validateParameter(toCurrency, 'toCurrency');
        this.sdk._validateParameter(exchangeAmount, 'exchangeAmount');
        if (isNaN(exchangeAmount)) {
            throw new Error(`${exchangeAmount} should be a decimal number.`);
        }

        const parameters = {
            from_currency: fromCurrency,
            to_currency: toCurrency,
            exchange_amount: exchangeAmount,
        };
        return this.sdk.get('/exchange/quote', parameters);
    }

    /**
     * Accept an exchange quote.
     *
     * @param {string} quoteId - The ID of the quote to accept.
     * @returns {Promise} - A promise that resolves with the API response.
     */
    acceptQuote(quoteId) {
        this.sdk._validateParameter(quoteId, 'quoteId');
        return this.sdk.put(`/exchange/quote/${quoteId}`);
    }

    /**
     * Query exchange orders based on the provided parameters.
     *
     * @param {Object} [parameters={}] - The query parameters. Defaults to `{}`.
     * @param {number} [parameters.page_no=1] - The page number to retrieve.
     * @param {number} [parameters.page_size=10] - The number of records per page.
     * @returns {Promise} - A promise that resolves with the list of exchange orders.
     */
    queryExchangeOrders(parameters = {}) {
        if (!parameters.hasOwnProperty('page_no')) {
            parameters['page_no'] = 1;
        }

        if (!parameters.hasOwnProperty('page_size')) {
            parameters['page_size'] = 10;
        }
        return this.sdk.get('/exchange/orders', parameters);
    }

    /**
     * Retrieve a specific exchange order by its ID.
     *
     * @param {string} orderId - The ID of the exchange order to retrieve.
     * @returns {Promise} - A promise that resolves with the exchange order details.
     */
    getExchangeOrder(orderId) {
        this.sdk._validateParameter(orderId, 'orderId');
        return this.sdk.get(`/exchange/orders/${orderId}`);
    }
}

module.exports = ExchangeAPI;