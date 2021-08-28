// importing the necessary modules
const router = require('express').Router();
const requestController = require('../controllers/requestController');
const {auth, idcheck} = require('../middlewares/auth');

router.post('/all', auth, requestController.getAllrecords );
router.post('/create/:id', auth, requestController.createRequest );
router.post('/action', auth, requestController.requestAction );


// exporting the router
module.exports = router;