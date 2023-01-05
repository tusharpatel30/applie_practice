let mysql=require("mysql")





let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "firstdb" 
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Mysql database Connected!");
  });



//   var sqlSchema = ("CREATE TABLE student (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255), email VARCHAR(255),phone_number BIGINT,age int,gender VARCHAR(255),birth_date DATE)");

//   con.query(sqlSchema, function (err, result) {
//     if (err) throw err;
//     console.log("Table altered");
//   });



  module.exports=con;
 


  

 
