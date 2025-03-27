import {useSearchParams } from "react-router-dom";
import { createContext, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import Show from "../../components/show";
import MovieData from "../../components/movieData";

export const ShowContext = createContext();
const MovieDetail = () =>{

    const [searchParams, setSearchParams] = useSearchParams();
    const [date,setDate] = useState(searchParams.get('date'));
    return (
    <>
        <Navbar/>
        <ShowContext.Provider value={{date:date, setDate:setDate}}>
            <MovieData/>
            <Show/>
        </ShowContext.Provider>
        <Footer/>
    </>     
    )
}
export default MovieDetail;