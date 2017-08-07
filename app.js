//DEPENDENCIES
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Blogpost  = require("./models/blogpost"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

//REQUIRING ROUTES
var blogpostRoutes = require("./routes/blogpost"),
    commentRoutes    = require("./routes/comments"),
    searchRoutes      = require("./routes/search"),
    indexRoutes      = require("./routes/index");

//DB INIT
// mongoose.connect("mongodb://localhost/telematica_proyecto1");
mongoose.connect("mongodb://pcanogo:proyecto1@ds161021.mlab.com:61021/telematica-proyecto1");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is a secret passcode for stuff",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/blogposts", blogpostRoutes);
app.use("/blogposts/:id/comments", commentRoutes);
app.use("/search", searchRoutes);

var port = process.env.PORT || 3005;
var myIp = process.env.IP;

app.listen(port, function(){
   console.log("The BlogTing Server Has Started!");
});