import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (request, response) => {
  try {
    const { fullname, email, phoneNumber, password, role } = request.body;

    // if any field is empty return missing message
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return response.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });

    const file = request.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    // if user with given email exists registration not allowd
    if (user) {
      return response.status(400).json({
        message: "User already exists with given email.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // create the user in db
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    // send success message
    return response.status(200).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (request, response) => {
  try {
    const { email, password, role } = request.body;

    // if any field is empty return missing message
    if (!email || !password || !role) {
      return response.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    // if user doesn't exists with given email return wrong email message
    if (!user) {
      return response.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // check if password match with password in database
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return response.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // check for role if its correct or not
    if (role !== user.role) {
      return response.status(400).json({
        message: "Account doesn't exists with current role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return response
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (request, response) => {
  try {
    return response.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (request, response) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = request.body;

    const file = request.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = request.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return response.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; // this saves cloudinary url
      user.profile.resumeOriginalName = file.originalname;
    }

    // update in database
    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    response.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
