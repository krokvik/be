var express = require("express"),
// path = require("path"),
    logger = require("morgan"),
// cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-auth').Strategy;
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
// app.use(cookieParser());
// //app.use(connect.session({
// //    store: new RedisStore(config.redis),
// //    secret: 'your secret here'
// //}  ));
// app.use(express.static('public'));
// app.use('/lib', express.static('public/bower_components'));

passport.use(new GoogleStrategy(
    {
        clientId: '123-456-789',
        clientSecret: 'shhh-its-a-secret',
        callbackURL: 'https://www.example.com/auth/example/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(JSON.stringify(profile));
        done(null, {foo: 'bar'});
        // User.findOrCreate(..., function (err, user) {
        //     done(err, user);
        // });
    }
));

// // My routes resolving

app.use("/", passport.authenticate('google'), require("./src/main"));
// app.use("/game", require("./server/game/"));

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
