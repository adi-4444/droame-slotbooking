const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
   },
   phone_number: {
      type: String,
      required: true,
   },
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
