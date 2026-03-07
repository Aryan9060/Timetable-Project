import { Faculty } from "../models/faculty.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//  Register new faculty
export const registerFaculty = asyncHandler(async (req, res) => {
  const {
    faculty_id,
    faculty_name,
    email,
    phone,
    specialization,
    higher_education,
    years_of_Experience,
    gender,
    date_of_joining,
    date_of_birth,
    address,
    isActive,
  } = req.body;

  console.table("Body -->", req.body);

  if (
    !faculty_id ||
    !faculty_name ||
    !email ||
    !phone ||
    !specialization ||
    !higher_education ||
    !years_of_Experience ||
    !gender ||
    !date_of_joining ||
    !date_of_birth ||
    !address
    // !isActive
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // to check faculty_id and email is already exist or not;
  if (faculty_id || email) {
    const existedFaculty = await Faculty.findOne({
      $or: [{ faculty_id }, { email }],
    });

    if (existedFaculty) {
      throw new ApiError(
        409,
        "Faculty with email or faculty_id already exists",
      );
    }
  }

  //save to the database
  const faculty = await Faculty.create({
    faculty_id,
    faculty_name,
    email,
    phone,
    specialization,
    higher_education,
    years_of_Experience,
    gender,
    date_of_joining,
    date_of_birth,
    address,
    isActive,
  });

  console.log("Faculty -->", faculty);

  return new ApiResponse(res, 201, "Faculty registered successfully", faculty);
});

// Get all Faculty
export const getAllFaculties = asyncHandler(async (req, res) => {
  const faculties = await Faculty.find();

  if (!faculties || faculties.length === 0) {
    throw new ApiError(404, "No faculties found");
  }

  console.table("Faculties -->", faculties);

  return new ApiResponse(res, 200, "Faculties fetched successfully", faculties);
});

// Get faculty by ID
export const getFacultyById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log("Faculty Id -->", id);

  if (!id) {
    throw new ApiError(404, "Faculty Id is required");
  }

  const faculty = await Faculty.findById(id);

  console.table("Faculty -->", faculty);

  if (!faculty) {
    throw new ApiError(404, "Faculty not found");
  }

  return new ApiResponse(res, 200, "Faculty fetched successfully", faculty);
});

// Update faculty
export const updateFaculty = asyncHandler(async (req, res) => {
  const { id } = req.params;

  conaole.log("Faculty Id -->", id);

  if (!id) {
    throw new ApiError(404, "Faculty Id is required");
  }

  const {
    faculty_name,
    email,
    phone,
    specialization,
    higher_education,
    years_of_Experience,
    gender,
    date_of_joining,
    date_of_birth,
    address,
    isActive,
  } = req.body;

  console.table("Body -->", req.body);

  const faculty = await Faculty.findByIdAndUpdate(
    id,
    {
      faculty_name,
      email,
      phone,
      specialization,
      higher_education,
      years_of_Experience,
      gender,
      date_of_joining,
      date_of_birth,
      address,
      isActive,
    },
    { new: true },
  );

  console.table("Updated Faculty -->", faculty);

  if (!faculty) {
    throw new ApiError(404, "Faculty not found");
  }

  return new ApiResponse(res, 200, "Faculty updated successfully", faculty);
});

// Delete faculty
export const deleteFaculty = asyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log("Faculty ID -->", id);

  if (!id) {
    throw new ApiError(404, "Faculty Id is required");
  }

  const faculty = await Faculty.findByIdAndDelete(id);

  if (!faculty) {
    throw new ApiError(404, "Faculty not found");
  }

  return new ApiResponse(res, 200, "Faculty deleted successfully", faculty);
});
