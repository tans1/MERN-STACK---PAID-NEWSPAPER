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
  'client_id': '',
  'client_secret': ''
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
    mongoUrl:'' ,
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
