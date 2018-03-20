var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var config = require("../config/");
var db = mongojs(config.database);

//get boat list
router.get("/list", (req, res, next) => {
    
    db.boat.find( (err, data) => {
        if (err)
            res.send(err);
        
        res.json(data);
    })
});

//get single boat 
router.get("/detail/:id",(req,res,next)=>{
    db.boat.findOne({_id:mongojs.ObjectId(req.params.id)},
function(err,data){
    if (err){
        res.send(err);
    }
    res.json(data)
});
});

//create boat
router.post("/create",(req,res,next)=>{
    var boat = req.body
    if (!boat.BoatName || !boat.BoatLengthInFeet || !boat.BoatYear || !boat.BoatCapacityInPeople || !boat.BoatPictureUrl){
        res.status(400)
        res.json(
            {"error:":"bad data, can't insert"}
        )
    }else{
        db.boat.save(boat,function(err,data){
            if (err){
                res.send(err)
            }
            res.send("true")
        })
    }
})

//delete boat
router.delete("/delete/:id",(req,res,next)=>{
    db.boat.remove({ _id:mongojs.ObjectId(req.params.id)},function(err,data){
        if (err){
            res.send(err)
        }
        res.send("true")
    
    })
})

//update boat
router.put("/update/:id",(req,res,next)=>{
    var boat = req.body
    var changedBoat = {}
    if (boat.BoatName){
        changedBoat.BoatName = boat.BoatName
    }
    if (boat.BoatLengthInFeet){
        changedBoat.BoatLengthInFeet = boat.BoatLengthInFeet
    }
    if (boat.BoatYear){
        changedBoat.BoatYear = boat.BoatYear
    }
    if (boat.BoatCapacityInPeople){
        changedBoat.BoatCapacityInPeople = boat.BoatCapacityInPeople
    }
    if (boat.BoatPictureUrl){
        changedBoat.BoatPictureUrl = boat.BoatPictureUrl
    }
    if (Object.keys(changedBoat).length == 0 ){
        res.status(400)
        res.json(
            {"error":"Bad data"}
        )
    }else{
        db.boat.update({
            _id:mongojs.ObjectId(req.params.id)},
            changedBoat,{},function(err,data){
                if (err){
                    res.send(err)
                }
                res.send("true")
           
        })
    }

})

module.exports = router;
