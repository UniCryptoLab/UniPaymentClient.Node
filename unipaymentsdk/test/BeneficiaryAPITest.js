const assert = require('assert');

const configuration = require('./configuration.json');
const BeneficiaryAPI = require('../src/BeneficiaryAPI');
const beneficiaryAPI = new BeneficiaryAPI(configuration);
const {v4: uuidv4} = require('uuid');
const EMAIL = 'beneficiary-nodejs-1@gmail.com';

it('Create Beneficiary', (done) => {
    const beneficiary = createBeneficiary(EMAIL)
    beneficiaryAPI.createBeneficiary(beneficiary).then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Get Beneficiary By Id', (done) => {
    beneficiaryAPI.queryBeneficiaries().then(response => {
        const beneficiaryId = findBeneficiary(EMAIL, response.data.data.models)
        beneficiaryAPI.getPaymentMethodList(beneficiaryId).then(response => {
            const paymentMethods = response.data.data;
            for (let id in paymentMethods) {
                beneficiaryAPI.getBeneficiaryById(beneficiaryId, id).then(response => {
                    printResponse(response);
                    assert.equal(response.data.code === 'OK', true);
                    done();
                }).catch(error => {
                    done();
                    console.log(error);
                })
            }
        })
    })
});


it('Query Beneficiaries', (done) => {
    beneficiaryAPI.queryBeneficiaries().then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Update Beneficiary', (done) => {
    beneficiaryAPI.queryBeneficiaries().then(response => {
        const beneficiaryId = findBeneficiary(EMAIL, response.data.data.models)
        const updateBeneficiary = createBeneficiary();
        updateBeneficiary['id'] = beneficiaryId;
        updateBeneficiary['address'] = '123 Street';
        updateBeneficiary['city'] = 'NYC';
        updateBeneficiary['state'] = 'NY';
        updateBeneficiary['zip_code'] = '12345';
        beneficiaryAPI.updateBeneficiary(beneficiaryId, updateBeneficiary).then(response => {
            printResponse(response);
            assert.equal(response.data.code === 'OK', true);
            done();
        }).catch(error => {
            done();
            console.log(error);
        })
    })
});


it('Create Payment Methods', (done) => {
    beneficiaryAPI.queryBeneficiaries().then(response => {
        const beneficiaryId = findBeneficiary(EMAIL, response.data.data.models)

        //Create Crypto Payment Method
        beneficiaryAPI.createPaymentMethod(beneficiaryId, createCryptoPaymentMethod()).then(response => {
            printResponse(response);
            assert.equal(response.data.code === 'OK', true);
            done();
        }).catch(error => {
            done();
            console.log(error);
        })

        //Create Internal Payment Method
        beneficiaryAPI.createPaymentMethod(beneficiaryId, createInternalPaymentMethod()).then(response => {
            printResponse(response);
            assert.equal(response.data.code === 'OK', true);
            done();
        }).catch(error => {
            done();
            console.log(error);
        })

        //Create Bank Payment Method
        beneficiaryAPI.createPaymentMethod(beneficiaryId, createBankPaymentMethod()).then(response => {
            printResponse(response);
            assert.equal(response.data.code === 'OK', true);
            done();
        }).catch(error => {
            done();
            console.log(error);
        })
    })
});

it('Get Payment Method List', (done) => {
    beneficiaryAPI.queryBeneficiaries().then(response => {
        const beneficiaryId = findBeneficiary(EMAIL, response.data.data.models)
        beneficiaryAPI.getPaymentMethodList(beneficiaryId).then(response => {
            printResponse(response);
            assert.equal(response.data.code === 'OK', true);
            done();
        }).catch(error => {
            done();
            console.log(error);
        })
    })
});

it('Get Payment Method By Id', (done) => {
    beneficiaryAPI.queryBeneficiaries().then(response => {
        const beneficiaryId = findBeneficiary(EMAIL, response.data.data.models)
        beneficiaryAPI.getPaymentMethodList(beneficiaryId).then(response => {
            const paymentMethods = response.data.data;
            for (let id in paymentMethods) {
                beneficiaryAPI.getPaymentMethodById(beneficiaryId, id).then(response => {
                    printResponse(response);
                    assert.equal(response.data.code === 'OK', true);
                    done();
                }).catch(error => {
                    done();
                    console.log(error);
                })
            }
        })
    })
});

