var express = require("express"),
// path = require("path"),
    logger = require("morgan"),
// cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    authMiddleware = require("./src/auth/middleware")();
// connect = require("connect"),
// config = require("./config/dev");
// //RedisStore = require('connect-redis')(connect.session);
// //module.exports = connect();

var app = express();


// //app.use(favicon(__dirname + "/public/favicon.png"));

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// //app.set("view engine", "jade");
// app.engine("html", require("dot-emc").__express);
// app.set("view engine", "html");

// // uncomment after placing your favicon in /public
// //app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(logger("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// // My routes resolving

app.use("/", require("./src/main"));
app.use("/claim", authMiddleware, require("./src/claim"));
app.use("/", authMiddleware, require("./src/stats"));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
// var err = new Error("Not Found");
// err.status = 404;

// next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get("env") === "development") {
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render("error", {
//         message: err.message,
//         error: err
//     });
// });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
// res.status(err.status || 500);
// res.render("error", {
//     message: err.message,
//     error: {}
// });
// });


module.exports = app;
