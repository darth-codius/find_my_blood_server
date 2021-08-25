// importing neccessary modules
const router = require('express').Router();
const bloodController = require('../controllers/bloodController')
const {auth, idcheck} = require('../middlewares/auth');


router.get('/all', auth, bloodController.getAllBlood);
router.post('/add', auth, bloodController.createBloodGroup);
router.post('/edit/:id', auth, bloodController.updateBlood);
router.post('/search', auth, bloodController.searchBlood);





// exporting the router
module.exports = router;