// importing the necessary modules
const router = require('express').Router();
const hospitalController = require('../controllers/hospitalController');
const {auth, idcheck} = require('../middlewares/auth');

const path = require('path');
const multer = require('multer');


// configurable  for multer
const storage = multer.diskStorage({
destination : "./public/images",
filename : function(req, file, cb){
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
}
});

// Init Upload
const upload = multer({
    storage: storage
})

router.post('/signup', hospitalController.signup);
router.post('/edit/:id', auth, idcheck, upload.single("logo"), hospitalController.update);
router.post('/login', hospitalController.signin);
router.get('/:id', auth, hospitalController.getHospital)
router.delete('/:id', hospitalController.delete);


// exporting the router
module.exports = router; 