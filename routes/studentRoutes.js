const express = require('express')
// const req = require('express/lib/request')
const router = express.Router()
const Student = require('../models/student')


router.get('/students',async(req,res)=>{
    try {
        if(!req.isAuthenticated()){
            res.send('Login to View')
        }

        const students = await Student.find({})
        res.send(students)

    } catch (error) {
        console.log(error.message);
    }
})

router.patch('/updateCourse',async(req,res)=>{

    // try {
    //     if(!req.isAuthenticated()){
    //         res.send('Login to View')
    //     }
// console.log(req.query)
// console.log(req.params)
console.log(req.body.id)
console.log(req.body.course)

        await Student.findByIdAndUpdate(req.body.id,{course:req.body.course})
        .then((student)=>
                res.send(student) 
        ).catch(err=>
            console.log(err)
        ) 
// res.send(req.query.id)
    // } catch (error) {
    //     console.log(error.message);
    // }
})

module.exports = router