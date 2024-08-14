const UniPaymentSDK = require('./UniPaymentSDK');

/**
 * PaymentAPI Class
 *
 * This class provides methods to interact with the payment-related endpoints
 * of the UniPayment API. It includes methods for creating payments, retrieving
 * payment details, querying payments, confirming, and canceling payments, as well as fetching payment fees.
 */
class PaymentAPI {
    constructor(config) {
        this.sdk = new UniPaymentSDK(config);
    }

    /**
     * Create a new payment.
     *
     * @param {Object} createPaymentRequest - The payment data to be created.
     * @returns {Promise} - A promise that resolves with the API response.
     */
    createPayment(createPaymentRequest) {
        this.sdk._validateParameter(createPaymentRequest, 'createPaymentRequest');
        return this.sdk.post('/payments', createPaymentRequest);
    }

    /**
     * Retrieve payment details by its ID.
     *
     * @param {string} paymentId - The ID of the payment to retrieve.
     * @returns {Promise} - A promise that resolves with the payment details.
     */
    getPaymentById(paymentId) {
        this.sdk._validateParameter(paymentId, 'paymentId');
        return this.sdk.get('/payments/' + paymentId);
    }

    /**
     * Query payments based on the provided parameters.
     *
     * @param {Object} [parameters={}] - The query parameters. Defaults to `{}`.
     * @param {number} [parameters.page_no=1] - The page number to retrieve.
     * @param {number} [parameters.page_size=10] - The number of records per page.
     * @returns {Promise} - A promise that resolves with the list of payments.
     */
    queryPayments(parameters = {}) {
        if (!parameters.hasOwnProperty('page_no')) {
            parameters['page_no'] = 1;
        }

        if (!parameters.hasOwnProperty('page_size')) {
            parameters['page_size'] = 10;
        }
        return this.sdk.get('/payments', parameters);
    }

    /**
     * Confirm a payment by its ID.
     *
     * @param {string} paymentId - The ID of the payment to confirm.
     * @returns {Promise} - A promise that resolves with the API response.
     */
    confirmPayment(paymentId) {
        this.sdk._validateParameter(paymentId, 'paymentId');
        return this.sdk.put('/payments/' + paymentId + '/confirm');
    }

    /**
     * Cancel a payment by its ID.
     *
     * @param {string} paymentId - The ID of the payment to cancel.
     * @returns {Promise} - A promise that resolves with the API response.
     */
    cancelPayment(paymentId) {
        this.sdk._validateParameter(paymentId, 'paymentId');
        return this.sdk.put('/payments/' + paymentId + '/cancel');
    }

    /**
     * Retrieve the payment fee information.
     *
     * @returns {Promise} - A promise that resolves with the payment fee details.
     */
    getPaymentFee() {
        return this.sdk.get('/payments/fee');
    }
}

module.exports = PaymentAPI;