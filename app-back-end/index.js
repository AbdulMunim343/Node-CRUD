const express = require('express');
const mongoose = require("mongoose");
const mongoDB = "mongodb://mongo:mongo@ac-lqxfsw1-shard-00-00.nwi27cn.mongodb.net:27017,ac-lqxfsw1-shard-00-01.nwi27cn.mongodb.net:27017,ac-lqxfsw1-shard-00-02.nwi27cn.mongodb.net:27017/students?replicaSet=atlas-yjf5oj-shard-0&ssl=true&authSource=admin"
//routers
const UserRouter = require('./routers/user.router');

const app = express();
app.use('/user',UserRouter);

mongoose.connect(mongoDB, (error) => {
    if (error) {
        console.log("MongoDB is not connected");
    } else {
        console.log("MongoDB connected");
    }
})

app.listen(5000, () => {
    console.log("Server is Running")
})