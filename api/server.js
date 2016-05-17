// =====================================
// get the packages we need ============
// =====================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');               // used to create, sign, and verify tokens
var config = require('./config');                // get our config file
var User = require('./app/models/user');         // get our mongoose model
var Patient = require('./app/models/patient');   // get our mongoose model

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080;     // used to create, sign, and verify tokens
mongoose.connect(config.database);       // connect to database
app.set('superSecret', config.secret);   // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// default route (get http://localhost:8080/)
app.get('/', function (req, res) {
    res.json({ message: 'Welcome to the 8080 app /, use /api/function' });
});

// =======================
// API ROUTES ============
// =======================
// NOTE : ORDER IS VERY IMPORANT !!

// get an instance of the router for api routes
var apiRoutes = express.Router();



// route to authenticate a user (POST http://localhost:8080/api/user/login)
apiRoutes.post('/user/login', function (req, res) {
    // find the user
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ code: '0', message: 'Login failed. User not found.' });
        }
        else if (user) {
            // check if password matches
            if (user.password != req.body.password) {
                res.json({ code: '1', message: 'Login failed. Wrong password.' });
            }
            else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign({ email: user.email }, app.get('superSecret'), {
                    expiresIn: 86400 // expires in 24 hours
                });
                // return the information including token as JSON
                res.json({
                    code: '100',
                    message: 'Login succeed',
                    date: user,
                    token: token
                });
            }
        }
    });
});

// route to register a user (POST http://localhost:8080/api/user/register)
apiRoutes.post('/user/register', function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) throw err;
        // if user already exist
        if (user) {
            res.json({ code: '0', message: 'User already exist !' });
        }
        else {
            // save data to new user
            var newuser = new User({
                email: req.body.email,
                password: req.body.password,
                img: 'default img'
            });
            // save the sample user
            newuser.save(function (err) {
                if (err) throw err;
                console.log('User saved successfully');
            });
            // create a token
            var token = jwt.sign({ email: newuser.email }, app.get('superSecret'), {
                expiresIn: 86400 // expires in 24 hours
            });
            res.json({ code: '100', message: 'user added sucssesfully', date: newuser, token: token });
        }
    });
});

// ====================================================
// every pre api don't need to verify a token =========
// because this is where we create the token  =========
// ====================================================

// route middleware to verify a token
apiRoutes.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token 
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ code: '0', message: 'Failed to authenticate token.' });
            }
            else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    }
    // if there is no token
    else {
        // return an error
        return res.status(403).send({ code: '1', message: 'No token provided.' });
        //return res.json({ code: '1',  message: 'No token provided.' });
    }
});

// ====================================================
// every next api need to verify a token ==============
// ====================================================


// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function (req, res) {
    res.json({ code: '100', message: 'Welcome to the coolest API on earth!', data: req.decoded });
});

// route to return all doctors (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        res.json({ 'users': users, 'decoded_token': req.decoded });
    });
});

// route to return doctor data (GET http://localhost:8080/api/user/getprofile)
apiRoutes.get('/user/getprofile', function (req, res) {
    User.findOne({ _id: req.query._id }, function (err, user) {
        // user found
        if (user) {
            res.json({ code: '100', message: 'User found', data: user });
        }
        //user not found
        else {
            res.json({ code: '0', message: 'User not found' });
        }
    });
});


// route to update doctor data (GET http://localhost:8080/api/user/updateprofile)
apiRoutes.put('/user/updateprofile', function (req, res) {
    User.findOne({ _id: req.query._id }, function (err, user) {
        // user found
        if (user) {
            // save new data to the user
            if (req.body.email) {
                // he sent his email again
                if (user.email == req.body.email) {
                    user.email = req.body.email;
                }
                // else (new email) search for email duplication
                else {
                    User.findOne({ email: req.body.email }, function (error, userfound) {
                        if (userfound) {
                            res.json({ code: '2', message: 'This Email already exist.'});
                        }
                        else {
                            user.email = req.body.email;
                        }
                    });
                }
                user.email = req.body.email;
            }
            if (req.body.password) {
                user.password = req.body.password;
            }
            if (req.body.name) {
                user.name = req.body.name;
            }
            if (req.body.img) {
                user.img = req.body.img;
            }

            // save the user to db
            user.save(function (err) {
                if (err) throw err;
                console.log('User saved successfully');
                res.json({ code: '100', message: 'User updated', data: user });
            });
             
        }
            //user not found
        else {
            res.json({ code: '0', message: 'User not found' });
        }
    });
});



// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);



// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);