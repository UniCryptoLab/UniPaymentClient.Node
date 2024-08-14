const assert = require('assert');

const configuration = require('./configuration.json');
const BillingAPI = require('../src/BillingAPI');
const {v4: uuidv4} = require('uuid');
const billingAPI = new BillingAPI(configuration);

it('Create Invoice', (done) => {
    const createInvoiceRequest = {
        'app_id': configuration.appId,
        'order_id': uuidv4(),
        'price_amount': 1.00,
        'price_currency': 'USD',
        'lang': 'en',
        'ext_args': 'Merchant Pass Through Data'
    };
    billingAPI.createInvoice(createInvoiceRequest).then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Query Invoices', (done) => {
    billingAPI.queryInvoices().then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Get Invoice By Id', (done) => {
    billingAPI.getInvoiceById('SrAARgNrPgvveiBQtNc4gk').then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
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