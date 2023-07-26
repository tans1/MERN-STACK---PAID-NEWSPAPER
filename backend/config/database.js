const mongoose = require('mongoose');

try {
    mongoose.connect('',
        {
          useNewUrlParser:true,
          useUnifiedTopology:true
        }
      )
    console.log("db connection is successful")
} catch(error) {
    console.log("db connection unsuccessful")
}

