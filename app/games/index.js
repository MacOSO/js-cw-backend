let express = require('express');
let router = express.Router();
let ctrl = require('./controller');

/* GET all files */
router.get('/games', ctrl.getAllGames);

/* Upload endpoint */
router.post('/upload', ctrl.uploadPicture);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(418).send({ status: 'FUCK YOU DIRTY HACKER', message: 'FUCKING COURSE WORK, FUCKING JAVA, FUCKING JAVASCRIPT' });
});

module.exports = router;
