const request = require('request');
const UserModel = require('../../model/user');

class ChapaPayment {

    generatetx_ref(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomString += characters[randomIndex];
        }
      
        return randomString;
    }




    async makePayment (req,res) {
        const {amount , typee} = req.body

        const options = {
        'method': 'POST',
        'url': 'https://api.chapa.co/v1/transaction/initialize',
        'headers': {
            'Authorization': '',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "amount": amount,
            "currency": "ETB",
            "email": "",
            "first_name": "Tofik",
            "last_name": "Abdu",
            "phone_number": "",
            "tx_ref": this.generatetx_ref(8),
            "callback_url": "http://localhost:5000/chapa/pay",
            "return_url": "http://localhost:3000/details",
            "customization[title]": "Payment for newspaper",
        })

        }; 


        request(options, async function (error, response) {
            if (error) throw new Error(error);


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


            const responseObject = JSON.parse(response.body);
            const redirectionUrl = responseObject.data.checkout_url
            return res.redirect(redirectionUrl)
        });

    }


    chapaCallback (req,res) {
        return res.redirect()
    }

}



const chapaContoller = new ChapaPayment()
module.exports = chapaContoller