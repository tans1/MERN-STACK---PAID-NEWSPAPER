const express = require('express');
const route = express.Router();
const userContoller = require('../controller/user');
const passport = require('passport');


route.post('/signup',userContoller.SignUp)
route.post('/loginlocal',userContoller.localLogIn)

route.get('/ispremium',passport.authenticate('jwt',{session: false}),userContoller.isPremium)
route.get('/isloggedIn',passport.authenticate('jwt',{session: false}),userContoller.isLoggedIn)


// google-auth
route.get('/googleauth',passport.authenticate('google', ['profile']))
route.get('/google/callback',
    passport.authenticate('google', {failureRedirect: "http://localhost:3000/login"}),async (req,res) => {
        const token = req.authInfo
        await res.cookie('token', token, { maxAge: 86400000, httpOnly: true , signed : true});
        return res.redirect("http://localhost:3000/payment-option")
    })

module.exports = route 