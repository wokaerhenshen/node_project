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
            res.status(500).send("empty account")
            
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
           res.json(
            {"error:":"you are not member!"}
            )
            return 
           }

       }else {
       // req.flash('error', 'Username and password are incorrect');
      // alert("wrong pwd")
      res.json(
        {"error:":"wrong password!"}
        )
        return 
       }
    }
    // res.send(data.Password)
    
});
})


router.post("/Register",function(req, res, next){
    var user = req.body
    //if (!user.)
    user.Role = "member"
    user.CreationDate = new Date()
    db.users.save(user,function(err,data){
        if (err){
            res.send(err)
        }
        res.send("true")
    })

})











module.exports = router;