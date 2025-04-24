const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
     UserName: { type: String, required: true },
  UserEmail: { type: String, required: true, unique: true },
  UserPassword: { type: String, required: true }
    
})

module.exports = mongoose.model("User",UserSchema)