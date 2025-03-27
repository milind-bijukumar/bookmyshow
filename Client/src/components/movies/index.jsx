import { Flex, Card} from "antd";
import { useContext} from "react";
import moment from "moment";
import {Link} from  "react-router-dom";
import { MovieContext } from "../../pages/Home";
import conetnImg from '../../img/content-1.png'

const { Meta } = Card;

const Movies = () =>{

    const {movies} = useContext(MovieContext);
    return(
        <div className="movies-section">
            <h2>Movies</h2>
            <hr/>
            <Flex wrap gap="large" justify="center" align="center" className="movie-card-cont">
            {
                movies==null &&
                <div className="text-center">
                    <h3>Fetching Movies...</h3>
                </div>
            }
            {
                movies && 
                movies.map((movie)=>{
                    return (
                    <div>
                    <Link to={`movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`}>
                        <Card
                            hoverable
                            style={{
                            width: 180,
                            }}
                            cover={<img alt="example" src={movie.poster} />}
                            loading:true
                        >
                            <Meta title={movie.movieName}/>                            
                        </Card>  
                    </Link>     
                    </div>
                    );
                })
            }
            </Flex>
            <div className="ad-cont">
                <img src={conetnImg} alt="conetnt-img" width={"80%"}/>
            </div>
            
        </div>
    )
}
export default Movies