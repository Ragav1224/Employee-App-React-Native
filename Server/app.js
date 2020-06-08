const express = require('express')
const app = express()
const bodyParse = require('body-parser')
const mongoose = require('mongoose')
require('./Employee')

// password CvVU0tW9XkvQ6RGk

app.use(bodyParse.json())

const Employee = mongoose.model("employee")

const mongooUri ="mongodb+srv://EmployeeApp:CvVU0tW9XkvQ6RGk@cluster0-uhduu.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(mongooUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("Connected with mongo")
})

mongoose.connection.on("error",(err)=>{
    console.log("error", err)
})




app.get('/',(req,res)=>{
    Employee.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})


app.post('/send-data',(req,res)=>{
    // console.log(req.body)
    const employee = new Employee({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        salary:req.body.salary,
        picture:req.body.picture,
        job:req.body.job
    })

    employee.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })

    
})

app.post('/delete',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        salary:req.body.salary,
        picture:req.body.picture,
        job:req.body.job
    }).then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})


app.listen(3001,()=>{
    console.log("Server Running")
})