it('Update Payment Method By Id', (done) => {
    beneficiaryAPI.queryBeneficiaries().then(response => {
        const beneficiaryId = findBeneficiary(EMAIL, response.data.data.models)
        beneficiaryAPI.getPaymentMethodList(beneficiaryId).then(response => {
            const paymentMethodId = findPaymentMethod('CRYPTO', response.data.data);
            const updatedPaymentMethod = createCryptoPaymentMethod();
            beneficiaryAPI.updatePaymentMethod(beneficiaryId, paymentMethodId, updatedPaymentMethod).then(response => {
                printResponse(response);
                assert.equal(response.data.code === 'OK', true);
                done();
            }).catch(error => {
                done();
                console.log(error);
            })
        })
    })
});

it('Delete Payment Method By Id', (done) => {
    beneficiaryAPI.queryBeneficiaries().then(response => {
        const beneficiaryId = findBeneficiary(EMAIL, response.data.data.models)
        beneficiaryAPI.getPaymentMethodList(beneficiaryId).then(response => {
            const paymentMethods = response.data.data;
            for (let id in paymentMethods) {
                beneficiaryAPI.deletePaymentMethod(beneficiaryId, id).then(response => {
                    printResponse(response);
                    assert.equal(response.data.code === 'OK', true);
                    done();
                }).catch(error => {
                    done();
                    console.log(error);
                })
            }
        })
    })
});

it('Delete Beneficiary By Id', (done) => {
    beneficiaryAPI.queryBeneficiaries().then(response => {
        const beneficiaryId = findBeneficiary(EMAIL, response.data.data.models)
        beneficiaryAPI.deleteBeneficiaryById(beneficiaryId).then(response => {
            printResponse(response);
            assert.equal(response.data.code === 'OK', true);
            done();
        }).catch(error => {
            done();
            console.log(error);
        })
    })
});

function createBeneficiary(email) {
    return {
        'name': 'Beneficiary 1',
        'email': email,
        'type': 'INDIVIDUAL',
        'relationship': 'CUSTOMER',
    }
}

function printResponse(response) {
    console.log('Response Status: ' + response.data.code);
    console.log('Response: ' + JSON.stringify(response.data));
    console.log('\n');
}

function findBeneficiary(email, beneficiaries) {
    // Find the first item with asset_type 'USD'
    const beneficiary = beneficiaries.find(item => item.email === email);
    // Get the id of the found item
    return beneficiary ? beneficiary.id : null;
}

function createCryptoPaymentMethod() {
    return {
        'title': 'crypto-' + uuidv4(),
        'transfer_method': 'CRYPTO',
        'detail': {
            'network': 'NETWORK_BTC',
            'address': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
            'asset_type': 'BTC'
        }
    }
}

function createInternalPaymentMethod() {
    return {
        'title': 'internal-' + uuidv4(),
        'transfer_method': 'INTERNAL',
        'detail': {
            'uid': '1000000',
            'asset_type': 'USDT'
        }
    }
}

function createBankPaymentMethod() {
    return {
        'title': 'bank-' + uuidv4(),
        'transfer_method': 'BANK',
        'detail': {
            'network': 'BANK_SWIFT',
            'account_number': '1234567890',
            'bic': 'CITIUS33XXX',
            'bank_identifier': 'CITIUS33XXX',
            'bank_name': 'CITIBANK',
            'bank_address': '388 GREENWICH STREET NYC NY',
            'bank_country': 'US',
            'asset_type': 'USD'
        }
    }
}

function findPaymentMethod(transfer_method, paymentMethods) {
    // Find the first item with asset_type 'USD'
    const paymentMethod = paymentMethods.find(item => item.transfer_method === transfer_method);
    // Get the id of the found item
    return paymentMethod ? paymentMethod.id : null;
}