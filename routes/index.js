var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var config = require("../config/");
var db = mongojs(config.database);
var passport = require("passport")
var local = require("passport-local").Strategy

router.get("/", function(req, res, next) {
    res.render("index",{title:"EXPRESS MONGO"})
});

router.get("/secure", function(req, res, next){
    res.render("secure",{title:"Secure Page"})
})

router.get("/unauthorised", function(req, res, next){
    res.render("unauthorised",{title:"unauthorised Page"})
})

router.get('/logout', function (req, res, next) {
    delete req.session.authenticated;
    res.redirect('/');
});




router.post("/login",
function(req, res, next){
  //  res.send(req.body.email)
  
    var query = { 'Email' : req.body.email };
    db.users.findOne(query,
    function(err,data){
    if (err){
        //alert("wrong email")
        res.redirect("/")
        return 
    }else {
        //res.send(data.Password)
        // res.send(JSON.stringify(data))
        // if (JSON.stringify(data) == "null"){
        //     res.redirect("/")
        // }
        if (!data){
            console.log("empty account")
            res.redirect("/")
            return 
        }
        
         
       if (req.body.pwd === data.Password  ) {
           if (data.Role == "admin" ){
            req.session.authenticated = true
            res.redirect('/users/list')
            return 
           }
           else {
           // alert("you are not admin")
            res.redirect('/')
            return 
           }

       }else {
       // req.flash('error', 'Username and password are incorrect');
      // alert("wrong pwd")
        res.redirect('/');
        return 
       }
    }
    // res.send(data.Password)
    
});
})

module.exports = router;
