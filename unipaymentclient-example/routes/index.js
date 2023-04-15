var express = require('express');
var router = express.Router();
const configuration = require('./configuration.json');
const assert = require("assert");

const UniPaymentClient = require('../../unipaymentclient/src/unipayment_client').uni_payment_client;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home Page',
        clientId: configuration.clientId,
        apiHost: configuration.apiHost,
        clientSecret: configuration.clientSecret
    });
});

/* GET create invoice page. */
router.get('/create-invoice', function (req, res, next) {
    res.render('index', {
        title: 'Create Invoice',
        clientId: configuration.clientId,
        apiHost: configuration.apiHost,
        clientSecret: configuration.clientSecret
    });
});

/* GET create invoice page. */
router.get('/query-invoice', function (req, res, next) {
    res.render('query', {
        title: 'Query Invoice',
        clientId: configuration.clientId,
        apiHost: configuration.apiHost,
        clientSecret: configuration.clientSecret
    });
});

/* POST create invoice. */
router.post('/create-invoice', function (req, res, next) {

    const appHost = req.body.apiHost;
    const clientId = req.body.clientId;
    const clientSecret = req.body.clientSecret;

    const parameters = {
        "title": req.body.title,
        "description": req.body.description,
        "lang": req.body.lang,
        "price_amount": req.body.priceAmount,
        "price_currency": req.body.priceCurrency,
        "pay_currency": req.body.payCurrency,
        "notify_url": req.body.notifyUrl,
        "redirect_url": req.body.redirectUrl,
        "order_id": req.body.orderId,
        "confirm_speed": req.body.confirmSpeed,
        "ext_args": req.body.extArgs
    }

    configuration.appHost = appHost;
    configuration.clientId = clientId;
    configuration.clientSecret = clientSecret;
    const uniPaymentClient = new UniPaymentClient(configuration);

    uniPaymentClient.createInvoice(parameters).then(response => {
        if (response.data.code === 'OK') {
            res.redirect(response.data.data.invoice_url);
        } else {
            res.render('index', {
                title: 'Home Page',
                error: response.data.Msg,
                clientId: configuration.clientId,
                apiHost: configuration.apiHost,
                clientSecret: configuration.clientSecret
            });
        }
    }).catch(error => {
        console.log(error);
        res.render('index', {
            title: 'Home Page',
            error: error,
            clientId: configuration.clientId,
            apiHost: configuration.apiHost,
            clientSecret: configuration.clientSecret
        });
    })
});

/* POST query invoice. */
router.post('/query-invoice', function (req, res, next) {

    const appHost = req.body.apiHost;
    const clientId = req.body.clientId;
    const clientSecret = req.body.clientSecret;

    const parameters = {
        'order_id': req.body.orderId,
        'invoice_id': req.body.invoiceId,
        'status': req.body.status,
        'start': req.body.start,
        'end': req.body.end,
        'isAsc': req.body.is_asc
    };

    configuration.appHost = appHost;
    configuration.clientId = clientId;
    configuration.clientSecret = clientSecret;
    const uniPaymentClient = new UniPaymentClient(configuration);

    uniPaymentClient.getInvoices(parameters).then(response => {
        res.render('query', {
            title: 'Query Invoice',
            queryResult: response.data.data.models,
            totalCount: response.data.data.total,
            clientId: configuration.clientId,
            apiHost: configuration.apiHost,
            clientSecret: configuration.clientSecret
        });
    }).catch(error => {
        console.log(error);
        res.render('query', {
            title: 'Query Invoice',
            error: error,
            clientId: configuration.clientId,
            apiHost: configuration.apiHost,
            clientSecret: configuration.clientSecret
        });
    })
});


/* GET privacy page. */
router.get('/privacy', function (req, res, next) {
    res.render('privacy', {title: 'Privacy'});
});

module.exports = router;
