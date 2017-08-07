var express = require("express");
var router  = express.Router({mergeParams: true});
var Blogpost = require("../models/blogpost");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//COMMENTS NEW
router.get("/new",middleware.isLoggedIn, function(req, res){
    // FIND BLOGPOST BY ID
    console.log(req.params.id);
    Blogpost.findById(req.params.id, function(err, blogpost){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {blogpost: blogpost});
        }
    })
});

//COMMENTS CREATE
router.post("/",middleware.isLoggedIn,function(req, res){
   //FIND BLOGPOST BY ID
   Blogpost.findById(req.params.id, function(err, blogpost){
       if(err){
           console.log(err);
           res.redirect("/blogposts");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               req.flash("error", "Something went wrong");
               console.log(err);
           } else {
               //ADD USERNAME TO COMMENT
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //SAVE COMMENT
               comment.save();
               blogpost.comments.push(comment);
               blogpost.save();
               console.log(comment);
               req.flash("success", "Successfully added comment");
               res.redirect('/blogposts/' + blogpost._id);
           }
        });
       }
   });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {blogpost_id: req.params.id, comment: foundComment});
      }
   });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/blogposts/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment deleted");
           res.redirect("/blogposts/" + req.params.id);
       }
    });
});

module.exports = router;