var express = require("express");
var router  = express.Router();
var Blogpost = require("../models/blogpost");
var middleware = require("../middleware");

//INDEX - SHOW ALL BLOGPOSTS
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

//CREATE - ADD NEW BLOGPOST TO DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // GET DATA FROM FORM AND ADD TO BLOGPOST ARRAY
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newBlogpost = {name: name, image: image, description: desc, author:author}
    // CREATE A NEW BLOGPOST AND SAVE TO DB
    Blogpost.create(newBlogpost, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //REDIRECT BACK TO MAIN PAGE
            console.log(newlyCreated);
            res.redirect("/blogposts");
        }
    });
});

//NEW - SHOW FORM TO CREATE NEW BLOGPOST
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("blogposts/new"); 
});

// SHOW - SHOW MORE INFO ANOUT BLOGPOST
router.get("/:id", function(req, res){
    //FIND THE BLOGPOST WITH PROVIDED ID
    Blogpost.findById(req.params.id).populate("comments").exec(function(err, foundBlogpost){
        if(err){
            console.log(err);
        } else {
            console.log(foundBlogpost)
            //RENDER SHOW BLOGPOST WITH THAT TEMPLATE
            res.render("blogposts/show", {blogpost: foundBlogpost});
        }
    });
});

// EDIT BLOGPOST ROUTE
router.get("/:id/edit", middleware.checkBlogpostOwnership, function(req, res){
    Blogpost.findById(req.params.id, function(err, foundBlogpost){
        res.render("blogposts/edit", {blogpost: foundBlogpost});
    });
});

// UPDATE BLOGPOST ROUTE
router.put("/:id",middleware.checkBlogpostOwnership, function(req, res){
    // fFIND AND UPDATE BLOGPOST
    Blogpost.findByIdAndUpdate(req.params.id, req.body.blogpost, function(err, updatedBlogpost){
       if(err){
           res.redirect("/blogposts");
       } else {
           //REDIRECT SHOW PAGE
           res.redirect("/blogposts/" + req.params.id);
       }
    });
});

// DESTROY BLOGPOST ROUTE
router.delete("/:id",middleware.checkBlogpostOwnership, function(req, res){
   Blogpost.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/blogposts");
      } else {
          res.redirect("/blogposts");
      }
   });
});


module.exports = router;
