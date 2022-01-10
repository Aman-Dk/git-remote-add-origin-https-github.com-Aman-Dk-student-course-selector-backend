if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const mongoose = require('mongoose')
const seedDb = require('./seed')
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const app = express()
const path = require('path');

const Admin = require('./models/admin')
//Routes
const adminAuthRoutes = require('./routes/adminAuth')
const studentRoutes = require('./routes/studentRoutes')
// local database 
// 'mongodb://localhost:27017/studentCourse'
mongoose.connect(process.env.DB_URL,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log('DB connected')
    })
    .catch((err)=>{
        console.log('DB not connected')
        console.log(err)
    })

    app.set('view engine','ejs');
    app.set('views',path.join(__dirname,'/views'));
    app.use(express.static(path.join(__dirname,'/public')));
    app.use(express.urlencoded({extended:true}));

//session parameters
const sessionConfig = {
    secret:'thereisnosecret',
    resave:false,
    saveUninitialized: true
}

// initializing session and using 
app.use(session(sessionConfig));


//initialize passport and session for storing user info
app.use(passport.initialize());
app.use(passport.session());

// configuring the passport to use local strategy for user and mechanic
passport.use(new localStrategy(Admin.authenticate()));

// use static serialize and deserialize of model for passport session support for admin
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    // console.log(req.session);
    next();
})

app.use(express.json())
app.use(adminAuthRoutes)
app.use(studentRoutes)

// seed db
// seedDb()

const port = 8080

app.listen(process.env.PORT || port, ()=>{
    console.log('server running at port ' + port)
})