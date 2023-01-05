var mysql=require("mysql");
 var con=require("../config/db.config")

var sqlSchema = `create table if not exists employee(id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255), email VARCHAR(255),phone_number BIGINT,age int,gender VARCHAR(255),birth_date DATE,password VARCHAR(255))`;
//con.query(`ALTER TABLE STUDENT ADD  password VARCHAR(255)`);

  con.query(sqlSchema, function (err, result) {
    if (err) throw err;
    console.log("Table altered");
  });

const employee =function()
{
    this.name=employee.name;
    this.email=employee.email;
    this.phone_number=employee.phone_number; 
    this.age=employee.age;
    this.gender=employee.gender;
    this.birth_date=employee.birth_date;
    this.password=employee.password;
       

};