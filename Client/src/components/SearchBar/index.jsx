import { Col, Input, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../pages/Home";
import '../../App.css'

const SearchBar = () =>{

    const [searchValue,setSearchValue] = useState("");
    const {movies,setMovies,allMoviesRef} = useContext(MovieContext);

    //Event Handler function for Search INput
    const onInputChange = (e) =>{
        setSearchValue(e.target.value);
    };
    // Filtering Movies on search input
    useEffect(()=>{
        if(movies!==null){
            const filteredMovies = allMoviesRef.current.filter((movie)=>{
                return movie.movieName.toLowerCase().startsWith(searchValue.toLowerCase());
            });
        setMovies(filteredMovies);
        }
      },[searchValue]);

    return (
        <>
        <div className="search-cont d-flex justify-content-center align-items-center">
            <Row>
                <Col  lg={{span:24}}>
                    <Input onChange={onInputChange} value={searchValue} placeholder="Search Movie here" />
                </Col>
            </Row>
        </div>
        
        </>
    );
}

export default SearchBar;