import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GetShowsDetails } from "../../api/shows";
import Navbar from "../../components/Navbar";
import { Card, Col, Row, Button, message } from "antd";
import {createBooking, makePayment } from "../../api/booking";
import StripeCheckout from 'react-stripe-checkout';

const BookShow = () =>{
    
    const params = useParams();
    const showId = params.showId;
    const navigate = useNavigate()

    const [showDetails,setShowDetails] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(()=>{
        fetchShowData();
    },[]);

    const onToken= async (token)=>{
        console.log("token generated",token);
        try{
            const paymentResponse= await makePayment({token:token.id,amount:selectedSeats.length * showDetails.ticketPrice});
            if(paymentResponse.success){
                message.success(paymentResponse.message);
                console.log("calling createBooking");
                const bookingResponse= await createBooking({show:showId,seats:selectedSeats,transactionId:paymentResponse.data});
                if(bookingResponse.success){
                    message.success(bookingResponse.message);
                    setTimeout(()=>{
                        navigate("/");
                    },1000)
                }
            }
        }catch(err){
            return res.status(500).send({message:"Internal Server Error"}); 
        }
    };

    const fetchShowData=async ()=>{
        try{
            const showResponse = await GetShowsDetails(showId);
            // console.log(showResponse.data);
            if(showResponse.success){
                setShowDetails(showResponse.data);
            }
        }catch(err){
            return res.status(500).send({message:"Internal Server Error"})
        }
    }
    const handleSeatSelect =(seatNumber)=>{
        console.log(seatNumber)
        if (!selectedSeats.includes(seatNumber)){
            setSelectedSeats([...selectedSeats, seatNumber]);
            return;
        }
        const updatedSeats = selectedSeats.filter((seat)=>seat!=seatNumber);
        setSelectedSeats(updatedSeats);
    }

    const getSeats=()=>{
        
        const totalSeats = showDetails.totalSeats;
        const cols= 12;
        const rows= Math.ceil(totalSeats/cols);

        //Creating 2D Array
        let allRows = [];
        for(let i=0;i<rows;i++){
            allRows.push(i);
        };
        let allCols = [];
        for(let i=0;i<cols;i++){
            allCols.push(i);
        };
        return (
            <div>
                {/* For the seat section */}
                <div className="mt-3 max-width-600 mx-auto">
                    <div className="seat-ul">
                    {
                        allRows.map((curRow)=>{
                            return (
                                <div className="seat-ul">
                                {
                                    allCols.map((curCol)=>{
                                        let seatNumber = (curRow*cols)+(curCol+1);
                                        let seatClass = "seat-btn";
                                        
                                        if(showDetails.bookedSeats.includes(seatNumber)){
                                            seatClass+= " booked";
                                        }
    
                                        if(selectedSeats.includes(seatNumber)){
                                            seatClass+= " selected"
                                        }
                                        if(seatNumber<=totalSeats){
                                            return <button onClick={()=>{handleSeatSelect(seatNumber)}} className={seatClass}> {seatNumber} </button>
                                        }
                                    }) 
                                }
                                </div>       
                            );
                        })
                    }
                </div>
                </div>
                
                {/* for Footer section of card */}
                <div className="bottom-card mt-3 max-width-600 mx-auto">
                    <div> Selected Seats : <span> {selectedSeats.join(", ")} </span>  </div>
                    <div> Total Price : <span> {selectedSeats.length * showDetails.ticketPrice}</span>   </div>
                </div>
        </div>
        ); 
    }
    
    return (
        <>
            <Navbar/>
            {/* content to display till showdetails are loaded */}
            {
                !showDetails && (
                    <div>
                        <h2>Loading......</h2>
                    </div>
                )
            }
            {
                showDetails && (
                    <div>
                        <Row>
                            <Col>
                                <Card 
                                    
                                    title= {
                                        <div>
                                            <h1> {showDetails.movie.movieName} </h1>
                                            <p> {showDetails.theatre.name}, {showDetails.theatre.address} </p>
                                        </div>
                                    }
                                    extra={
                                        <div>
                                            <div>
                                               <h4>Date: {showDetails.showDate}</h4> 
                                            </div>
                                            <div>
                                                <h4>Time: {showDetails.showTime}</h4>
                                            </div>
                                            <div>
                                                <h4>Ticket Price: Rs.{showDetails.ticketPrice}</h4>
                                            </div>
                                            <div>
                                                <h4>Total Seats: {showDetails.totalSeats}</h4>
                                            </div>
                                            <div>
                                                <h4>Available Seats: {showDetails.totalSeats-showDetails.bookedSeats.length}</h4>
                                            </div>
                                        </div>
                                    }
                                    style={{
                                        width: "97vw",
                                    }}>
                                        {getSeats()}
                                </Card>
                            </Col>
                        </Row>
                    {/* <button className="mt-3">Create Booking</button> */}
                        <div className="d-flex justify-content-center align-items-center">
                            {
                                selectedSeats.length>0 && (
                                    <StripeCheckout
                                        token={onToken}
                                        stripeKey="pk_test_51R3pUAGP1AXFpRZw3QsYOPa72CywrG9y0ZqWvK1zEkPjrRzoer8zIPLWGoE01sTfLISe6Clc2AIDrRzRsby0XeJA0094DqJeQP"
                                    />
                                )                          
                            }
                        </div>
                    </div>                   
                )
            }
        </>
    )
}

export default BookShow