// importing the necessary modules
const router = require('express').Router();
const requestController = require('../controllers/requestController');
const {auth, idcheck} = require('../middlewares/auth');

router.get('/all', auth, requestController.getAllrecords );
router.get('/create', auth, requestController.createRequest );
router.get('/action', auth, requestController.requestAction );


// exporting the router
module.exports = router;