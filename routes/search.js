var express = require('express');
var router = express.Router();

var Blogpost = require('../models/blogpost');
var mongoose = require('mongoose');

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

/* GET home page. */
router.get('/', function(req, res, next) {

    Blogpost.find({author: {username: {$regex: ".*" + req.query.key + ".*", $options: "i" }}}, function (err, blogposts) {
        if(err){
        	console.log("ERROR ;" + err);
            
        } else {
            res.render("blogposts/index", { title: 'Search', blogposts: blogposts});
        }
    });

});

module.exports = router;