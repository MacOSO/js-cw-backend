let express = require('express');
let router = express.Router();
let ctrl = require('./controller');

/* GET home page. */
router.get('/products', ctrl.getAllProducts);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

module.exports = router;
