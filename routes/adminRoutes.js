// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminService = require("../service/adminService");
const { validateAndStructureAdminData } = require("../validators/validators");

router.get("/", (req, res) => {
  res.send("Admin routes Working");
});

router.post("/admins", async (req, res) => {
  try {
    const adminData = req.body;

    // Validate adminData
    const validatedData = validateAndStructureAdminData(adminData);

    const newAdmin = await adminService.createAdmin(validatedData);
    res.status(201).json(newAdmin);
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/admins", async (req, res) => {
  try {
    const admins = await adminService.getAllAdmins();
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/admins/:adminId", async (req, res) => {
  try {
    const { adminId } = req.params;

    // Check if adminId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(400).json({ error: "Invalid adminId" });
    }

    const deletedAdmin = await adminService.deleteAdminById(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json(deletedAdmin);
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/admins/:adminId", async (req, res) => {
  try {
    const { adminId } = req.params;
    const updatedData = req.body;

    // Check if adminId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(400).json({ error: "Invalid adminId" });
    }

    const updatedAdmin = await adminService.updateAdminById(
      adminId,
      updatedData
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



///---------------STUDENTS------------------///

// Route to get all students
router.get('/students', async (req, res) => {
  try {
    const allStudents = await adminService.getAllStudents();
    res.status(200).json(allStudents);
  } catch (error) {
    console.error('Error getting all students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
);

// Route to get students by hostel name

router.get('/students/:hostelName', async (req, res) => {
  try {
    const { hostelName } = req.params;
    const studentsInHostel = await adminService.getStudentsByHostel(hostelName);

    res.status(200).json(studentsInHostel);
  } catch (error) {
    console.error('Error getting students by hostel name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//endpoint to get a single student
router.get('/student/:id', async (req, res) => {
  try {
    const id  = req.params.id;
    const student = await adminService.getStudentById(id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('Error getting student by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// admin route to create a student
router.post('/students', async (req, res) => {
  try {
    const studentData = req.body;
    const createdStudent = await adminService.createStudent(studentData);
    res.status(201).json(createdStudent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})

// admin route to delete a student
router.delete('/students/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const deletedStudent = await adminService.deleteStudentById(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully', deletedStudent });
  } catch (error) {
    console.error('Error deleting student by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a student by ID
router.put('/students/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const updatedData = req.body;

    const updatedStudent = await adminService.updateStudentById(studentId, updatedData);

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ message: 'Student updated successfully', updatedStudent });
  } catch (error) {
    console.error('Error updating student by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// ------------ Mess Menu -------------------

  // Route to get mess menu
router.get('/messmenu', async (req, res) => {
  try {
    const menu = await adminService.getMessMenu();
    res.status(200).json(menu);
  } catch (error) {
    console.error('Error getting mess menu:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  // Route to create a mess menu
  router.post('/messmenu', async (req, res) => {
    try {
      const menuData = req.body;
      const createdMenu = await adminService.createMessMenu(menuData);
      res.status(201).json(createdMenu);
      res.send(menuData);
    } catch (error) {
      console.error('Error creating mess menu:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Route to update a mess menu by day
router.put('/messmenu/:dayOfWeek', async (req, res) => {
  try {
    const { dayOfWeek } = req.params;
    const updatedMenu = req.body;

    const updatedMenuEntry = await adminService.updateMessMenuByDay(dayOfWeek, updatedMenu);

    if (!updatedMenuEntry) {
      return res.status(404).json({ error: 'Mess menu not found for the specified day' });
    }

    res.status(200).json(updatedMenuEntry);
  } catch (error) {
    console.error('Error updating mess menu:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
