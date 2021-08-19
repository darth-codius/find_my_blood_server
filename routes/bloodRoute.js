// importing neccessary modules
const router = require('express').Router();
const bloodController = require('../controllers/bloodController')
const auth = require('../middlewares/auth');


router.get('/', auth, bloodController.getAllBlood);
router.post('/add', auth , bloodController.createBloodGroup);
router.post('/edit/:id', auth , bloodController.updateBlood);





// exporting the router
module.exports = router;