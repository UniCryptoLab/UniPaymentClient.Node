/**
 * WebhookAPI Class
 *
 * This class provides utility methods to generate and verify webhook signature
 */
class WebhookSignatureUtil {

    /**
     * Validates the provided signature against the generated signature.
     *
     * @param {string} payload - The payload data to be signed.
     * @param {string} secretKey - The secret key used for generating the signature.
     * @param {string} signatureToVerify - The signature to verify against.
     * @returns {boolean} - Returns true if the signatures match, otherwise false.
     */
    static isValid(payload, secretKey, signatureToVerify) {
        return signatureToVerify === this.generateSignature(payload, secretKey);
    }

    /**
     * Generates an HMAC-SHA256 signature and encodes it in Base64.
     *
     * @param {string} payload - The payload data to be signed.
     * @param {string} secretKey - The secret key used for generating the signature.
     * @returns {string} - The generated Base64-encoded signature.
     */
    static generateSignature(payload, secretKey) {
        const crypto = require('crypto');

        // Create an HMAC-SHA256 hash
        const hashBytes = crypto.createHmac('sha256', secretKey).update(payload).digest();

        // Encode the hash in Base64
        return hashBytes.toString('base64');
    }
}

module.exports = WebhookSignatureUtil;