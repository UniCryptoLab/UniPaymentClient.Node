const assert = require('assert');

const configuration = require('./configuration.json');
const PaymentAPI = require('../src/PaymentAPI');
const {v4: uuidv4} = require("uuid");
const paymentAPI = new PaymentAPI(configuration);

it('Create Payment', (done) => {
    const createPaymentRequest = getPaymentRequest();
    paymentAPI.createPayment(createPaymentRequest).then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Get Payment By Id', (done) => {
    const createPaymentRequest = getPaymentRequest();
    paymentAPI.createPayment(createPaymentRequest).then(response => {
        const paymentId = response.data.data.id;
        paymentAPI.getPaymentById(paymentId).then(response => {
            printResponse(response);
            assert.equal(response.data.code === 'OK', true);
            done();
        }).catch(error => {
            done();
            console.log(error);
        })
    })
});

it('Confirm Payment', (done) => {
    const createPaymentRequest = getPaymentRequest();
    paymentAPI.createPayment(createPaymentRequest).then(response => {
        const paymentId = response.data.data.id;
        paymentAPI.confirmPayment(paymentId).then(response => {
            printResponse(response);
            assert.equal(response.data.code === 'OK', true);
            done();
        }).catch(error => {
            done();
            console.log(error);
        })
    })
});

it('Cancel Payment', (done) => {
    const createPaymentRequest = getPaymentRequest();
    paymentAPI.createPayment(createPaymentRequest).then(response => {
        const paymentId = response.data.data.id;
        paymentAPI.cancelPayment(paymentId).then(response => {
            printResponse(response);
            assert.equal(response.data.code === 'OK', true);
            done();
        }).catch(error => {
            done();
            console.log(error);
        })
    })
});

it('Query Payments', (done) => {
    paymentAPI.queryPayments().then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Get Payment Fee', (done) => {
    paymentAPI.getPaymentFee().then(response => {
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

function getPaymentRequest() {
    return {
        'from_account_id': 'd7c5db2e-8572-4a2f-9300-84dc4b3fd052',
        'asset_type': "USDT",
        'amount': 10.0,
        'payment_method_id': "5c0bce95-7d10-47f3-8e11-250ab900da07",
        'to_account_id': "f0b4083b-8b43-4267-a321-f96bdba8c9e4",
        'reason': "InternalTransfer",
        'note': "Internal Transfer",
        'unique_id': uuidv4()
    }
}