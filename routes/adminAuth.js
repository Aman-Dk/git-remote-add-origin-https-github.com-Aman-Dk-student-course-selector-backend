const express = require('express')
const req = require('express/lib/request')
// const req = require('express/lib/request')
const router = express.Router()
const passport = require('passport')

const Admin = require('../models/admin')

router.get('/api/fakeUser',async(req,res)=>{
    const admin = new Admin({username:'admin',email:'admin@gmail.com'})
    await Admin.register(admin,'123').then((admin)=>{
        res.send(admin)
    }).catch((err)=>{
        res.send(err)
    })

})

router.get('/api/',(req,res)=>{

    res.send('HomePage')

})

router.get('/api/list',(req,res)=>{
    try {
        if(!req.isAuthenticated()){
            res.send('Login to View')
        }
        res.redirect('/api/students')
    } catch (error) {
        console.log(error.message);
    }
})

router.get('/api/login',async(req,res)=>{
    res.render('admin/auth/login')
})

//login admin
router.post('/api/login', 
    passport.authenticate('local', 
                    {                        
                        // failureRedirect: '/login',
                        failureMessage:'invalid username or password'
                        // failureFlash: true 
                    }
                    ),(req,res)=>{
                        // console.log(`MECHANIC - loggedIN as ${req.user.username}`);
                        // req.flash('success',`Welcome Back ${req.user.username}`);
                        // res.send('loggedIN Successfully as' + req.user)
                        res.redirect('/api/list')
                        // res.send('success' + req.user.username)
                    }
)

// logout user
router.get('/api/admin/logout', (req,res)=>{
    req.logout();
    res.redirect('/api/login');
})


module.exports = router
