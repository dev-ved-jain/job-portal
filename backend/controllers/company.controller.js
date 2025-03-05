import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (request, response) => {
  try {
    const { companyName } = request.body;
    if (!companyName) {
      return response.status(400).json({
        message: "Company Name is required.",
        success: false,
      });
    }

    // check if company with entered name exists
    let company = await Company.findOne({ name: companyName });

    if (company) {
      return response.status(400).json({
        message: "Company with given name already exists.",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: request.id,
    });

    return response.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (request, response) => {
  try {
    const userId = request.id; // this is logged in users id
    const companies = await Company.find({ userId });
    if (!companies) {
      return response.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }

    return response.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (request, response) => {
  try {
    const companyId = request.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return response.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return response.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (request, response) => {
  try {
    const { name, description, website, location } = request.body;

    const file = request.file;
    //setup cloudinary
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const updatedData = { name, description, website, location, logo };
    const company = await Company.findByIdAndUpdate(
      request.params.id,
      updatedData,
      { new: true }
    );

    if (!company) {
      return response.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return response.status(200).json({
      message: "Company information updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
