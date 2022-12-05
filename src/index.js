const { application } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
//routes
const ticketRoutes = require('./routes/ticket')
const userRoutes = require('./routes/user')
const env = require('dotenv')
env.config();
app.use(bodyParser());

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ynbz1u8.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`).then(()=>{
    console.log("database connected")
});

app.listen(2000, ()=>{
    console.log('server started on port 2000');
});
app.use('/api', userRoutes);
app.use('/api', ticketRoutes)
app.get('/', (req,res)=>{
    res.status(200).json({"message" : "Test successful"});
})