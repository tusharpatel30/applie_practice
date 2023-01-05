var app=require("express")();
//var http=require('http').Server(app);


const con = require("../config/db.config");
const user=require("../model/user")

const uploadFile=require("../middleware/upload")

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const jsonwebtoken=require("jsonwebtoken");
require('dotenv').config();
const config=require("../config/db.config")
const auth=require("../middleware/auth");
const upload=require("../middleware/upload");
const multer=require("multer")





// exports.Upload = async (req, res) => {
//     console.log("upload");
//     try {
//         // await uploadFile(req, res);
//          //console.log(req.body,"asddasas");s
//         console.log(req.fileurl, "asddasas");
//         if (req.fileurl == undefined) {
//             return res.status(400).send({ message: "Please upload a file!" });
//         }
//         res.status(200).send({
//             message: "Uploaded the file successfully: " + req.fileurl,
//         });
//     } catch (err) {
//         res.status(500).send({
//             message: `Could not upload the file: ${req.file.originalname}. ${err}`,
//         });
//     }
// };





exports.Insert = async function(req, res)  {
    console.log(req.body);
    const password=req.body.password;
    const encryptedPassword = await bcrypt.hash(password, 10);
    
    let employee = {
        name: req.body.name,
        email:req.body.email,
        phone_number:req.body.phone_number,
        age:req.body.age,
        gender:req.body.gender,
        birth_date:req.body.birth_date,
        password:encryptedPassword
    
    }
    

    con.query(`INSERT INTO employee (name, email, phone_number, age, gender, birth_date, password) VALUES ('${employee.name}','${employee.email}','${employee.phone_number}','${employee.age}','${employee.gender}','${employee.birth_date}','${employee.password}')`, (err, data) => {
       
        
        if (err) {
            console.log("error: ", err);
            res.send(err, null);
            return;
        }
        console.log("created student: ");
        if (data.affectedRows == 1) {
            res.send(employee)
            
        } else {
            res.send('some error')
        }
         //res.send(data)

    });
};


exports.alldetails = (req,res)=>{
    console.log(req.body);
    let id = req.params.id;
    if (!id) {
    return res.status(400).send({ error: true, message: 'Please provide user_id' });
  }

    con.query("SELECT * FROM employee where id=?",id,function (error, results){
        if (error) throw error;
  return res.send({ error: false, data: results[0], message: 'customers list.' });
       
    })

}

exports.update=async function(req,res){
    console.log("hwbemf");
    let temp={
        name:req.body.name,
        age:req.body.age
    };

    con.query(`SELECT * FROM employee WHERE id='${req.body.id}'`, (err,result)=>{
        console.log("hbjefhb",result);
        if(err){
            console.log("error:",err);
            res.send(err,null);
            return;
        }
        else{

            con.query(`UPDATE employee SET name =('${req.body.name}') where id=('${req.body.id}')`,(err,data)=>{
                if(err){
                    console.log("bsscb",err);
                    res.send(err,null);
                    return;
                }
                console.log("updated");
                if(data.affectedRows==1){
                    res.send(temp)
                }
                else{
                    res.send('some error')
                }

            })
        }

    })
}


exports.delete=async function (req,res){
    console.log("nddmdmd");
    let temp={
        name:req.body.name,
        age:req.body.age
    };

    con.query(`DELETE FROM employee WHERE ID='${req.body.id}'`,(err,data)=>{
        console.log("bdbnd",err);
        if(err){
            console.log("error",err);
            res.send(err,null);
            return;
        }
        console.log("deleted");
        if(data.affectedRows==1){
            res.send(temp)
        }
        else{
            console.log("error");
        }

    })

}

exports.querystring=async function(req, res){
  var id =req.query.id;
  var name=req.query.name;
    con.query(`select * from employee where id='${id}'`,(err,data)=>{
        console.log(data);
        if(err)throw(err);
        res.send(data);
    })
    console.log('name:'+req.query.id);
    }
  
exports.querystringname=async function(req, res){
        var id =req.query.id;
        var name=req.query.name;
          con.query(`select '${id}','${name}' from employee`,(err,data)=>{
              console.log(data);
              if(err)throw(err);
              res.send(data);
          })
          console.log('name:'+req.query.id);
          }
  
          
