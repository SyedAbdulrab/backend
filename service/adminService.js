// services/adminService.js
const {
  validateAndStructureAdminData,
  validateAndStructureStudentData,
} = require("../validators/validators");
const Admin = require("../models/Admin");
const Student = require("../models/Student");

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
    console.log(studentData);
    const validatedData = validateAndStructureStudentData(studentData);
    console.log(validatedData);
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
  updateStudentById
};
