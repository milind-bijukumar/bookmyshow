const { default: mongoose } = require("mongoose");
const MovieModel = require("../Model/movie.model");
const ShowModel = require("../Model/show.model");
const TheatreModel = require("../Model/theatre.model");

const createNewShow = async (req,res) =>{

    const {movie,theatre, showDate,showTime,totalSeats}= req.body;

    try{
        const theatreObj = await TheatreModel.findById(theatre);
        if(theatreObj===null){
            return res.status(400).send({
                success:false,
                message:`theatre with given ID not present`
            });
        }
        
        const movieObj = await MovieModel.findById(movie);
        if(movieObj===null){
            return res.status(400).send({
                success:false,
                message:`movie with given ID not present`
            });
        }

        const newShow = new ShowModel(req.body);
        await newShow.save()
        return res.status(201).send({
            success:true,
            message:`show created successfully`
        });
    }catch(err){
        return res.status(500).send({message:"Internal Server Error"})
    }
};

const getAllShows = async (req,res)=>{
    try{
        const allShows = await ShowModel.find({}).populate('movie').populate('theatre');
        return res.status(201).send({
            success:true,
            message:"All Show fetched successfully",
            data:allShows
        });
    }catch(err){
        return res.status(500).send({message:"Internal Server Error"}) 
    }
};


const getTheatresAndShowsByMovieId =async (req,res)=>{
    const {movieId} = req.params;
    const {date} = req.query;
    // console.log(movieId);
    // console.log(date);
   try{
    const movieObj = await MovieModel.findById(movieId);
    if(movieObj===null){
        return res.status(400).send({
            success:false,
            message:`movie with given ID not present`
        });
    }
    const allShows = await ShowModel.find({movie:movieId,showDate:date}).populate('theatre').populate('movie');
    // console.log(allShows);
    let showByTheatreId= {};
    allShows.forEach((show)=>{
        const theatreId = show.theatre._id;
        // console.log(theatreId);
        if (!showByTheatreId[theatreId]){
            showByTheatreId[theatreId]=[];
        }
        showByTheatreId[theatreId].push(show);
    });
    console.log(showByTheatreId);
    return res.status(200).send({
        success:true,
        data:showByTheatreId
    });
   }catch(err){
        return res.status(500).send({message:"Internal Server Error"}) 
   }
}


const getShowDetailsByShowId = async (req,res)=>{
    try{
        const showId = req.params.showId;
        if(!mongoose.Types.ObjectId.isValid(showId)){
            console.log("hi")
            return res.status(400).send({
            success:false, 
            message:"Show ID format passed is invalid"
            });
        }
        const show= await ShowModel.findById(showId).populate('movie').populate('theatre');
        if (!show){
            
            return res.status(400).send({
                success:false, 
                message:"Show with given ID not present in System"
            });
        }
        return res.status(200).send({
            success:true, 
            message:"Show with given ID is fetched",
            data:show
        });
        
    }catch(err){
        return res.status(500).send({message:"Internal Server Error"});
    }
}

module.exports = {
    createNewShow,
    getAllShows,
    getTheatresAndShowsByMovieId,
    getShowDetailsByShowId
}