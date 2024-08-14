const UniPaymentSDK = require('./UniPaymentSDK');

/**
 * BeneficiaryAPI Class
 *
 * This class provides methods to interact with the Beneficiary-related endpoints
 * of the UniPayment API. It allows for creating, querying, retrieving, updating,
 * and deleting beneficiaries and their associated payment methods.
 */
class BeneficiaryAPI {
    constructor(config) {
        this.sdk = new UniPaymentSDK(config);
    }

    /**
     * Create a new beneficiary.
     *
     * @param {Object} beneficiary - The beneficiary data to create.
     * @returns {Promise} - A promise that resolves with the API response.
     */
    createBeneficiary(beneficiary) {
        this.sdk._validateParameter(beneficiary, 'beneficiary');
        return this.sdk.post('/beneficiaries', beneficiary);
    }

    /**
     * Query beneficiaries based on the provided parameters.
     *
     * @param {Object} [parameters={}] - The query parameters. Defaults to `{}`.
     * @param {number} [parameters.page_no=1] - The page number to retrieve.
     * @param {number} [parameters.page_size=10] - The number of records per page.
     * @returns {Promise} - A promise that resolves with the list of beneficiaries.
     */
    queryBeneficiaries(parameters = {}) {
        if (!parameters.hasOwnProperty('page_no')) {
            parameters['page_no'] = 1;
        }

        if (!parameters.hasOwnProperty('page_size')) {
            parameters['page_size'] = 10;
        }
        return this.sdk.get('/beneficiaries', parameters);
    }

    /**
     * Retrieve a beneficiary by its ID.
     *
     * @param {string} beneficiaryId - The ID of the beneficiary to retrieve.
     * @returns {Promise} - A promise that resolves with the beneficiary data.
     */
    getBeneficiaryById(beneficiaryId) {
        this.sdk._validateParameter(beneficiaryId, 'beneficiaryId');
        return this.sdk.get(`/beneficiaries/${beneficiaryId}`);
    }

    /**
     * Update an existing beneficiary by its ID.
     *
     * @param {string} beneficiaryId - The ID of the beneficiary to update.
     * @param {Object} beneficiary - The new beneficiary data.
     * @returns {Promise} - A promise that resolves with the API response.
     */
    updateBeneficiary(beneficiaryId, beneficiary) {
        this.sdk._validateParameter(beneficiary, 'beneficiary');
        return this.sdk.put(`/beneficiaries/${beneficiaryId}`, beneficiary);
    }

    /**
     * Delete a beneficiary by its ID.
     *
     * @param {string} beneficiaryId - The ID of the beneficiary to delete.
     * @returns {Promise} - A promise that resolves with the API response.
     */
    deleteBeneficiaryById(beneficiaryId) {
        this.sdk._validateParameter(beneficiaryId, 'beneficiaryId');
        return this.sdk.delete(`/beneficiaries/${beneficiaryId}`);
    }

    /**
     * Create a new payment method for a specific beneficiary.
     *
     * @param {string} beneficiaryId - The ID of the beneficiary.
     * @param {Object} paymentMethod - The payment method data to create.
     * @returns {Promise} - A promise that resolves with the API response.
     */
    createPaymentMethod(beneficiaryId, paymentMethod) {
        this.sdk._validateParameter(beneficiaryId, 'beneficiaryId');
        this.sdk._validateParameter(paymentMethod, 'paymentMethod');
        return this.sdk.post(`/beneficiaries/${beneficiaryId}/payment-methods`, paymentMethod);
    }

    /**
     * Retrieve a list of payment methods associated with a specific beneficiary.
     *
     * @param {string} beneficiaryId - The ID of the beneficiary.
     * @returns {Promise} - A promise that resolves with the list of payment methods.
     */
    getPaymentMethodList(beneficiaryId) {
        this.sdk._validateParameter(beneficiaryId, 'beneficiaryId');
        return this.sdk.get(`/beneficiaries/${beneficiaryId}/payment-methods`);
    }

    /**
     * Retrieve a specific payment method by its ID.
     *
     * @param {string} beneficiaryId - The ID of the beneficiary.
     * @param {string} paymentMethodId - The ID of the payment method to retrieve.
     * @returns {Promise} - A promise that resolves with the payment method data.
     */
    getPaymentMethodById(beneficiaryId, paymentMethodId) {
        this.sdk._validateParameter(beneficiaryId, 'beneficiaryId');
        this.sdk._validateParameter(paymentMethodId, 'paymentMethodId');
        return this.sdk.get(`/beneficiaries/${beneficiaryId}/payment-methods/${paymentMethodId}`);
    }

    /**
     * Update an existing payment method by its ID.
     *
     * @param {string} beneficiaryId - The ID of the beneficiary.
     * @param {string} paymentMethodId - The ID of the payment method to update.
     * @param {Object} paymentMethod - The new payment method data.
     * @returns {Promise} - A promise that resolves with the API response.
     */
    updatePaymentMethod(beneficiaryId, paymentMethodId, paymentMethod) {
        this.sdk._validateParameter(beneficiaryId, 'beneficiaryId');
        this.sdk._validateParameter(paymentMethodId, 'paymentMethodId');
        this.sdk._validateParameter(paymentMethod, 'paymentMethod');
        return this.sdk.put(`/beneficiaries/${beneficiaryId}/payment-methods/${paymentMethodId}`, paymentMethod);
    }

    /**
     * Delete a specific payment method by its ID.
     *
     * @param {string} beneficiaryId - The ID of the beneficiary.
     * @param {string} paymentMethodId - The ID of the payment method to delete.
     * @returns {Promise} - A promise that resolves with the API response.
     */
    deletePaymentMethod(beneficiaryId, paymentMethodId) {
        this.sdk._validateParameter(beneficiaryId, 'beneficiaryId');
        this.sdk._validateParameter(paymentMethodId, 'paymentMethodId');
        return this.sdk.delete(`/beneficiaries/${beneficiaryId}/payment-methods/${paymentMethodId}`);
    }
}

module.exports = BeneficiaryAPI;