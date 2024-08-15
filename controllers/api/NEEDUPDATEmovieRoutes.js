// const router = require('express').Router();
// const { Movie, Discussion } = require('../models');
// const { searchMovies } = require("../../services/movie.service")



// router.get('/movies/:id', movieController.getMovieDetails);


// // Here we get all the movies matching a search and send them back to the browser as JSON data
// //  /api/movies?q=batman
// router.get('/', async (req, res) => {




  
//     try {
//       const dbMovieData = await Movie.findAll({
//         include: [
//           {
//             model: Discussion,
//             attributes: ['text', 'public_rating', 'internal_rating' ],
//           },
//         ],
//       });
  
//       const movies = dbMovieData.map((movie) =>
//         movie.get({ plain: true })
//       );
//       /*
//       req.session ={
//         user:{}
//         data:{}
//         save: (()=> {})
//       }
  
//       req.session.user.email
//       req.session.user.id
  
//       */
  
//      req.session.save(() => {
//        // We set up a session variable to count the number of times we visit the homepage
//        if (req.session.countVisit) {
//          // If the 'countVisit' session variable already exists, increment it by 1
//          req.session.countVisit++;
//        } else {
//        // If the 'countVisit' session variable doesn't exist, set it to 1
//         req.session.countVisit = 1;
//        }
  
//          res.render('homepage', {
//            movies
//            // We send over the current 'countVisit' session variable to be rendered
//            // countVisit: req.session.countVisit,
//          });
//      //   });
      
//     } catch (err) {
//        console.log(err);
//        res.status(500).json(err);
//      }
//    });

//    router.get('/movie/:id', protectedRoute, async (req, res) => {
//      try {
//        const dbMovieData = await Movie.findByPk(req.params.id, {
//          include: [
//            {
//              model: Discussion,
//              attributes: [
//                'id',
//                'title',
//                'artist',
//                'exhibition_date',
//                'filename',
//                'description',
//              ],
//            },
//          ],
//        });
  
//        const movie = dbMovieData.get({ plain: true });
//        // TODO: Send over the 'loggedIn' session variable to the 'gallery' template
//        res.render('movie', { movie });
//      } catch (err) {
//        console.log(err);
//       res.status(500).json(err);
//      }
//   });