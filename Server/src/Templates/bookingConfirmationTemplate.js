module.exports = (showDetails, bookingDetails, movieDetails,theatreDetails)=>{
    const subject= "Booking Confirmed";
    // TODO: Design the email template with proper design
    const body =  `
            <html>
                <head>
                    <style>
                        .booking-cont{
                            width: 300px;
                            margin: auto;
                            padding: 2rem;
                        }
                    </style>
                </head>
            <body>
                <div class="booking-cont">
                    <h1>Booking Confirmed</h1>
                    <div>
                        <h4>Movie: ${movieDetails.movieName}</h4>
                    </div>
                    <div>
                        <h4>Theatre: ${theatreDetails.name}</h4>
                    </div>
                    <div>
                        <h4>Show Time: ${showDetails.showTime}, ${showDetails.showDate}</h4>
                    </div>
                    <div>
                        <h4>Seats: ${bookingDetails.seats.join(", ")}</h4>
                    </div>        
                </div>
            </body>
        </html>`;
    return ({subject,body});
}