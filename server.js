const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv")
const connectDB = require('./config/database');
const customersRouter = require('./routes/customers');
const bookingsRouter = require('./routes/bookings');
const path = require('path')
require('./config/database');

const app = express();

app.use(bodyParser.json());
dotenv.config()
connectDB()
app.use(bodyParser.urlencoded({ extended: true }));

//-------------------Deployment-----------------
// __dirname = path.resolve()
// if (process.env.NODE_ENV === "production") {
//    app.use(express.static(path.join(__dirname, '/frontend/dist')))
//    app.get('*', (req, res) => {
//       res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
//    })
// } else {
//    app.get("/", (req, res) => {
//       res.send("Hello")
//    })
// }
//-------------------Deployment-----------------
app.use('/api/v1/customers', customersRouter);
app.use('/api/v1/bookings', bookingsRouter);

const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
   console.log(`server is started on port ${PORT}`)
})