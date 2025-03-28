const { default: mongoose } = require("mongoose");
const { sendEmail } = require("../Utils/EmailUtility");
const BookingModel = require("../Model/booking.model");
const ShowModel = require("../Model/show.model");
const bookingConfirmationTemplate = require("../Templates/bookingConfirmationTemplate");
const MovieModel = require("../Model/movie.model");
const TheatreModel = require("../Model/theatre.model");
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(stripeSecretKey);

const makePayment = async (req,res)=>{
    const {token,amount} =req.body;

    //create a new stripe customer 
    const customer = await stripe.customers.create({
        email:req.userDetails.email,
        source:token
    });

    //create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
        customer:customer.id,
        amount:amount,
        currency:'usd',
        payment_method_types:['card']
    });
    const transactionId = paymentIntent.id;

    console.log(`Perform Payment for amount ${amount} via stripe`);
    // let transactionId = Date.now().toString(36) + Math.random().toString(36);
    return res.status(200).send({
        success:true,
        message:"Payment Successfull",
        data:transactionId
    })
}

const createBooking = async (req,res)=>{
    // console.log("Hi, Am inside createBooking");
    const {show,seats,transactionId} = req.body;
    const userId = req.userDetails._id;
    try{
        const newBooking = await new BookingModel({show,seats,transactionId,user:userId});
        const newBookingResponse = await newBooking.save();
        const showDetails = await ShowModel.findById(show);
        const updatedBookedSeats = [...showDetails.bookedSeats,...seats];
        await ShowModel.findByIdAndUpdate(show,{bookedSeats:updatedBookedSeats});
        const movieDetails = await MovieModel.findById(showDetails.movie)
        const theatreDetails = await TheatreModel.findById(showDetails.theatre);  
        const {subject,body} =  bookingConfirmationTemplate(showDetails,newBookingResponse, movieDetails,theatreDetails);
        sendEmail([req.userDetails.email],subject,body);

        return res.status(201).send({
            success:true,
            message:`Booking successfully created with ${newBookingResponse._id}`,
            data:newBookingResponse
        });
    }catch(err){
        return res.status(500).send({success:false,message:"Internal Error"});
    }
}

module.exports={
    makePayment,
    createBooking
};