const assert = require('assert');

const configuration = require('./configuration.json');
const CommonAPI = require('../src/CommonAPI');
const commonAPI = new CommonAPI(configuration);

it('Get Ping', (done) => {
    commonAPI.ping().then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        assert.equal(response.data.msg === 'pong', true);
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Post Ping', (done) => {
    commonAPI.ping(true).then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        assert.equal(response.data.msg === 'pong', true);
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Query IPs', (done) => {
    commonAPI.queryIps().then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        assert.equal(response.data.data !== null, true)
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Get Currencies', (done) => {
    commonAPI.getCurrencies().then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        assert.equal(response.data.data !== null, true)
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Get Exchange Rates By Currency Pair', (done) => {
    commonAPI.getExchangeRateByCurrencyPair('USD', 'BTC').then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        assert.equal(response.data.data !== null, true)
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Get Exchange Rates By Fiat Currency', (done) => {
    commonAPI.getExchangeRatesByFiatCurrency('USD').then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        assert.equal(response.data.data !== null, true)
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Check IPN', (done) => {
    const body = {
        "ipn_type": "invoice",
        "event": "invoice_created",
        "app_id": "cee1b9e2-d90c-4b63-9824-d621edb38012",
        "invoice_id": "12wQquUmeCPUx3qmp3aHnd",
        "order_id": "ORDER_123456",
        "price_amount": 2.0,
        "price_currency": "USD",
        "network": null,
        "address": null,
        "pay_currency": null,
        "pay_amount": 0.0,
        "exchange_rate": 0.0,
        "paid_amount": 0.0,
        "confirmed_amount": 0.0,
        "refunded_price_amount": 0.0,
        "create_time": "2022-09-14T04:57:54.5599307Z",
        "expiration_time": "2022-09-14T05:02:54.559933Z",
        "status": "New",
        "error_status": "None",
        "ext_args": "Merchant Pass Through Data",
        "transactions": null,
        "notify_id": "fd58cedd-67c6-4053-ae65-2f6fb09a7d2c",
        "notify_time": "0001-01-01T00:00:00"
    };
    commonAPI.checkIpn(body).then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        assert.equal(response.data.msg === 'IPN is verified.', true)
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

function printResponse(response) {
    console.log('Response Status: ' + response.data.code);
    console.log('Response: ' + JSON.stringify(response.data));
    console.log('\n');
}