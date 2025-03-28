const { createNewShow, getAllShows, getTheatresAndShowsByMovieId, getShowDetailsByShowId } = require("../Controllers/show.controller")
const { verifyJWT, verifyAdminOrPartner } = require("../Middlewares/auth.middleware")

module.exports=(app)=>{

    app.post('/shows',[verifyJWT,verifyAdminOrPartner],createNewShow);
    app.get('/shows',[verifyJWT],getAllShows);
    app.get('/shows/movies/:movieId',[verifyJWT],getTheatresAndShowsByMovieId);
    app.get('/shows/:showId',[verifyJWT],getShowDetailsByShowId);
}