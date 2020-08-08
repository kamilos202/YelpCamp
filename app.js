const express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
passport = require("passport"),
	  cookieParser = require("cookie-parser"),
localStrategy = require("passport-local"),
flash        = require("connect-flash"),
methodOverride = require("method-override"),
passportLocalMongoose = require("passport-local-mongoose"),
Campground = require("./models/campground"),
Comment = require("./models/comment"),
User = require("./models/user"),
seedDB = require("./seeds");

// configure dotenv
// require('dotenv').load();

var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");

// mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
//seedDB();




//MISC Commands
// var url = process.env.DATABASEURL || ("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
// //var url = "mongodb://localhost/yelpcamp";
// mongoose.connect(url);
mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use(cookieParser('secret'));

app.use(require("express-session")({
	secret: "This is any statement",
	resave: false,
	saveUnitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

// app.listen(process.env.PORT,process.env.IP,function(req,res){
// 	console.log("Listening on port 3000");
// });

app.listen(3000, function() { 
	console.log('Server listening on port 3000'); 
});







