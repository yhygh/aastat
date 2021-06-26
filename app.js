const express = require("express"),
  compression = require("compression");
(bodyParser = require("body-parser")),
       helmet           = require('helmet');
  (expressSanitizer = require("express-sanitizer")),
  (router = express.Router()),
  (path = require("path")),
  (port = process.env.PORT || 5000),
  (app = express());

var indexRoutes = require("./routes/index");
var emailRoutes = require('./routes/email');

// View engine setup
app.set("view engine", "ejs");

// Compress all routes
app.use(compression());

app.use(helmet());

// Static folder
app.use(express.static(path.join(__dirname + "/public")));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressSanitizer());

app.use(indexRoutes);
app.use("/email-us", emailRoutes);

// app.get("*", function (req, res) {
//   //res.render("views/landing");
//   //res.send(JSON.stringify("Hello World!"));
//   res.send("Hello World!");  
// });

app.listen(port, function () {
  console.log("AA Stat Smart  ...");
});
