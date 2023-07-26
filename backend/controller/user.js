const { hashSync, compareSync } = require('bcrypt');
const User = require('../model/user')
const jwt = require('jsonwebtoken')


class UserContoller {

     async SignUp (req,res){
        const {username, password} = req.body;
        try {
            if (username && password){
                const user = await User.findOne({username : username}).exec();
                if (user){
                    return res.status(401).json({
                        error: "user already exists"
                    })
                }
    
                const newuser = new User({
                    username: username,
                    password: hashSync(password,10)
                })

                await newuser.save();
                return res.status(200).json({
                    message : "user created"
                })
            }
            else {
                return res.status(401).json({
                    error: "both username and password is required"
                })
            }
        }
        catch(error){
            return res.status(401).json({
                error: error.message
            })
        }
    
    }
    
    async localLogIn (req,res) {
        const {username, password} = req.body;
    
        if (username && password){
            const user = await User.findOne({username: username}).exec()
            if (!user){
                return res.status(401).json({
                    error: "user not found"
                })
            }
    
            if (!compareSync(password, user.password)){
                return res.status(401).json({
                    error: "incorrect password"
                })
            }
    
    
            const payload = {
                id: user._id
            } 

            const token = await jwt.sign(payload,"token secret",{expiresIn: "1d"})
            await res.cookie('token', token, { maxAge: 86400000, httpOnly: true , signed : true});

            return res.status(200).json({message:"login successful!"})
    
        }
        else {
            return res.status(401).json({
                error: "both username and password is required"
            })
        }
    }
    
    

    isPremium(req,res){
        try{
            const currentDate = new Date();
            return res.status(200).json({premium : req.user.premiumExpDate >= currentDate})
        }
        catch(error){
            return res.status(404).json({error: error})
        }
    }

    isLoggedIn(req,res){
        try{
            return res.status(200).json({isLoggedIn : true})
        }
        catch(error){
            return res.status(404).json({error: error})
        }
    }

}


const userContoller = new UserContoller();
module.exports = userContoller