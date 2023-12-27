// services/studentService.js
const { validateAndStructureStudentData } = require('../validators/validators');
const Student = require('../models/Student');

const createStudent = async (studentData) => {
    try {
        console.log(studentData)
      const validatedData = validateAndStructureStudentData(studentData);
      console.log(validatedData)
      const newStudent = new Student(validatedData);
      const savedStudent = await newStudent.save();
      return savedStudent;
    } catch (error) {
      throw error;
    }
};

const getAllStudents = async () => {
    try {
      const allStudents = await Student.find();
      return allStudents;
    } catch (error) {
      throw error;
    }
};

const getStudentByEmailPass = async (email,password)=>{
  try{
    const student = await Student.findOne( {email,password});
    return student;
  } catch (error) {
  throw error;
}
}

const updateStudentDetails = async (studentId, newDetails) => {
    try {
      // Create an object to store the fields that need to be updated
      const updateFields = {};
  
      // Check if new phone number is provided
      if (newDetails.phone) {
        updateFields.phone = newDetails.phone;
      }
  
      // Check if new image URL is provided
      if (newDetails.imageUrl) {
        updateFields.imageUrl = newDetails.imageUrl;
      }
  
      // Use $set to update only the specified fields
      const updatedStudent = await Student.findByIdAndUpdate(studentId, { $set: updateFields }, { new: true });
  
      return updatedStudent;
    } catch (error) {
      throw error;
    }
  };


// Route for mess off request

const updateMealTypesById = async (id, day, mealtype) => {
  try {
    // Find the student by ID
    const student = await Student.findById(id);

    if (!student) {
      throw new Error('Student not found');
    }

    // Find the calendar entry for the specified day
    const dayIndex = day - 1; // Assuming days are 1-indexed
    const calendarEntry = student.calendar.days[dayIndex];

    if (!calendarEntry) {
      throw new Error('Invalid day');
    }

    // Update the meal type based on the selected meal
    switch (mealtype) {
      case 'breakfast':
        calendarEntry.breakfast = 'A'; // Set 'A' for attended, modify as needed
        break;
      case 'lunch':
        calendarEntry.lunch = 'A';
        break;
      case 'dinner':
        calendarEntry.dinner = 'A';
        break;
      default:
        throw new Error('Invalid mealtype');
    }

    // Save the updated student document
    await student.save();

    // Return the updated calendar
    return student.calendar;
  } catch (error) {
    throw error;
  }
};

  

module.exports = {
  createStudent,
  getAllStudents,
  getStudentByEmailPass,
  updateMealTypesById
};