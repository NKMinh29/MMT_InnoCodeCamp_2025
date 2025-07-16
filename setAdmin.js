require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./backend/models/User');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await User.updateOne({ email: 'minhnk2911@gmail.com' }, { $set: { isAdmin: true } });
    console.log('Set isAdmin for minhnk2911@gmail.com');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });