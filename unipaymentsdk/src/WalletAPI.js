const UniPaymentSDK = require('./UniPaymentSDK');

/**
 * WalletAPI Class
 *
 * This class provides methods to interact with wallet-related endpoints of the UniPayment API.
 * It includes methods for retrieving wallet balances, getting wallet accounts, querying account transactions,
 * and obtaining deposit information such as crypto addresses and bank accounts.
 */
class WalletAPI {
    constructor(config) {
        this.sdk = new UniPaymentSDK(config);
    }

    /**
     * Retrieve the balances of all wallet accounts.
     *
     * @returns {Promise} - A promise that resolves with the wallet balances.
     */
    getBalances() {
        return this.sdk.get('/wallet/balances');
    }

    /**
     * Retrieve the list of wallet accounts.
     *
     * @returns {Promise} - A promise that resolves with the wallet accounts.
     */
    getAccounts() {
        return this.sdk.get('/wallet/accounts');
    }

    /**
     * Query the transactions of a specific wallet account.
     *
     * @param {string} accountId - The ID of the wallet account to query transactions for.
     * @param {Object} [parameters={}] - The query parameters. Defaults to `{}`.
     * @param {number} [parameters.page_no=1] - The page number to retrieve.
     * @param {number} [parameters.page_size=10] - The number of records per page.
     * @returns {Promise} - A promise that resolves with the list of transactions.
     */
    queryTransactions(accountId, parameters = {}) {
        this.sdk._validateParameter(accountId, 'accountId');
        if (!parameters.hasOwnProperty('page_no')) {
            parameters['page_no'] = 1;
        }

        if (!parameters.hasOwnProperty('page_size')) {
            parameters['page_size'] = 10;
        }
        return this.sdk.get(`/wallet/accounts/${accountId}/transactions`, parameters);
    }

    /**
     * Retrieve the crypto deposit address for a specific wallet account.
     *
     * @param {string} accountId - The ID of the wallet account to retrieve the deposit address for.
     * @returns {Promise} - A promise that resolves with the deposit address.
     */
    getDepositAddress(accountId) {
        this.sdk._validateParameter(accountId, 'accountId');
        return this.sdk.get(`/wallet/accounts/${accountId}/deposit/address`);
    }

    /**
     * Retrieve the bank account information for depositing to a specific wallet account.
     *
     * @param {string} accountId - The ID of the wallet account to retrieve the bank account information for.
     * @returns {Promise} - A promise that resolves with the deposit bank account information.
     */
    getDepositBankAccount(accountId) {
        this.sdk._validateParameter(accountId, 'accountId');
        return this.sdk.get(`/wallet/accounts/${accountId}/deposit/bank-account`);
    }
}

module.exports = WalletAPI;
