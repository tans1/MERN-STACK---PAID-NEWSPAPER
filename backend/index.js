const express = require('express')
const app = express()
const dataRouter = require('./routes/data')
const userRoute = require('./routes/user')
const paymentRoute = require('./routes/payment')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const paypal = require('paypal-rest-sdk');

// paypal configuration
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AVtmwNjRnPZcwLSMh5DC0u2oKKnWX8DpMrWDD1XbwjctPRZN63JGtdZB-LfIyehcTJQSz69DVH17PZ3e',
  'client_secret': 'EMXylVYnlrkX6ts7BYDI2k3pw-LsDGC7HKCKWCINvTvnILow3zBliO5TTV1vJEbLsxjWdcLH_SlnhSwO'
});




// database connection
require('./config/database')

// cors
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


app.use(express.json())
app.use(express.urlencoded({extended: true}))

// session for google auth
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ 
    mongoUrl:'mongodb+srv://tofikabdu:kHGpnyqMpJ8yhpcW@nodejsauth.heonew2.mongodb.net/' ,
    collectionName : 'session'
  }),
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24 
  }
}))



// cookie
app.use(cookieParser('cookie secret'));


require('./middleware/passport')
app.use(passport.initialize())
app.use(passport.session())

app.use('/news',dataRouter)
app.use('/user',userRoute)
app.use('/payment',paymentRoute)


app.listen(5000,()=>{console.log("hosted successfully")})