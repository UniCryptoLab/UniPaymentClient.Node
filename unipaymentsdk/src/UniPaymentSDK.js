const axios = require('axios');
const os = require('os');
const TokenCache = require("./TokenCache");

/**
 * UniPaymentSDK Class
 * Handles the API client requests and authentication via OAuth 2.0
 */
class UniPaymentSDK {
    constructor({apiHost, clientId, clientSecret, apiVersion = '1.0'}) {
        if (!apiHost || !clientId || !clientSecret) {
            throw new Error('apiHost, clientId, and clientSecret are required.');
        }

        this.apiHost = apiHost;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.apiVersion = apiVersion;
        this.sdkName = `unipayment_sdk_node/2.0.0 (${os.type()} ${os.release()})`;
        this.log = console; // Replace this with a proper logging system if needed
    }

    /**
     * GET request
     * @param {string} endpoint - API endpoint
     * @param {Object} [params={}] - Query parameters
     * @returns {Promise} Axios promise
     */
    async get(endpoint, params = {}) {
        const url = this._constructUrl(endpoint, params);
        const accessToken = await this.getAccessToken();
        return axios.get(url, {
            headers: this._createHeaders(accessToken),
        });
    }

    /**
     * POST request
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request body data
     * @returns {Promise} Axios promise
     */
    async post(endpoint, data = {}) {
        const url = this._constructUrl(endpoint);
        const accessToken = await this.getAccessToken();
        return axios.post(url, data, {
            headers: this._createHeaders(accessToken),
        });
    }

    /**
     * PUT request
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request body data
     * @returns {Promise} Axios promise
     */
    async put(endpoint, data = {}) {
        const url = this._constructUrl(endpoint);
        const accessToken = await this.getAccessToken();
        return axios.put(url, data, {
            headers: this._createHeaders(accessToken),
        });
    }

    /**
     * DELETE request
     * @param {string} endpoint - API endpoint
     * @returns {Promise} Axios promise
     */
    async delete(endpoint) {
        const url = this._constructUrl(endpoint);
        const accessToken = await this.getAccessToken();
        return axios.delete(url, {
            headers: this._createHeaders(accessToken),
        });
    }

    /**
     * Get Access Token
     */
    async getAccessToken() {
        let accessToken = TokenCache.getAccessToken();
        if (!this.isTokenValid(accessToken)) {
            const url = this.apiHost + '/connect/token';
            const headers = {
                'User-Agent': this.sdkName,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            };
            try {
                const response = await axios.post(url, `client_id=${encodeURIComponent(this.clientId)}&client_secret=${encodeURIComponent(this.clientSecret)}&grant_type=client_credentials`, {headers: headers});
                const tokenResponse = response.data;
                accessToken = tokenResponse['access_token'];
                TokenCache.setAccessToken(accessToken, tokenResponse['expires_in']);
            } catch (error) {
                this.log.warn('Unable to get access token', error);
                throw new Error(error);
            }
        }
        return accessToken;
    }

    isTokenValid(accessToken) {
        if (!accessToken || accessToken.trim() === '') {
            return false;
        }
        const parts = accessToken.split('.');
        if (parts.length !== 3) {
            this.log.warn(`Invalid token: ${accessToken}`);
            return false;
        }
        try {
            const decodedPart2 = Buffer.from(parts[1], 'base64').toString('ascii');
            const dataMap = JSON.parse(decodedPart2);
            const exp = parseInt(dataMap.exp, 10);
            const expInMillis = exp * 1000;
            this.log.info(`Access Token expires on: ${new Date(expInMillis)}`);
            const currentMillis = Date.now();
            return expInMillis > currentMillis;
        } catch (error) {
            this.log.warn(`Invalid token: ${accessToken}`, error);
            return false;
        }
    }

    /**
     * Constructs the full API URL with the given endpoint and query parameters
     * @param {string} endpoint - API endpoint
     * @param {Object} [params={}] - Query parameters
     * @returns {string} Full API URL
     */
    _constructUrl(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return `${this.apiHost}/v${this.apiVersion}${endpoint}${queryString ? '?' + queryString : ''}`;
    }

    /**
     * Creates headers for the API request, including the access token
     * @param {string} accessToken - The access token for authorization
     * @returns {Object} Headers object
     */
    _createHeaders(accessToken) {
        return {
            'User-Agent': this.sdkName,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };
    }

    /**
     * Helper function to validate a parameter
     * @param {*} parameter - The parameter to validate
     * @param {string} parameterName - The name of the parameter
     */
    _validateParameter(parameter, parameterName) {
        if (!parameter) {
            throw new Error(`${parameterName} is required.`);
        }
    }

}

module.exports = UniPaymentSDK;
