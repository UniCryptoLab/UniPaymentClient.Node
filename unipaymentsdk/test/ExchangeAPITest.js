const assert = require('assert');

const configuration = require('./configuration.json');
const ExchangeAPI = require('../src/ExchangeAPI');
const exchangeAPI = new ExchangeAPI(configuration);

it('Get Quote', (done) => {
    exchangeAPI.getQuote('USDT', 'BNB', 10.0).then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Accept Quote', (done) => {
    exchangeAPI.getQuote('USDT', 'BNB', 10.0).then(response => {
        const quoteId = response.data.data.quote_id;
        exchangeAPI.acceptQuote(quoteId).then(response => {
            printResponse(response);
            assert.equal(response.data.code === 'OK', true);
            assert.equal(response.data.data.status === 'PLACED', true);
            done();
        }).catch(error => {
            done();
            console.log(error);
        })
    })
});

it('Query Exchange Orders', (done) => {
    exchangeAPI.queryExchangeOrders().then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Get Exchange Order', (done) => {
    exchangeAPI.queryExchangeOrders({'from_currency': 'USDT', 'to_currency': 'BNB'}).then(response => {
        const orderId = findExchangeOrder(response.data.data.models);
        exchangeAPI.getExchangeOrder(orderId).then(response => {
            printResponse(response);
            assert.equal(response.data.code === 'OK', true);
            done();
        }).catch(error => {
            done();
            console.log(error);
        })
    })
});

function printResponse(response) {
    console.log('Response Status: ' + response.data.code);
    console.log('Response: ' + JSON.stringify(response.data));
    console.log('\n');
}

function findExchangeOrder(exchangeOrders) {
    // Find the first item with asset_type "USD"
    const exchangeOrder = exchangeOrders.find(item => item.status === 'COMPLETED');
    // Get the id of the found item
    return exchangeOrder ? exchangeOrder.id : null;
}