const paypal = require('paypal-rest-sdk');
const UserModel = require('../../model/user');
class PayPalPayment{
    makePayment (req, res) {
        const {amount,typee} = req.body;
        const create_payment_json = {
          "intent": "sale",
          "payer": {
              "payment_method": "paypal"
          },
          "redirect_urls": {
              "return_url": `http://localhost:5000/payment/paypal/success/${typee}`,
              "cancel_url": "http://localhost:5000/payment/paypal/cancel"
          },
          "transactions": [{
              "item_list": {
                  "items": [{
                      "name": `newsPaper ${typee} payment`,
                      "sku": "001",
                      "price": `${amount}`,
                      "currency": "USD",
                      "quantity": 1
                  }]
              },
              "amount": {
                  "currency": "USD",
                  "total":  `${amount}`
              },
              "description": `newsPaper ${typee} payment`
          }]
      };
      
      paypal.payment.create(create_payment_json, async function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0;i < payment.links.length;i++){
              if(payment.links[i].rel === 'approval_url'){
                const redirectionUrl = `${payment.links[i].href}`
                // console.log(redirectionUrl)
                res.header( "Access-Control-Allow-Origin" );
                return await res.redirect(redirectionUrl);
              }
            }
        }
      })

    };



    async successPayment (req,res) {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        
        const {paymentType} = req.params;

        if (req.user){
            const currentUser = await UserModel.findOne({username: req.user.username}).exec()
            const currentDate = new Date();
            const futureDate = new Date();

            if (paymentType === 'monthly premium'){
                futureDate.setMonth(currentDate.getMonth() + 1);
            } else if(paymentType == 'yearly premium'){
                futureDate.setFullYear(currentDate.getFullYear() + 1);
            }
            currentUser.premiumExpDate = futureDate
            await currentUser.save()
        }

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total":  `5`
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                
                return res.redirect("http://localhost:3000/details")
            }
        });

    }


    cancelPayment (req,res) {
        return res.redirect("http://localhost:3000/payment-option")
    }

}


const paypalController = new PayPalPayment()
module.exports = paypalController