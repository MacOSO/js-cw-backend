let express = require('express');
let router = express.Router();
let ctrl = require('./controller');

/* GET user by id /5ce9e7e8fec3f9b50441b1b9 */
router.get('/:_id', ctrl.getUserById);

/* POST refill */
router.post('/refill', ctrl.refill);

/* GET library user by id */
router.get('/library/:_id', ctrl.getLibraryByUserId);

/* POST registration */
router.post('/reg', ctrl.createUser);

/* POST auth */
router.post('/auth', ctrl.authUser);

module.exports = router;
