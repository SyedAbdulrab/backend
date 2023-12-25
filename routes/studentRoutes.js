// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentService = require('../service/studentService');


router.get('/', (req, res) => {
    res.send('Student routes Working');
});

// Route to create a new student
router.post('/students', async (req, res) => {
  try {
    const studentData = req.body;
    const createdStudent = await studentService.createStudent(studentData);
    res.status(201).json(createdStudent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/students', async (req, res) => {
    try {
      const allStudents = await studentService.getAllStudents();
      res.json(allStudents);
    } catch (error) {
      console.error('Error fetching all students:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.get("/:email/:password", async (req,res)=>{
  try{
    const email = req.params.email;
    const password = req.params.password;

    const student = await studentService.getStudentByEmailPass(email,password);
    res.json(student);
  } catch(error){
      console.error('Error updating student details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.put('/students/:id', async (req, res) => {
    try {
      const studentId = req.params.id;
      const { phone, imageUrl } = req.body;
  
      // Validate and structure the data as needed
  
      const updatedStudent = await studentService.updateStudentDetails(studentId, { phone, imageUrl });
      res.json(updatedStudent);
    } catch (error) {
      console.error('Error updating student details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;