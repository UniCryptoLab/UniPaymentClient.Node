const assert = require('assert');

const configuration = require('./configuration.json');
const WebhookAPI = require('../src/WebhookAPI');
const webhookAPI = new WebhookAPI(configuration);

it('Update Notify URL', (done) => {
    const updateNotifyURLRequest = {
        'notify_url': 'https://en7exsmaa68jo.x.pipedream.net'
    }
    webhookAPI.updateNotifyURL(updateNotifyURLRequest).then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        done();
        console.log(error);
    })
});

it('Update Secret Key', (done) => {
    const updateSecretKeyRequest = {
        'secret_key': 's3cretKey@2024%'
    }
    webhookAPI.updateSecretKey(updateSecretKeyRequest).then(response => {
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