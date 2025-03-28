const { default: mongoose } = require("mongoose");
const MovieModel = require("../Model/movie.model");


const getAllMovies = async (req,res) =>{

    try{
        const allMovies = await MovieModel.find({});
        return res.status(200).send({
            success:true, 
            message:"All Movies are been fetched",
            data:allMovies
        });
    }catch(err){
        return res.status(500).send({success:false,message:"Internal Error"});
    }
}
const getMovieDetails = async (req,res) =>{
    try{

        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).send({
                success:false, 
                message:"Movie ID format is invalid"
            });
        }
        const movie = await MovieModel.findById(req.params.id);
        if (!movie){
            return res.status(400).send({
                success:false, 
                message:"Movie with given ID not present in System"
            });
        }
        return res.status(200).send({
            success:true, 
            message:"Movies with given ID is fetched",
            data:movie
        });
    }catch(err){
        return res.status(500).send({success:false,message:"Internal Error"});
    }
}

// const createBooking = (req,res) => {
//     return res.send({success:true,message:"Booking Craeted Successfully"});
// }

const createMovie =async (req,res)=>{ 
    try{
        const newMovie = new MovieModel(req.body);
        const dbResponse = await newMovie.save();
        if(dbResponse!==null){
            return res.status(201).send({success:true,message:"Movie Craeted Successfully",data:dbResponse});
        }
    }catch(err){
        return res.status(500).send({success:false,message:"Internal Error"});
    }
}
const deleteMovieById = async(req,res)=>{
    const movieId = req.params.id;
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).send({
                success:false, 
                message:"Movie ID format is invalid"
            });
        }
        const movie = await MovieModel.findById(req.params.id);
        if (!movie){
            return res.status(400).send({
                success:false, 
                message:"Movie with given ID not present in System"
            });
        }
        const deleteResponse =  await MovieModel.findByIdAndDelete(movieId);
        if(deleteResponse.deleteCount!==0){
            return res.status(200).send({
                success:true, 
                message:`Movie with ID:${movieId} deleted Successfully`
            });
        }
    }catch(err){
        return res.status(500).send({success:false,message:"Internal Error"});
    }
};

const updateMovieById = async (req,res)=>{
    const movieId = req.params.id;
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).send({
                success:false, 
                message:"Movie ID format is invalid"
            });
        }
        const movie = await MovieModel.findById(req.params.id);
        if (!movie){
            return res.status(400).send({
                success:false, 
                message:"Movie with given ID not present in System"
            });
        }
        const updateResponse = await MovieModel.findByIdAndUpdate(movieId,req.body,{new:true});

        if(updateResponse!==null){
            return res.status(200).send({
                success:true, 
                message:`Movie with ID ${movieId} is updated successfully`
            });
        }

    }catch(err){
        return res.status(500).send({success:false,message:"Internal Error"});
    }
}



module.exports={
    getAllMovies,
    getMovieDetails,
    createMovie,
    deleteMovieById,
    updateMovieById
};