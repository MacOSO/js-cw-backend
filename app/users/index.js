let express = require('express');
let router = express.Router();
let ctrl = require('./controller');

/* GET all users */
router.get('/', ctrl.getAllUsers);

/* GET user by id ?id=5ce9e7e8fec3f9b50441b1b9 */
router.get('/:_id', ctrl.getUserById);

/* POST registration */
router.post('/reg', ctrl.createUser);

/* POST auth */
router.post('/auth', ctrl.authUser);

module.exports = router;
