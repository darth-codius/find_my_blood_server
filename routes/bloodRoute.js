// importing neccessary modules
const router = require('express').Router();
const bloodController = require('../controllers/bloodController')
const auth = require('../middlewares/auth');


// router.post('/add', auth , bloodController.addBlood);
// router.delete('/del', auth, bloodController.deleteBlood);




// exporting the router
module.exports = router;