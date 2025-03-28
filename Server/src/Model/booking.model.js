const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    show:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'show',
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'bookmyshow',
        required:true,
    },
    seats:{
        type:Array,
        required:true,
    },
    transactionId:{
        type:String,
        required:true
    }
});


const BookingModel = mongoose.model("bookings",bookingSchema);
module.exports = BookingModel;