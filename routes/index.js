var express = require("express");
var router  = express.Router();
var passport = require("passport");
var Blogpost = require("../models/blogpost");
var User = require("../models/user");


//ROOT ROUTE
router.get("/", function(req, res){
      // GET ALL BLOGPOST FROM THE DB
    Blogpost.find({}, function(err, allBlogposts){
       if(err){
           console.log(err);
       } else {
          res.render("blogposts/index",{blogposts: allBlogposts});
       }
    });
});

//SHOW REGISTER FORM
router.get("/register", function(req, res){
   res.render("register"); 
});

//SIGN UP LOGIC
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "This is a BlogTing " + user.username);
           res.redirect("/blogposts"); 
        });
    });
});

//LOGIN FORM
router.get("/login", function(req, res){
   res.render("login"); 
});

//LOGIN LOGIC
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/blogposts",
        failureRedirect: "/login"
    }), function(req, res){
});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/blogposts");
});


module.exports = router;