http.createServer((req, res) => {
 
            // Parsing the URL
            var request = url.parse(req.url, true);
          
            // Extracting the path of file
            var action = request.pathname;
          
            // Path Refinements
            var filePath = path.join(__dirname,
                    action).join(" ");
          
            // Checking if the path exists
            fs.exists(filePath, function (exists) {
          console.log("fetch image");
                if (!exists) {
                    res.writeHead(404, {
                        "Content-Type": "text/plain" });
                    res.end("404 Not Found");
                    return;
                }
          
                // Setting default Content-Type
                var contentType = "text/plain";
          
                // Setting the headers
                res.writeHead(200, {
                    "Content-Type": contentType });
          
                // Reading the file
                fs.readFile(filePath,
                    function (err, content) {
                        // Serving the image
                        res.end(content);
                    });
            });
          })


  
exports.login=async function (request, response) {
    var email = request.body.email;
    var password = request.body.password;
    if (email)
   {
      con.query('SELECT * FROM employee WHERE email = ? ', [email], async function (error, results,result, fields) {
        console.log(results);
        if (results && results.length > 0) {
         
          let matchPassword = await bcrypt.compare(password, results[0].password);
          if (matchPassword) {
            const jsontoken = jsonwebtoken.sign({user_id:results[0].id,email:email},'GKGKGKGK');
                
                 response.json({token:jsontoken});
          }
        //    {
        //     response.send("login successfully!!!!")
        //   } 
          else {
            response.send('Incorrect password!');
          }
        } else {
          response.send('Incorrect email!');
        }
        response.end(); 
      });
    } else {
      response.send('Please enter email and Password!');
      response.end();
    }
  };


exports.details= auth,(req,res)=>{
    var id =req.body.id;
       res.status(200).send("");
}

//image upload

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        cb(null, "public")
    },
    filename: (req, file, cb) => {
      cb(null,  Date.now() + file.originalname );
  }
    
  })
  
  var Uploads = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb){
    
         var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " +filetypes );
      } 
  
  }).single("file");       
    
  exports.image = function (req, res, next) {
        
    
    Uploads(req,res,function(err) {
  
        if(err) {
            res.send(err)
        }
        else {
            res.send("Success, Image uploaded!")
        }
    })
  }






const reader = require('xlsx')

exports.readexcel= function (req,res) {
    // Reading our test file  
    let data = []
      try{
    
        var storage = multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null, "excel");
          },
          filename: function (req, file, cb) {
            let upfileName = Date.now() + "-" + file.originalname;
            req.upfileName = upfileName;
            cb(null, upfileName);
          },
        });
        
        var excelfile = multer({ 
          storage: storage,
        }).single("file"); 
        
        excelfile(req,res,function(err) {
          console.log('upfileName '+req.upfileName);
    
          const file = reader.readFile('./excel/'+req.upfileName);
          const sheets = file.SheetNames;
          console.log('sheets '+sheets);

            
        
          for(let i = 0; i < sheets.length; i++)
          {
            const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
            temp.forEach((res) => {
              //console.log('res: '+JSON.stringify(res));
               data.push(res);
               con.query('SELECT * FROM employee WHERE email = ? ', [res.EMAIL], async function (error, results, fields) {
                if (err) throw err;
                console.log("email: " + JSON.stringify(results));

          if(results.length == 0){  
          var user_schema = {
            NAME:res.NAME,
            EMAIL:res.EMAIL,
            PHONE_NUMBER:res.PHONE_NUMBER,
            AGE:res.AGE,
            GENDER:res.GENDER,
            BIRTH_DATE:res.BIRTH_DATE,
          }

      
          //console.log('user_schema'+JSON.stringify(user_schema));
        
          con.query(`INSERT INTO employee (name, email, phone_number, age , gender , birth_date) VALUES ('${user_schema.NAME}','${user_schema.EMAIL}','${user_schema.PHONE_NUMBER}','${user_schema.AGE}','${user_schema.GENDER}','${user_schema.BIRTH_DATE}')`, (err, data) => {
              if (err) {
                console.log("error: ", err);
                //res.send(err, null);
                return;
              }else{
                // console.log(user_schema);
                // res.send(data);
              }
                
            })
            }else{
              con.query("UPDATE employee SET name = ?, phone_number = ?, age = ?, gender = ?, birth_date = ? WHERE email = ?", [res.NAME,res.PHONE_NUMBER,res.AGE,res.GENDER,res.BIRTH_DATE,res.EMAIL], function (error, results, fields) {
                if (error) throw error;
                  console.log("employee data updated!!!!");
              });
            }
          })
        })
            
            console.log("htydrtrer6");
            res.send(data);
          }
          
        
          });
        
    
          // res.send(data);
      }
      catch(err){
          res.send(err);
      }
    
    }
