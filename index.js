const express=require("express")
const app=express()


var router = express.Router();
const upload = require('express-fileupload');

app.use(express.urlencoded({extended:false}));
app.use(express.json())

require("./routes/routes")(app)


const userrouter=require("./routes/routes");

app.listen(3000,()=>{

    console.log("server running on port:3000");
})

var mysql=require("mysql");
const con = require("./config/db.config");

con.on('open',()=>{
    console.log("connected....");
})

//app.use(fileUpload());
app.use(express.static('public'));
app.use('/public', express.static('public'));





//app.use(upload())
// app.post('/',(req,res)=>{
//     if(req.files){
//         console.log(req.files)
//         var file = req.files.file
//         var filename  = file.name
//         console.log(filename)
//         file.mv('./public/'+Date.now()+filename,function(err){
//             if (err){
//                 res.send(err)
//             }else{
//                 res.send("file uploaded")
//             }
//         })
//     }
// })

