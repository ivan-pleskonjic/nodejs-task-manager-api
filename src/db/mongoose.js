const mongoose = require('mongoose') // koristi mongodb modul u pozadini

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true, // enables the creation of indexes
  useUnifiedTopology: true,
  useFindAndModify: false
})
