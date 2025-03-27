import { createContext, useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar"
import { GetAllMovies } from "../../api/movie";
import SearchBar from "../../components/SearchBar";
import Movies from "../../components/movies";
import MovieCarousel from "../../components/carousel";
import Footer from "../../components/footer";
export const MovieContext = createContext();

const Home = ()=>{

    const [movies,setMovies] = useState(null);
    const allMoviesRef = useRef(null);

    //Fetching Movie from backend on Page Load
    useEffect(()=>{
        fetchMoviesData();
      },[]);
    const fetchMoviesData = async ()=>{    
      const moviesData = await GetAllMovies();
      if(moviesData.success){
        setMovies(moviesData.data);
        allMoviesRef.current=moviesData.data;
      }
    };

    return (     
        <>
        <Navbar/>
        <MovieContext.Provider value={{movies:movies,setMovies:setMovies,allMoviesRef:allMoviesRef}}>
          <SearchBar/>
          <MovieCarousel/>
          <Movies/>
        </MovieContext.Provider>
        <Footer/>
        </>
    )
}
export default Home