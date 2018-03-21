var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var config = require("../config/");
var db = mongojs(config.database);

//get users list
router.get("/list", (req, res, next) => {
    
    db.users.find( (err, data) => {
        if (err)
            res.send(err);
        else {
            res.render("users",{users:data,title:"User List"})
        }
        
        
    })
});

//get single user 
router.get("/detail/:id",(req,res,next)=>{
    db.users.findOne({_id:mongojs.ObjectId(req.params.id)},
function(err,data){
    if (err){
        res.send(err);
    }
    res.json(data)
});
});

//get single user based on email
router.get("/detailByEmail/:email",(req,res,next)=>{

    var query = { 'Email' : req.params.email };
    console.log(query);
    console.log('query');

    db.users.findOne(query,
function(err,data){
    if (err){
        res.send(err);
    }
    res.json(data)
});
});


//create user
router.post("/create",(req,res,next)=>{
    var user = req.body

    if (!user.Email || !user.Password){
        res.status(400)
        res.json(
            {"error:":"bad data, can't insert"}
        )
    }else{
        user.Role = "Member"
        user.CreationDate = new Date()
        db.users.save(user,function(err,data){
            if (err){
                res.send(err)
            }
            res.send("true")
        })
    }
})

module.exports = router;