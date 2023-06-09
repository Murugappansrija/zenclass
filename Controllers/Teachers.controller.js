const MentorRouter = require("express").Router();

const MentorModel = require('../Models/Mentor.model')

MentorRouter.get("/", function (req, res, next) {
  return res.status(200).json({
    message: "Teacher router working",
  });
});

MentorRouter.post("/creatementor",(req,res,next)=>{
  const{ mentorName,
    mentorEmail,
    mentorContactNumber,
    skills,
    primaryLanguage,
    secondaryLanguage,} =req.body
    
    const newMentor = new MentorModel({
      mentorName,
    mentorEmail,
    mentorContactNumber,
    skills,
    primaryLanguage,
    secondaryLanguage,

  
})
newMentor.save() 

.then((response) => {
  if (response._id) {
    return res.status(200).json({
      success: true,
      message: "Mentor created successfully!!!",
      response,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Error creating mentor!!!",
      response,
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

MentorRouter.put("/assignStudents/:id",async(req,res)=>{
  const {id}=req.params;
  const data=req.body
  try {
      if(!data){
          res.send({data:"Enter Valid Input"})
          return
      }
      const mentor=await MentorModel.updateOne({_id:new ObjectId(id)},{$set:req.body})
  res.status(200).json({data:"Updated Successfully"})
  } catch (error) {
      console.log(error)
      res.send(500).json("Server Error")
  }
  
  })
  MentorRouter.post('/assign-student/:id',async (req,res) => {
    const {id} = req.params;
    
    try{
        const student = await MentorModel.findById(id);
        student.studentsAssigned = req.body;
        await student.save();
        res.send(student);
    }catch(err){
        res.status(500);
        res.send(err);
    }
  })
 
module.exports= MentorRouter;