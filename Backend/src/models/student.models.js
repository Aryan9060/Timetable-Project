import { model, Schema } from "mongoose";

const studentSchema = new Schema(
  {
    student_id: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    student_name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    gender: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    father_name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    class: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    batch: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    DOB: {
      type: Date,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    specialization: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    address: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Student = model("Student", studentSchema);
