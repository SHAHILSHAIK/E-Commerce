const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
  DoorNo: {
    type: String,
    required: true,
  },
  Street: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  District: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  Pincode: {
    type: String,
    required: true,
  },
});

// Correct way to export model
module.exports = mongoose.model('Address', addressSchema);
