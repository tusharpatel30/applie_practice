const multer=require("multer")
const jwt=require("jsonwebtoken");
var con=require("../config/db.config")
const verifyToken = function (req, res) {
    const token = req.headers["x-access-token"];
    if (!token) {
      res.send("We need a token, please give it to us next time");
    } else {
      jwt.verify(token, 'GKGKGKGK', (err, decoded) => {
        res.status(200).send(decoded);
        var id =req.body.id;
       // console.log("jnjmsms");
        con.query(`SELECT * FROM EMPLOYEE WHERE ID=?`,[id],function(err,result){
        if (err) return res.status(500).send("There was a problem finding the data.");
        if(!result) return res.status(404).send("no data found");
        console.log("jnjmsms");
    res.status(200).send();
    })
        // if (err) {
        //   console.log('err:' + err);
        
        //   res.json({ auth: false, message: "you are failed to authenticate" });
        // } else {
        //   res.json({ user_id: decoded.user_id, });
                    
  
        //   res.end();
        // }
      });
    }
  }


  

module.exports=verifyToken;

 