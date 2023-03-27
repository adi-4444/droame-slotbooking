const Customer = require('../models/Customer');


// Create a new customer
exports.createCustomer = async (req, res) => {
   const customer = new Customer({
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
   });

   try {
      const newCustomer = await customer.save();
      res.status(201).json(newCustomer);
   } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Invalid request body' });
   }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
   try {
      const customers = await Customer.find();
      res.json(customers);
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
   }
};

// Get a single customer by ID
exports.getCustomerById = async (req, res) => {
   try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
         return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(200).json(customer);
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
   }
};

// Update an existing customer by ID
exports.updateCustomerById = async (req, res) => {
   try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
         return res.status(404).json({ message: 'Customer not found' });
      }
      if (req.body.name != null) {
         customer.name = req.body.name;
      }
      if (req.body.email != null) {
         customer.email = req.body.email;
      }
      if (req.body.phone_number != null) {
         customer.phone_number = req.body.phone_number;
      }
      const updatedCustomer = await customer.save();
      res.json({ message: "Customer Updated Successfully", updatedCustomer });
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
   }
};

// Delete an existing customer by ID
exports.deleteCustomerById = async (req, res) => {
   try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
         return res.status(404).json({ message: 'Customer not found' });
      }
      await customer.remove();
      res.json({ message: 'Customer deleted' });
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
   }
};
