let express = require('express');
let router = express.Router();
let ctrl = require('./controller');

// TODO: get /search?q=

// TODO: get /games/:id/buy JSON: {user_id: blah}

/* GET all files */
router.get('/games', ctrl.getAllGames);

/* GET game by id /5ce9e7e8fec3f9b50441b1b9 */
router.get('/:_id', ctrl.getGameById);

/* Upload endpoint */
router.post('/upload', ctrl.uploadPicture);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(418).send({ status: 'FUCK YOU DIRTY HACKER', message: 'FUCKING COURSE WORK, FUCKING JAVA, FUCKING JAVASCRIPT' });
});

module.exports = router;
