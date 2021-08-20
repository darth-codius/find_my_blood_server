// this function handles images to be uploaded and saves the url to the db
const express = require('express');
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
    }).single("logo")

exports.fileCatch = (req, res, next) => {  
    upload(req, res, (err) => {
        if (err) {
            res.send(err)
        }else {
            res.send(req.file)
            next();
            // res.send("file uploaded successfully")
        }
    });
    next();

}

