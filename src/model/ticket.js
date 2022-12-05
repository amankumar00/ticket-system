const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticketId:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    details:{
        type: String
    },
    status:{
        type:String,
        enum: ["Todo","In-Progress","Done"],
        default: "Todo"
    },
   
});

module.exports = mongoose.model('Ticket',ticketSchema);