var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDb=require("./config/db")
const cors=require("cors");
//require('dotenv').config   //normally this is used but here it is not working
const dotenv =require('dotenv').config();
if (dotenv.error){
  throw dotenv.error;
}
console.log(process.env.JWT_PASSWORD);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');//connecting user in the routes
const authRouter = require('./routes/authRouter');//connecting authrouter in the routes\
const adminRoute = require('./routes/adminRoute');
const paymentRoute=require('./routes/paymentRoute');

var app = express();

connectDb()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  origin:['https://courtbooking-fe-app.onrender.com','http://localhost:3000']
})) //use this after variable declaration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authRouter);
app.use('/admin',adminRoute);
app.use('/payment',paymentRoute)

/*const corsOptions ={
  origin:'http://localhost:3000/', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
