'use strict';
const UniPaymentClient = require('../src/unipayment_client').uni_payment_client;

const assert = require('assert');
const mocha = require('mocha');
const it = mocha.it;
const uuid = require('uuid');
const configuration = require('./configuration.json');
const uniPaymentClient = new UniPaymentClient(configuration);

it('Create Invoice', (done) => {
    const parameters = {
        "title": "Test Invoice",
        "description": "Test Desc",
        "lang": "en-US",
        "price_amount": 100.0,
        "price_currency": "USD",
        "pay_currency": "USDT",
        "notify_url": "https://google.com",
        "redirect_url": "https://google.com",
        "order_id": uuid.v4(),
        "confirm_speed": "low"
    }
    uniPaymentClient.createInvoice(parameters).then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
    })
});

it('Get Invoices', (done) => {
    const parameters = {
        'order_id': 'ORDER_123456',
        'invoice_id': 'R2n8UYQBUZ2i36ZjQY6pbe'
    };

    uniPaymentClient.getInvoices(parameters).then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
    })
});

it('Query Invoice By Invoice Id Test', (done) => {
    uniPaymentClient.queryInvoiceById('R2n8UYQBUZ2i36ZjQY6pbe').then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
    })
});

it('Query IPs Test', (done) => {
    uniPaymentClient.queryIps().then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
        done();
    })
});

it('Get Currencies Test', (done) => {
    uniPaymentClient.getCurrencies().then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
        done();
    })
});

it('Get Exchange Rates By Fiat Currency Test', (done) => {
    uniPaymentClient.getExchangeRatesByFiatCurrency('USD').then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
        done();
    })
});

it('Get Exchange Rate By Currency Pair', (done) => {
    uniPaymentClient.getExchangeRateByCurrencyPair('USD', 'BTC').then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
        done();
    })
});

function printResponse(response) {
    console.log('Response: ' + JSON.stringify(response.data));
    console.log('Response Status: ' + response.data.code);
    console.log('\n\n');
}