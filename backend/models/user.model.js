import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String }, // URL of the resume
      resumeOriginalName: { type: String },
      profilePhoto: {
        type: String,
        default: "",
      },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }, // creates relation between user & company
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
