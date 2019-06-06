let express = require('express');
let router = express.Router();
let ctrl = require('./controller');

// TODO: get /search?q=

/* GET all files */
router.get('/', ctrl.getAllGames);

/* GET search?online= */
router.get('/search', ctrl.search);

/* GET game by id /5ce9e7e8fec3f9b50441b1b9 */
router.get('/:_id', ctrl.getGameById);

router.post('/buy/', ctrl.buyGame);

/* Upload endpoint */
router.post('/upload', ctrl.uploadPicture);

module.exports = router;
