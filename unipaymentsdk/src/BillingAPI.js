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
}

module.exports = BillingAPI;
