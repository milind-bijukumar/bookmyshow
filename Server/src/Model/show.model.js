const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    //Note: show : movie => N:1 => one movie can have N shows but 1 show can have only 1 movie
    //Note: show : theatre => N:1 => one theatre can have N shows but 1 show can have only 1 theatre
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'movies',
        required:true
    },
    theatre:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'theatre',
        required:true
    },
    showDate:{
        type:String,
        required:true
    },
    showTime:{
        type:String,
        required:true
    },
    // showTime:{
    //     type:Date,
    //     required:true
    // },
    totalSeats:{
        type:Number,
        required:true
    },
    bookedSeats:{
        type:Array,
        default:[]
    },
    ticketPrice:{
        type:Number,
        default:260,
    }
});

const ShowModel = mongoose.model('shows', showSchema);
module.exports = ShowModel;