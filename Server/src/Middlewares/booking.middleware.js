const { default: mongoose } = require("mongoose");
const ShowModel = require("../Model/show.model");

const validateCreateBookingRequest = async(req,res,next)=>{
    //1. validate showId is correct or not 
    //2. Check with stripe , if its a valid transactionId and payment status is completed 
    //3. Validate any of the seats passed should not be already booked

    const {show,seats,transactionId} = req.body;    
        try{
            if(!mongoose.Types.ObjectId.isValid(show)){
                return res.status(400).send({
                    success:false,
                    message:"Invalid format"
                }); 
            }
            const showDetails = await ShowModel.findById(show);
            if(!showDetails){              
                return res.status(400).send({
                    success:false,
                    message:"Invalid Show"
                });
            } 
            seats.forEach((seat)=>{
                if(showDetails.bookedSeats.includes(seat)){
                    return res.status(400).send({success:false,message:"Seats passed are already booked"});
                }
            });
            next();  
        }catch(err){
            return res.status(500).send({success:false,message:"Internal Error",err});
        }
}


module.exports = {
    validateCreateBookingRequest
}