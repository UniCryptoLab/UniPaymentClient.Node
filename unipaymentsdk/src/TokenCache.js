/**
 * TokenCache Class
 *
 * This class is a simple in-memory cache for storing access tokens with an expiration time.
 * It provides methods to set and retrieve the access token, automatically handling expiration.
 */
class TokenCache {
    static cache = {};
    static ACCESS_TOKEN = 'access_token';

    /**
     * Stores the access token in the cache with an optional time-to-live (TTL).
     *
     * @param {string} value - The access token to be stored.
     * @param {number} [ttl=3600] - The time-to-live for the token in seconds. Defaults to 3600 seconds (1 hour).
     */
    static setAccessToken(value, ttl = 3600) {
        const expiry = Date.now() + ttl * 1000;
        this.cache[this.ACCESS_TOKEN] = {expiry, value};
    }

    /**
     * Retrieves the access token from the cache if it hasn't expired.
     *
     * @returns {string|null} - The cached access token, or `null` if the token is not found or has expired.
     */
    static getAccessToken() {
        const cachedItem = this.cache[this.ACCESS_TOKEN];
        if (!cachedItem) {
            return null;
        }

        if (Date.now() > cachedItem.expiry) {
            delete this.cache[this.ACCESS_TOKEN];
            return null;
        }

        return cachedItem.value;
    }
}

module.exports = TokenCache;
