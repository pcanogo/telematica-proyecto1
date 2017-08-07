var Blogpost = require("../models/blogpost");
var Comment = require("../models/comment");

// MIDDLEWARE FUNCTIONALY OBJECT
var middlewareObj = {};

middlewareObj.checkBlogpostOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Blogpost.findById(req.params.id, function(err, foundBlogpost){
           if(err){
               req.flash("error", "Blogpost not found");
               res.redirect("back");
           }  else {
               // does user own the Blogpost?
            if(foundBlogpost.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;
