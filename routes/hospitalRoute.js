// importing the necessary modules
const router = require('express').Router();
const hospitalController = require('../controllers/hospitalController');
const {fileCatch} = require('../middlewares/multer')
const auth = require('../middlewares/auth');

console.log(fileCatch)

router.post('/signup', hospitalController.signup);
router.post('/edit/:id', fileCatch, auth, hospitalController.update);
router.post('/login', hospitalController.signin);
router.delete('/:id', hospitalController.delete);


// exporting the router
module.exports = router;