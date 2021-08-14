// importing the necessary modules
const router = require('express').Router();
const hospitalController = require('../controllers/hospitalController');


router.post('/signup', hospitalController.signup);
// router.patch('/:id', hospitalController.updateHospital);
// router.post('/login', hospitalController.signinHospital);


// exporting the router
module.exports = router;