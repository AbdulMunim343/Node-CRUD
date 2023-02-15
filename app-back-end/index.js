const express = require('express');
const dotenv = require('dotenv').config(); 
const port = process.env.PORT || 5000;
const connectDB = require('./config/database')

connectDB();
const app = express();
app.use(express.json());

//routers
app.use('/user',require('./routers/user.router'));

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`)
})