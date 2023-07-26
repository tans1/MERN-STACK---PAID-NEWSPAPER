const passport = require('passport');
const User = require('../model/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken')
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
require('express-session');


// JWT-AUTH
const cookieExtract = (req) => {
  let token = null;
  if (req && req.signedCookies) {
    token = req.signedCookies.token;
  }
  return token;
}

const  opts = {}
opts.secretOrKey = 'token secret';
opts.jwtFromRequest = cookieExtract;                
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
  try {
    const user = await User.findOne({_id : jwt_payload.id}).exec()

    if(user) {
      return done(null,user)
    }
    else {
      return done(null, false)
    }
  }
  catch(err){
    return done(err, false)
  }
}));




// GOOGLE-AUTH
passport.use(new GoogleStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: "http://localhost:5000/user/google/callback",
    scope: "profile"
    
  },
  
  async function(accessToken, refreshToken, profile, cb) {
    try {
        const user = await User.findOne({googleId: profile.id}).exec()
        if (!user){
            const newUser = new User({
                username: profile.displayName,
                googleId: profile.id
            })
            await newUser.save()

            const payload = {
                id: newUser._id
            } 

            const token = await jwt.sign(payload,"token secret",{expiresIn: "1d"})
            return cb(null,newUser,token)
        }


        const payload = {
            id: user._id
        } 
        const token = await jwt.sign(payload,"token secret",{expiresIn: "1d"})
        return cb(null, user,token)
    } catch(err){
        return cb(err)
    }
  }
));


// Persists user data inside the session
passport.serializeUser(function(user, cb) {
  cb(null, user.username);
});

// fetches session details using session id 
passport.deserializeUser(async function(username, cb) {
  const user =await User.findOne({username: username}).exec();

  if (user) {
    cb(null, user);
  } 
  else {cb(null, false)}
});