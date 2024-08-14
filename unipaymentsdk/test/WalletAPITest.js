const assert = require('assert');

const configuration = require('./configuration.json');
const WalletAPI = require('../src/WalletAPI');
const walletAPI = new WalletAPI(configuration);

it('Get Wallet Accounts', (done) => {
    walletAPI.getAccounts().then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Get Wallet Balances', (done) => {
    walletAPI.getBalances().then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Query Transactions', (done) => {
    walletAPI.getAccounts().then(response => {
        printResponse(response)
        const accountId = findAccount('USD', response.data.data);
        walletAPI.queryTransactions(accountId).then(response => {
            printResponse(response);
            assert.equal(response.data.code === 'OK', true);
            done();
        }).catch(error => {
            done();
            console.log(error);
        })
    });
});

it('Get Deposit Bank Account', (done) => {
    walletAPI.getAccounts().then(response => {
        printResponse(response)
        const accountId = findAccount('USD', response.data.data);
        walletAPI.getDepositBankAccount(accountId).then(response => {
            printResponse(response);
            assert.equal(response.data.code === 'OK', true);
            done();
        }).catch(error => {
            done();
            console.log(error);
        })
    });
});

it('Get Deposit Bank Account', (done) => {
    walletAPI.getAccounts().then(response => {
        printResponse(response)
        const accountId = findAccount('BTC', response.data.data);
        walletAPI.getDepositAddress(accountId).then(response => {
            printResponse(response);
            assert.equal(response.data.code === 'OK', true);
            done();
        }).catch(error => {
            done();
            console.log(error);
        })
    });
});


function printResponse(response) {
    console.log('Response Status: ' + response.data.code);
    console.log('Response: ' + JSON.stringify(response.data));
    console.log('\n');
}

function findAccount(assetType, accounts) {
    // Find the first item with asset_type "USD"
    const account = accounts.find(item => item.asset_type === 'USD');
    // Get the id of the found item
    return account ? account.id : null;
}