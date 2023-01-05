const express = require("express");
const router = express.Router();

const usercontroller=require("../controllers/usercontroller")
const upload=require("../middleware/upload")




module.exports=(app)=>{

    app.post('/insert',usercontroller.Insert)
    app.get('/Alldetails/:id',usercontroller.alldetails)
    app.post('/Update',usercontroller.update)
    app.delete('/Delete',usercontroller.delete)
    app.get('/Api',usercontroller.querystring)
    app.get('/api',usercontroller.querystringname)
    app.post('/Login',usercontroller.login)
    app.get('/Detail',usercontroller.details)
    app.post('/image',usercontroller.image)
    app.post('/readexcel',usercontroller.readexcel)
   


    
   
// app.post('/upload',uploadFile,usercontroller.Upload)    //using multer
    
}