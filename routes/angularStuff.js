var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var config = require("../config/");
var db = mongojs(config.database);

router.post("/login",
function(req, res, next){
  //  res.send(req.body.email)
  
    var query = { 'Email' : req.body.email };
    db.users.findOne(query,
    function(err,data){
    if (err){
        //alert("wrong email")
        res.json(
            {"error:":"error occur"}
        )
        return 
    }else {
        if (!data){
            console.log("empty account")
            res.status(500)
            res.send({err:"empty account!"})
            
            return 
        }
        
         
       if (req.body.pwd === data.Password) {
           if (data.Role == "member" ){
            req.session.authenticated = true
            db.boat.find( (err, data) => {
                if (err)
                res.json(
                    {"error:":err}
                )
                else {
                    //res.status(200)
                    console.log("now i will give you the data!")
                    res.send(data)
                }
            })
            
            return 
           }
           else {
           // alert("you are not admin")
           res.status(500)
           res.send({err:"You are not memeber!"})
            return 
           }

       }else {
       // req.flash('error', 'Username and password are incorrect');
      // alert("wrong pwd")
      res.status(500)
      res.send({err:"wrong password"})
        return 
       }
    }
    // res.send(data.Password)
    
});
})


router.post("/Register",function(req, res, next){
    var user = req.body
    //if (!user.)

    if (!user.Email || !user.Password || !user.FirstName || !user.LastName || !user.Address.street || !user.Address.city || !user.Address.province || !user.Address.postalCode || !user.Address.country){
        console.log("info not completed")
       // res.status(500).send("info incompleted")
       res.status(500)
       res.send({err:"insufficient info"})
       return 

    }else {
        user.Role = "member"
        user.CreationDate = new Date()
        db.users.save(user,function(err,data){
            if (err){
                res.status(500)
                res.send({err:"err occur"})
                return 
            }
            console.log("successfully craeted user")
            res.status(200).send("success")
            return 
        })
    }
})











module.exports = router;