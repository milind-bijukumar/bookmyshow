
const express = require('express');
require('dotenv').config();
const connectDB= require('./src/db/dbServer');
const userRoutes = require('./src/Routes/user.routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const movieRoutes = require('./src/Routes/movie.routes');
const theatreRoutes = require('./src/Routes/theatre.routes');
const showRoutes = require('./src/Routes/show.routes');
const bookingRoute = require('./src/Routes/booking.route');
const app = express();
const rateLimit = require("express-rate-limit");
const mongoSanitize = require('express-mongo-sanitize');

connectDB();

const apiLimiter = rateLimit({
	windowMs: 3*1000, // 3 Sec
	max: 5,
	message:"Too Many Request!, Try After Sometime"
})

app.use(bodyParser.json());
app.use(cors());
app.use(apiLimiter);
app.use(mongoSanitize());

userRoutes(app);
movieRoutes(app);
theatreRoutes(app);
showRoutes(app);
bookingRoute(app);

app.listen(8082,()=>{
    console.log("Server is running on port 8082");
});