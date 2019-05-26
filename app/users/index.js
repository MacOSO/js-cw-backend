let express = require('express');
let router = express.Router();
let ctrl = require('./controller');

/* GET all users */
router.get('/', ctrl.getAllUsers);

/* GET user by id ?id=5ce9e7e8fec3f9b50441b1b9 */
router.post('/:_id', ctrl.getUserById);

/* GET all users */
router.get('/reg', ctrl.createUser);

module.exports = router;
