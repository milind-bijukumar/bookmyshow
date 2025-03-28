const { getAllMovies, createMovie, createBooking, getMovieDetails, deleteMovieById, updateMovieById } = require("../Controllers/movie.controller");
const { verifyJWT, verifyAdmin } = require("../Middlewares/auth.middleware");
const { verifyCreateMovieRequest } = require("../Middlewares/movie.middleware");

module.exports= (app)=>{
    
    app.get('/movies',getAllMovies);                                   //all users
    app.get('/movies/:id',getMovieDetails);                           //all users
    // app.post('/booking',[verifyJWT, ],createBooking);                //Only if user logged in
    app.post('/movies',[verifyJWT,verifyAdmin, verifyCreateMovieRequest],createMovie); 
    app.delete('/movies/:id',[verifyJWT,verifyAdmin],deleteMovieById);
    app.put('/movies/:id',[verifyJWT,verifyAdmin],updateMovieById)
}