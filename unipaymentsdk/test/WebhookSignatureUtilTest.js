const assert = require('assert');
const WebhookSignatureUtil = require("../src/WebhookSignatureUtil");


it('Verify Webhook Signature', () => {
    //Use raw json payload (no formatting or pretty print)
    const payload = '{"ipn_type":"invoice","event":"invoice_created","app_id":"2a9bd90b-fe95-4659-83cb-04de662fbbac","payment_method_type":"Unknown","invoice_id":"Gy3TVe9Fbe5idGbez19pMr","order_id":"b49f70e5-a0da-4450-ae86-69b0a81708cc","price_amount":1.0,"price_currency":"USD","network":null,"address":null,"pay_currency":null,"pay_amount":0.0,"exchange_rate":0.0,"paid_amount":0.0,"confirmed_amount":0.0,"refunded_price_amount":0.0,"create_time":"2024-08-16T17:35:51.4194631Z","expiration_time":"2024-08-16T17:55:51.4195145Z","status":"New","error_status":"None","ext_args":"Merchant Pass Through Data","channel":null,"notify_id":"b2fd88c1-3d34-4bd2-9f55-c3e5b3097173","notify_time":"2024-08-16T17:35:51.4443531Z"}';
    const secretKey = 's3cretKey@2024%';
    const signature = 'cWcyVMKMQS8M+zwlUxPuROjF3hLWzAL6TSvWKC8K3FE=';
    const valid = WebhookSignatureUtil.isValid(payload, secretKey, signature);
    assert.equal(valid, true);
});