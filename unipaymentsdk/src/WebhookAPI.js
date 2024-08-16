const UniPaymentSDK = require('./UniPaymentSDK');

/**
 * WebhookAPI Class
 *
 * This class provides methods to interact with the webhook-related
 * endpoints of the UniPayment API. It allows for updating the notify URL and the secret key
 * associated with the webhook settings.
 */
class WebhookAPI {
    constructor(config) {
        this.sdk = new UniPaymentSDK(config);
    }

    /**
     * Update Notify URL.
     *
     * This method updates the notify URL for webhook notifications.
     *
     * @param {Object} updateNotifyURLRequest - The Update Notify URL Request.
     * @returns {Promise} - A promise that resolves with the API response.
     */
    updateNotifyURL(updateNotifyURLRequest) {
        this.sdk._validateParameter(updateNotifyURLRequest, 'updateNotifyURLRequest');
        return this.sdk.post('/webhook/notify-url', updateNotifyURLRequest);
    }

    /**
     * Update Secret Key.
     *
     * This method updates the secret key used for verifying webhook signatures.
     *
     * @param {Object} updateSecretKeyRequest - The Update Secret Key Request.
     * @returns {Promise} - A promise that resolves with the API response.
     */
    updateSecretKey(updateSecretKeyRequest) {
        this.sdk._validateParameter(updateSecretKeyRequest, 'updateSecretKeyRequest');
        return this.sdk.post('/webhook/secret-key', updateSecretKeyRequest);
    }

}

module.exports = WebhookAPI;
