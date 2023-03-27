const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingsController');


// Create a new booking for a customer
router.post('/customer/:customerId', bookingController.createBookingByCustomerId);

// Get all bookings by customer
router.get('/customer/:customerId', bookingController.getAllBookingsByCustomerId);

// Get a single booking of a customer by ID
router.get('/customer/:customerId/:id', bookingController.getBookingByCustomerIdAndId);

// Update a booking of a customer by ID
router.put('/customer/:customerId/:id', bookingController.updateCustomerBookingById);

// Delete a booking of a customer by ID
router.delete('/customer/:customerId/:id', bookingController.deleteCustomerBookingById);


// Get all bookings
router.get('/', bookingController.getAllBookings);

// Get a single booking by ID
router.get('/:id', bookingController.getBookingById);

// Update an existing booking by ID
router.put('/:id', bookingController.updateBookingById);

// Delete an existing booking by ID
router.delete('/:id', bookingController.deleteBookingById);



module.exports = router;
