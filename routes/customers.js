const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customersController');


// Create a new customer
router.post('/', customersController.createCustomer);

// Get all customers
router.get('/', customersController.getAllCustomers);

// Get a single customer by ID
router.get('/:id', customersController.getCustomerById);

// Update an existing customer by ID
router.put('/:id', customersController.updateCustomerById);

// Delete an existing customer by ID
router.delete('/:id', customersController.deleteCustomerById);

module.exports = router;
