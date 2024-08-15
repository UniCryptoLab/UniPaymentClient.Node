const express = require('express');
const router = express.Router();
const configuration = require('./configuration.json');
const {BeneficiaryAPI, BillingAPI, CommonAPI, ExchangeAPI, PaymentAPI, WalletAPI} = require('unipayment-sdk');

// Middleware to set common view variables
router.use((req, res, next) => {
    res.locals.clientId = configuration.clientId;
    res.locals.apiHost = configuration.apiHost;
    res.locals.clientSecret = configuration.clientSecret;
    next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Home Page'});
});

/* GET create invoice page. */
router.get('/create-invoice', function (req, res, next) {
    res.render('index', {title: 'Create Invoice'});
});

/* GET query invoice page. */
router.get('/query-invoice', function (req, res, next) {
    res.render('query', {title: 'Query Invoice'});
});

/* POST create invoice. */
router.post('/create-invoice', async function (req, res, next) {
    try {
        const {apiHost, clientId, clientSecret, ...parameters} = req.body;

        // Validate required fields
        if (!clientId || !apiHost || !clientSecret) {
            return res.render('index', {
                title: 'Home Page',
                error: 'Missing required fields: clientId, apiHost, or clientSecret'
            });
        }

        // Update configuration
        configuration.apiHost = apiHost;
        configuration.clientId = clientId;
        configuration.clientSecret = clientSecret;

        const billingAPI = new BillingAPI(configuration);
        const response = await billingAPI.createInvoice(parameters);

        if (response.data.code === 'OK') {
            res.redirect(response.data.data.invoice_url);
        } else {
            res.render('index', {
                title: 'Home Page',
                error: response.data.Msg
            });
        }
    } catch (error) {
        console.error(error);
        res.render('index', {
            title: 'Home Page',
            error: 'An error occurred while creating the invoice.'
        });
    }
});

/* POST query invoice. */
router.post('/query-invoice', async function (req, res, next) {
    try {
        const {apiHost, clientId, clientSecret, ...parameters} = req.body;

        // Validate required fields
        if (!clientId || !apiHost || !clientSecret) {
            return res.render('query', {
                title: 'Query Invoice',
                error: 'Missing required fields: clientId, apiHost, or clientSecret'
            });
        }

        // Update configuration
        configuration.apiHost = apiHost;
        configuration.clientId = clientId;
        configuration.clientSecret = clientSecret;

        const billingAPI = new BillingAPI(configuration);
        const response = await billingAPI.queryInvoices(parameters);

        res.render('query', {
            title: 'Query Invoice',
            queryResult: response.data.data.models,
            totalCount: response.data.data.total
        });
    } catch (error) {
        console.error(error);
        res.render('query', {
            title: 'Query Invoice',
            error: 'An error occurred while querying the invoice.'
        });
    }
});

/* GET privacy page. */
router.get('/privacy', function (req, res, next) {
    res.render('privacy', {title: 'Privacy'});
});

module.exports = router;
