const express = require('express');
const bodyParser = require('body-parser');
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

app.get("/", (req, res) => {
   res.send("Hello")
})

app.use('/api/v1/customers', customersRouter);
app.use('/api/v1/bookings', bookingsRouter);

const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
   console.log(`server is started on port ${PORT}`)
})