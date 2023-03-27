const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
   customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
   },
   location_id: {
      type: String,
      required: true,
   },
   drone_shot_id: {
      type: String,
      required: true,
   },
   created_time: {
      type: Date,
      default: Date.now,
   },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
