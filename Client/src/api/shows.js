import { axiosInstance } from "./axiosInstance";

export const GetShowsForAMovie = async (movieId,date)=>{
    console.log("Make an API call to fetch all Show for a Movie");
    try{
        const response = await axiosInstance.get(`http://localhost:8082/shows/movies/${movieId}?date=${date}`);
        return response.data;
    }catch(err){
        return err.response.data;
    }
}

export const GetShowsDetails = async (showId)=>{
    console.log("Make an API call to fetch Show for given ID");
    try{
        const response = await axiosInstance.get(`http://localhost:8082/shows/${showId}`);
        // console.log(response.data);
        return response.data;
    }catch(err){
        return err.response.data;
    }
}
