const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: {
    type:String,
    required:true
  },
  last_name: {
    type: String,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
    match: /^[a-z]{2,}[0-9]{2,}[a-z]{3,}@cmrit\.ac\.in$/
  },
  User_type: {
    type: String,
    enum: ['student', 'faculty'],
    required: true,
  },

})

export const users =mongoose.model('users', UserSchema);


