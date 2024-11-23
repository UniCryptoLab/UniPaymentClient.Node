const UniPaymentSDK = require('./UniPaymentSDK');

/**
 * BillingAPI Class
 *
 * This class provides methods to interact with the billing and invoice-related
 * endpoints of the UniPayment API. It allows for creating invoices, querying
 * multiple invoices, and retrieving invoice details by ID.
 */
class BillingAPI {
    constructor(config) {
        this.sdk = new UniPaymentSDK(config);
    }

    /**
     * Create a new invoice.
     *
     * @param {Object} createInvoiceRequest - The invoice data to be created.
     * @returns {Promise} - A promise that resolves with the API response.
     */
    createInvoice(createInvoiceRequest) {
        this.sdk._validateParameter(createInvoiceRequest, 'createInvoiceRequest');
        return this.sdk.post('/invoices', createInvoiceRequest);
    }

    /**
     * Query invoices based on the provided parameters.
     *
     * @param {Object} [parameters={}] - The query parameters. Defaults to `{}`.
     * @param {number} [parameters.page_no=1] - The page number to retrieve.
     * @param {number} [parameters.page_size=10] - The number of records per page.
     * @returns {Promise} - A promise that resolves with the list of invoices.
     */
    queryInvoices(parameters = {}) {
        if (!parameters.hasOwnProperty('page_no')) {
            parameters['page_no'] = 1;
        }

        if (!parameters.hasOwnProperty('page_size')) {
            parameters['page_size'] = 10;
        }
        return this.sdk.get('/invoices', parameters);
    }

    /**
     * Retrieve an invoice by its ID.
     *
     * @param {string} invoiceId - The ID of the invoice to retrieve.
     * @returns {Promise} - A promise that resolves with the invoice data.
     */
    getInvoiceById(invoiceId) {
        this.sdk._validateParameter(invoiceId, 'invoiceId');
        return this.sdk.get(`/invoices/${invoiceId}`);
    }

    /**
     * Create a new invoice refund.
     *
     * @param {string} invoiceId - The ID of the invoice.
     * @param {Object} createInvoiceRefundRequest - The invoice refund data to be created.
     * @returns {Promise} - A promise that resolves with the API response.
     */
    createInvoiceRefund(invoiceId, createInvoiceRefundRequest) {
        this.sdk._validateParameter(invoiceId, 'invoiceId');
        this.sdk._validateParameter(createInvoiceRefundRequest, 'createInvoiceRefundRequest');
        return this.sdk.post(`/invoices/${invoiceId}/refunds`, createInvoiceRefundRequest);
    }

    /**
     * Cancel an invoice refund.
     *
     * @param {string} refundId - The Refund ID of the invoice refund.
     * @param {Object} cancelInvoiceRefundRequest - The invoice refund data to be created.
     * @returns {Promise} - A promise that resolves with the API response.
     */
    cancelInvoiceRefund(refundId, cancelInvoiceRefundRequest) {
        this.sdk._validateParameter(refundId, 'refundId');
        this.sdk._validateParameter(cancelInvoiceRefundRequest, 'cancelInvoiceRefundRequest');
        return this.sdk.put(`/invoices/refunds/${refundId}/cancel`, cancelInvoiceRefundRequest);
    }

    /**
     * Query invoice Refunds based on the provided parameters.
     *
     * @param {Object} [parameters={}] - The query parameters. Defaults to `{}`.
     * @param {number} [parameters.page_no=1] - The page number to retrieve.
     * @param {number} [parameters.page_size=10] - The number of records per page.
     * @returns {Promise} - A promise that resolves with the list of invoices.
     */
    queryInvoiceRefunds(parameters = {}) {
        if (!parameters.hasOwnProperty('page_no')) {
            parameters['page_no'] = 1;
        }

        if (!parameters.hasOwnProperty('page_size')) {
            parameters['page_size'] = 10;
        }
        return this.sdk.get('/invoices/refunds', parameters);
    }
}

module.exports = BillingAPI;
