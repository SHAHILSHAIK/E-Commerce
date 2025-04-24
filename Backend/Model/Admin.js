const mongoose = require('mongoose')

const AdminSechma = mongoose.Schema({

    AdminName: { type: String, required: true },
    AdminEmail: { type: String, required: true, unique: true },
    AdminPassword: { type: String, required: true },
  
    
})

module.exports = mongoose.model("Admin",AdminSechma)