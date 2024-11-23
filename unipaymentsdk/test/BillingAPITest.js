const assert = require('assert');

const configuration = require('./configuration.json');
const BillingAPI = require('../src/BillingAPI');
const {v4: uuidv4} = require('uuid');
const billingAPI = new BillingAPI(configuration);

const createInvoiceRequest = {
    'app_id': configuration.appId,
    'order_id': uuidv4(),
    'price_amount': 1.00,
    'price_currency': 'USD',
    'lang': 'en',
    'ext_args': 'Merchant Pass Through Data',
};

it('Create Invoice', (done) => {
    billingAPI.createInvoice(createInvoiceRequest).then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Create Invoice With Host To Host Mode', (done) => {
    const createInvoiceRequest = {
        'app_id': configuration.appId,
        'order_id': uuidv4(),
        'price_amount': 20.00,
        'price_currency': 'USD',
        'lang': 'en',
        'ext_args': 'Merchant Pass Through Data',
        'host_to_host_mode': true,
        'payment_method_type': 'CRYPTO',
        'pay_currency': 'BNB',
        'network': 'NETWORK_BSC'
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

it('Query Invoice Refunds', (done) => {
    billingAPI.queryInvoiceRefunds().then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Create Invoice Refund', (done) => {
    billingAPI.createInvoice(createInvoiceRequest).then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);

        const createInvoiceRefundRequest = {
            'price_currency': 'USD',
            'fee_payer': 'MERCHANT',
            'refund_price_amount': 1,
            'reason': "Refund"
        }
        console.log("Create Invoice Refund");
        billingAPI.createInvoiceRefund(response.data.data.invoice_id, createInvoiceRefundRequest).then(response => {
            printResponse(response);
            assert.equal(response.data.code === 'OK', true);
            console.log("Create Invoice Refund Success");
            done();
        }).catch(error => {
            console.log("Create Invoice Refund Failed");
            console.log(error);
            done();
        })
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Cancel Invoice Refund', (done) => {
    billingAPI.createInvoice(createInvoiceRequest).then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        const createInvoiceRefundRequest = {
            'price_currency': 'USD',
            'fee_payer': 'MERCHANT',
            'refund_price_amount': 1,
            'reason': "Refund"
        }
        console.log("Create Invoice Refund");
        billingAPI.createInvoiceRefund(response.data.data.invoice_id, createInvoiceRefundRequest).then(response => {
            printResponse(response);
            assert.equal(response.data.code === 'OK', true);
            console.log("Create Invoice Refund Success");
            console.log("Cancel Invoice Refund");

            const cancelInvoiceRefundRequest = {
                'note': 'Cancel Refund',
            }

            billingAPI.createInvoiceRefund(response.data.data.refund_id, cancelInvoiceRefundRequest).then(response => {
                printResponse(response);
                assert.equal(response.data.code === 'OK', true);
                console.log("Cancel Invoice Refund Success");
                done();
            }).catch(error => {
                console.log("Cancel Invoice Refund Failed");
                console.log(error);
                done();
            })
        }).catch(error => {
            console.log("Create Invoice Refund Failed");
            console.log(error);
            done();
        })
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