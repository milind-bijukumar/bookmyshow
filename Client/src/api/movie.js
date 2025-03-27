import { axiosInstance } from "./axiosInstance";

export const GetAllMovies = async (data)=>{
    console.log("Make an API call to fetch all Movies");
    try{
        const response = await axiosInstance.get("http://localhost:8082/movies");
        // console.log(response.data);
        return response.data;
    }catch(err){
        return err.response.data;
    }
}

export const GetMovieData = async (movieId)=>{
    console.log("Making an API call to fetch Movie with id",movieId);
    try{
        const response = await axiosInstance.get(`http://localhost:8082/movies/${movieId}`);
        // console.log(response.data);
        return response.data;
    }catch(err){
        return err.response.data;
    }
}