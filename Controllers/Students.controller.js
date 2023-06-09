const StudentRouter = require("express").Router();
const StudentModel = require('../Models/Student.model')


StudentRouter.get("/", function (req, res, next) {
 
 
  return res.status(200).json({
   
    message: "Student router working",
  });
});

StudentRouter.post("/createStudent", function (req, res, next) {
  const {
    studentName,
    studentEmail,
    studentContactNumber,
    courseId,
    primaryLanguage,
    secondaryLanguage,
    mentors,
  } = req.body;

const newStudent = new StudentModel({
  
  studentName,
  studentEmail,
  studentContactNumber,
  courseId,
  primaryLanguage,
  secondaryLanguage,
  mentors,
});
newStudent.save().then((res)=>{

    
    if (res._id) {
      return res.status(200).json({
        success: true,
        message: "Student creatd successfully!!!",
        res,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Error creating student!!!",
        res,
      });
    }
  })
  .catch((error) => {
    res.status(400).json({
      success: false,
      message: "BAD RESUEST!!!",
      error: error,
  })
})
})

//update mentor

StudentRouter.patch("/updateStudent", function (req, res, next) {
  const {
    studentId,
    studentName,
    studentEmail,
    studentContactNumber,
    courseId,
    primaryLanguage,
    secondaryLanguage,
    mentors,
  } = req.body;

  StudentModel.updateOne(
    { _id: studentId },
    {
      $set: {
        studentName,
        studentEmail,
        studentContactNumber,
        courseId,
        primaryLanguage,
        secondaryLanguage,
        mentors,
      },
    }
  )
    .then((res) => {
      if (res && res.acknowledged && res.modifiedCount === 1) {
        return res.status(200).json({
          success: true,
          message: "Student creatd successfully!!!",
          res,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Error creating student!!!",
          res,
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "BAD RESUEST!!!",
        error: error,
      });
    });
});




StudentRouter.get("/studentsid/:id", async (req,res,next)=>{
        let students;
        try {
          students = await StudentModel.findById(req.params.id);
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
        if(!students){
            return res.status(500).json({
                message:"student not available for this id"
            })
        }
        return res.status(200).json({ students })  
})
StudentRouter.get("/getMentor/:mentorId",async(req,res)=>{
  
  let id=req.params.mentorId
  console.log(id)
  try{
  let data= await StudentModel.find({mentorId:ObjectId(id)}).toArray()
  res.send(data)}
  catch{res.status(500).send({
    message:"Internal Server Error",
    error 
  })
}
    
  })


StudentRouter.get('/allstudents', async function(req, res, next) {
  try{
    let users = await StudentModel.find({},{password:0})
    res.status(200).send({
      users,
      message:"Users Data Fetch Successfully"
    })

  }catch{
    res.status(500).send({
      message:"Internal Server Error",
      error 
    })
  }
});

StudentRouter.post('/assignmentor/:id',async (req,res) => {
  const { studentId} = req.params

  try{
      const student = await StudentModel.findById(id);
      student.mentors = req.body.params.mentorId;
      await student.save();
      res.send(student);
  }catch(err){
      res.status(500);
      res.send(err);
  }
})

StudentRouter.get('/nomentors', async function(req, res, next) {
  const students = await StudentModel.find({mentors:[]})
 try{
   res.status(200).send({
     students,
     message:"Users Data Fetch Successfully"
   })

 }catch{
   res.status(500).send({
     message:"Internal Server Error",
     error 
   })
 }
});


module.exports = StudentRouter
