const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv")
const connectDB = require('./config/database');
const customersRouter = require('./routes/customers');
const bookingsRouter = require('./routes/bookings');
require('./config/database');

const app = express();

app.use(bodyParser.json());
dotenv.config()
connectDB()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/customers', customersRouter);
app.use('/api/v1/bookings', bookingsRouter);

const PORT = process.env.PORT
app.listen(PORT, () => {
   console.log(`server is started on port ${PORT}`)
})