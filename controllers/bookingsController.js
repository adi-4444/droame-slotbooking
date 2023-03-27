const Booking = require('../models/Booking');

// Create a new booking for a customer
exports.createBookingByCustomerId = async (req, res) => {
   const booking = new Booking({
      customer_id: req.params.customerId,
      location_id: req.body.location_id,
      drone_shot_id: req.body.drone_shot_id,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      created_time: Date.now(),
   });
   try {
      const newBooking = await booking.save();
      res.status(201).json({ message: 'Booking created successfully', newBooking });
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
   }
};

// Get all bokkings by customer
exports.getAllBookingsByCustomerId = async (req, res) => {
   try {
      const customerId = req.params.customerId;
      const bookings = await Booking.find({ customer_id: customerId });
      res.json(bookings);
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
   }
};

// Get a single booking of a customer by ID
exports.getBookingByCustomerIdAndId = async (req, res) => {
   try {
      const booking = await Booking.findOne({ _id: req.params.id, customer_id: req.params.customerId });
      if (!booking) {
         return res.status(404).json({ message: 'Booking not found' });
      }
      res.status(200).json(booking);
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
   }
};


// Update a booking of a customer by ID
exports.updateCustomerBookingById = async (req, res) => {
   try {
      const booking = await Booking.findOneAndUpdate(
         { _id: req.params.id, customer_id: req.params.customerId },
         {
            $set: {
               location_id: req.body.location_id,
               drone_shot_id: req.body.drone_shot_id,
               start_time: req.body.start_time,
               end_time: req.body.end_time,
            }
         },
         { new: true }
      );
      if (!booking) {
         return res.status(404).json({ message: 'Booking not found' });
      }
      // Check if the customer ID has been changed
      if (booking.customer_id !== req.params.customerId) {
         return res.status(400).json({ message: 'Customer ID cannot be changed' });
      }
      res.json({ message: 'Booking updated successfully', booking });
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
   }
};


// Delete a booking of a customer by ID
exports.deleteCustomerBookingById = async (req, res) => {
   try {
      const booking = await Booking.findOneAndDelete(
         { _id: req.params.id, customer_id: req.params.customerId }
      );
      if (!booking) {
         return res.status(404).json({ message: 'Booking not found' });
      }
      res.json({ message: 'Booking deleted' });
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
   }
};


// Get all bookings
exports.getAllBookings = async (req, res) => {
   try {
      const bookings = await Booking.find();
      res.json(bookings);
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
   }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
   try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
         return res.status(404).json({ message: 'Booking not found' });
      }
      res.status(200).json(booking);
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
   }
};

// Update an existing booking by ID
exports.updateBookingById = async (req, res) => {
   try {
      const updatedBooking = await Booking.findOne({ _id: req.params.id });
      if (!updatedBooking) {
         return res.status(404).json({ message: 'Booking not found' });
      }
      // Check if the customer ID is being updated
      if (req.body.customerId && req.body.customerId !== updatedBooking.customer_id.toString()) {
         return res.status(400).json({ message: 'Customer ID cannot be changed' });
      }
      // Update the booking
      updatedBooking.location_id = req.body.location_id;
      updatedBooking.drone_shot_id = req.body.drone_shot_id;
      updatedBooking.start_time = req.body.start_time;
      updatedBooking.end_time = req.body.end_time;
      const savedBooking = await updatedBooking.save();
      res.json({ message: 'Booking updated successfully', savedBooking });
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
   }
};



// Delete an existing booking by ID
exports.deleteBookingById = async (req, res) => {
   try {
      const bookingId = req.params.id;
      const booking = await Booking.findByIdAndDelete(bookingId);
      if (!booking) {
         return res.status(404).json({ message: 'Booking not found' });
      }
      res.json({ message: 'Booking deleted' });
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
   }
};
