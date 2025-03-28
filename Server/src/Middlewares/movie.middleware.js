
const verifyCreateMovieRequest = (req,res,next)=>{
    const {poster,movieName,description} = req.body;
    
    if(!poster){
        res.status(400).send({success:false,message:"Poster URL is Missing"})
    }
    if(!movieName){
        res.status(400).send({success:false,message:"Poster Name is Missing"})
    }
    if(!description){
        res.status(400).send({success:false,message:"Poster Description is Missing"})
    }
    //If you want to add more validation, please add it here

    next();
}

module.exports = {verifyCreateMovieRequest}