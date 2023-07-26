const mongoose = require('mongoose')

const User = new mongoose.Schema({
    username : String,
    password:String,
    googleId : String,
    premiumExpDate : {
        type: Date,
        default : () => {
            const date = new Date();
            date.setFullYear(date.getFullYear() - 100);
            return date;
          },
    },
})

const UserModel = mongoose.model('User', User)
module.exports = UserModel