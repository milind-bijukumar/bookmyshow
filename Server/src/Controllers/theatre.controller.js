const { default: mongoose } = require("mongoose");
const TheatreModel = require("../Model/theatre.model");


const createTheatre = async (req,res)=>{

    // console.log(req.body);
    const theatreDetails = req.body;
    theatreDetails.owner=req.userDetails._id;
    try{
        const newTheatreDetails = new TheatreModel(theatreDetails);
        const response= await newTheatreDetails.save();
        return res.status(201).send({success:true,message:"Theatre Created Successfully",data:response})
    }catch(err){
        return res.status(500).send({message:"Internal Server Error"})
    }

}

const getAllTheatres = async (req,res)=>{

    try{
        const allTheatres = await TheatreModel.find({});
        return res.status(201).send({success:true,message:"All Theatres fetched Successfully",data:allTheatres})
    }catch(err){
        return res.status(500).send({message:"Internal Server Error"})
    }
}

module.exports={
    createTheatre,
    getAllTheatres
}