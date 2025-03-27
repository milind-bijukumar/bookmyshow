import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "antd";
import { GetShowsForAMovie } from "../../api/shows";
import noShowImg from '../../img/no-show-found.svg'
import { ShowContext } from "../../pages/MovieDetail.jsx";

const Show = () =>{
    
    const {movieId} = useParams();
    const {date} = useContext(ShowContext)
    const [shows,setShows] = useState(null);

    useEffect(()=>{
        fetchShowDetails();
    },[date]);

    const fetchShowDetails = async()=>{
        const showResponse = await GetShowsForAMovie(movieId,date);
        if (showResponse.success){
            setShows(showResponse.data);
        }
    }    
    return (
        <div className="show-cont">
        {   shows &&  (Object.keys(shows)).length===0 && (
            <div className="noShowImg-cont">
                <h2>No Show Found!</h2>
                <img src={noShowImg} alt="No-Show-Found" />
            </div>
            )
        }
        {   shows &&  (Object.keys(shows)).length>0 &&(
            <div>
                <div className="ms-3">
                    <h2>Theatre</h2>
                </div>
                {   Object.keys(shows).map((theatreId)=>{
                        const allShowsForThisTheatre = shows[theatreId];
                        const theatreDetails = allShowsForThisTheatre[0].theatre;
                        return(
                            <div className="ms-3">
                                <Row gutter={24}>
                                    <Col lg={{span:8}} >
                                        <h3> {theatreDetails.name} </h3>
                                        <p> {theatreDetails.address} </p>
                                    </Col>
                                    <Col lg={{span:16}}>
                                        <ul className="show-ul">
                                        {   allShowsForThisTheatre.map((show)=>{
                                                return( 
                                                    <Link to={`/book-show/${show._id}`}>  
                                                        <li> 
                                                            {show.showTime}  
                                                        </li>
                                                    </Link>
                                                );
                                            })
                                        }
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                        )
                    })
                }
            </div>
            )}
        </div>
    );

}
export default Show;