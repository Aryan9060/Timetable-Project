import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Student } from "../models/student.models.js";

//Register a new student
export const registerStudent = asyncHandler(async (req, res) => {
  //recieve array of object
  const students = req.body;
  console.log("Body -->", req.body);

  if (!Array.isArray(students) || students.length === 0) {
    throw new ApiError(400, "Student data is required");
  }

  const arr = [];

  // fillter those recordes which is not already stored in database
  const studentIds = students.map((student) => student.student_id);
  const emails = students.map((student) => student.email);

  const existingStudents = await Student.find({
    $or: [{ student_id: { $in: studentIds } }, { email: { $in: emails } }],
  });

  const existingStudentIds = new Set(existingStudents.map((s) => s.student_id));
  const existingEmails = new Set(existingStudents.map((s) => s.email));

  const uniqueStudentRecords = students.filter(
    (student) =>
      !existingStudentIds.has(student.student_id) &&
      !existingEmails.has(student.email),
  );
  console.log("Unique Student Records -->", uniqueStudentRecords);

  if (uniqueStudentRecords.length === 0) {
    throw new ApiError(
      408,
      "All provided students already exist in the database",
    );
  }

  // save in database
  const studentRecords = await Student.insertMany(uniqueStudentRecords, {
    ordered: false,
  });
  const studentRecordsInArray = Array.from(studentRecords);

  if (studentRecordsInArray.length === 0) {
    throw new ApiError(500, "Failed to register students");
  }

  console.log("Student -->", studentRecordsInArray);

  throw new ApiResponse(
    res,
    201,
    "Student registered successfully",
    studentRecordsInArray,
  );
});

//  Get all students
export const getAllStudents = asyncHandler(async (req, res) => {
  //get all students
  const students = await Student.find();

  if (!students || students.length === 0) {
    throw new ApiError(404, "No students found");
  }

  return new ApiResponse(res, 200, "Students fetched successfully", students);
});

//  Get student by id
export const getStudentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(404, "Student Id is required");
  }

  const student = await Student.findById(id);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  return new ApiResponse(res, 200, "Student fetched successfully", student);
});

//  Update student
export const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("Student Id --> ", id);

  if (!id) {
    throw new ApiError(404, "Student Id is required");
  }

  const {
    student_name,
    email,
    father_name,
    class_code,
    batch,
    DOB,
    specialization,
    // gender,
    // address,
    // isActive,
  } = req.body;

  console.log("Body -->", req.body);

  const student = await Student.findByIdAndUpdate(
    id,
    {
      student_id: id,
      student_name,
      email,
      father_name,
      class_code,
      batch,
      DOB,
      specialization,
      // gender,
      // address,
      // isActive,
    },
    { new: true },
  );

  console.log("Updated Student -->", student);

  return new ApiResponse(res, 200, "Student updated successfully", student);
});

//  Delete student
export const deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log("Student Id --> ", id);

  if (!id) {
    throw new ApiError(404, "Student Id is required");
  }

  const student = await Student.findByIdAndDelete(id);

  console.log("Deleted Student -->", student);

  return new ApiResponse(res, 200, "Student deleted successfully", student);
});
