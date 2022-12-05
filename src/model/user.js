const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    uid:{
        type: String,
        require: true,
        unique: true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    assignedTicket:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Ticket'
    }]
})

module.exports = mongoose.model('User',userSchema);