import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GetMovieData } from "../../api/movie.js";
import { Flex, Card} from "antd";
import { ShowContext } from "../../pages/MovieDetail.jsx/index.jsx";

const MovieData= () =>{

    const {movieId} = useParams();
    const navigate = useNavigate();
    const {date,setDate} = useContext(ShowContext);

    const[movie,setMovie] = useState(null);

    useEffect(()=>{
            fetchMovieDetails();
        },[]);
        const fetchMovieDetails= async()=>{
            const response= await GetMovieData(movieId)
            if(response.success){
                setMovie(response.data);
            }
        }
    const handleDateChange= (e) =>{
        setDate(e.target.value);
        navigate(`/movie/${movie._id}?date=${e.target.value}`);
    }

    console.log(movie);

    return (
    <div className="movie-data-cont d-flex ">
    {   movie && (
        <Flex className="movie-detail-cont" gap="large" align="center" wrap content="center">
            <div>
                <img src={movie.poster} alt="movie-poster" width={"250px"} height={"300px"} />
            </div>
            <div>
                <h1>{movie.movieName}</h1>
                <p> Language : {movie.language} </p>
                <p> Genre : {movie.genre.join(" ")} </p>
                <p> Release Date : {movie.releaseDate.slice(0,10)} </p>
                <p> Duration : {movie.duration} min </p>
                <hr />
                <div>
                    <label htmlFor="showDate">Choose the Date: </label>
                    <input onChange={handleDateChange} type="date" value={date} name="showDate" id="showDate" style={{border:"none"}} />
                </div>
            </div>
        </Flex>
    )}
    </div>
 );
}
export default MovieData