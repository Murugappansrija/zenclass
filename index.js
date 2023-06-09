

const express = require ('express')
const bodyparser = require("body-parser")
const nodeservers = express()
const studentsrouter = require('./Controllers/Students.controller')
const  mentorrouter = require("./Controllers/Teachers.controller")
const cors = require('cors')
const env = require("dotenv")
const mongoosee = require('mongoose')

env.config()
nodeservers.use(cors())

nodeservers.use(bodyparser.json())
nodeservers.use(bodyparser.urlencoded({extended:true}))

// require('./dbconnection')

  nodeservers.use("/student", studentsrouter)

  nodeservers.use ("/mentor",mentorrouter)

const port = 5300
nodeservers.listen(port, 'localhost',()=>{
    console.log("server is running under port no",port)
})

mongoosee.connect(process.env.db).then(()=>{
console.log("db connected")

})
.catch((error)=>{
  console.log(error);
})
// module.exports = nodeservers



