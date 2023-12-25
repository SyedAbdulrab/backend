// services/adminService.js
const {
  validateAndStructureAdminData,
  validateAndStructureStudentData,
} = require("../validators/validators");
const Admin = require("../models/Admin");
const Student = require("../models/Student");
const MessMenu = require("../models/MessMenu");

const createAdmin = async (adminData) => {
  try {
    const validatedData = validateAndStructureAdminData(adminData);
    const newAdmin = new Admin(validatedData);
    const savedAdmin = await newAdmin.save();
    return savedAdmin;
  } catch (error) {
    throw error;
  }
};

const getAllAdmins = async () => {
  try {
    const admins = await Admin.find();
    return admins;
  } catch (error) {
    throw error;
  }
};

const deleteAdminById = async (adminId) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    return deletedAdmin;
  } catch (error) {
    throw error;
  }
};

const updateAdminById = async (adminId, updatedData) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updatedData, {
      new: true,
    });
    return updatedAdmin;
  } catch (error) {
    throw error;
  }
};

/// Admin -> student routes

const createStudent = async (studentData) => {
  try {
    const validatedData = validateAndStructureStudentData(studentData);
    console.log(validatedData);
    const newStudent = new Student(validatedData);
    const savedStudent = await newStudent.save();
    console.log("Student Created");
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

const getStudentsByHostel = async (hostelName) => {
  try {
    const studentsInHostel = await Student.find({ hostel: hostelName });
    return studentsInHostel;
  } catch (error) {
    throw error;
  }
};

const getStudentById = async (studentId) => {
  try {
    const student = await Student.findById(studentId);
    return student;
  } catch (error) {
    throw error;
  }
};

const deleteStudentById = async (studentId) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    return deletedStudent;
  } catch (error) {
    throw error;
  }
};

const updateStudentById = async (studentId, updatedData) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(studentId, updatedData, { new: true });
    return updatedStudent;
  } catch (error) {
    throw error;
  }
};


// Service functions for mess menu

// Function to create a mess menu
const createMessMenu = async (menuData) => {
  try {
    const messMenu = new MessMenu(menuData);
    const createdMenu = await messMenu.save();
    console.log("---------------------------------");
    console.log(menuData);
    return 'ok';
  } catch (error) {
    throw error;
  }
};

// Function to update a mess menu by day
const updateMessMenuByDay = async (dayOfWeek, updatedMenu) => {
  try {
    const updatedMenuEntry = await MessMenu.findOneAndUpdate(
      { dayOfWeek },
      { menu: updatedMenu },
      { new: true }
    );
    return updatedMenuEntry;
  } catch (error) {
    throw error;
  }
};

const getMessMenu = async () => {
  try {
    const menu = await MessMenu.find();
    return menu;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
  deleteAdminById,
  updateAdminById,
  getAllStudents,
  getStudentsByHostel,
  getStudentById,
  createStudent,
  deleteStudentById,
  updateStudentById,
  createMessMenu,
  updateMessMenuByDay,
  getMessMenu,
};
