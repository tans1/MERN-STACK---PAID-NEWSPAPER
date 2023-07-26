const express = require('express');
const paypalController = require('../controller/payments/paypal');
const route = express.Router();
const chapaContoller = require('../controller/payments/chapa')
const passport = require('passport');

route.post('/paypal/pay',paypalController.makePayment)
route.get('/paypal/success/:typee',paypalController.successPayment)
route.get('/paypal/cancel',paypalController.cancelPayment)


route.post('/chapa/pay',chapaContoller.makePayment)
route.get('/chapa/callback', chapaContoller.chapaCallback)



module.exports = route; 