var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.render("index",{title:"EXPRESS MONGO"})
});

router.post("/login",function(req, res, next){
    //if (req.email )
})

module.exports = router;
