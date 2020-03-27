//////////////////////////////////////////
/// Variables & Config
//////////////////////////////////////////

var methodOverride = require("method-override"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  express = require("express"),
  request = require("request"),
  Product = require("./models/product"),
  Comment = require("./models/comment"),
  User = require("./models/user"),
  seedDB = require("./seeds"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  passportLocalMongoose = require("passport-local-mongoose"),
  flash = require("connect-flash"),
  app = express();

// Require Routes
var commentRoutes = require("./routes/comments"),
  productRoutes = require("./routes/products"),
  indexRoutes = require("./routes/index");

// mongoose.connect("mongodb://localhost/OWSM_V2");
mongoose.connect(
  "mongodb+srv://omarreda291:smaherbelal291@cluster0-ddili.mongodb.net/test?retryWrites=true&w=majority"
);
// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://omarreda291:smaherbelal291@cluster0-ddili.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   client.close();
// });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// Passport Configs
app.use(
  require("express-session")({
    secret: "Try to hack me!",
    resave: false,
    saveUninitialized: false
  })
);

// App Use

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(indexRoutes);
app.use("/products", productRoutes);
app.use("/products/:id/comments", commentRoutes);

//////////////////////////////////////////
/// Server
//////////////////////////////////////////

app.listen(3000, function() {
  console.log("Assignment Server 3000");
});
