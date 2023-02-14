const express = require('express');
const dotenv = require('dotenv').config(); 
const port = process.env.PORT || 5000;
const connectDB = require('./config/database')

connectDB();
const app = express();


//routers
const UserRouter = require('./routers/user.router');

app.use(express.json());
app.use('/user',UserRouter);



app.listen(port, () => {
    console.log(`Server is Running on port ${port}`)
})