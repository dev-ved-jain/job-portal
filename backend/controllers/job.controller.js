import { Job } from "../models/job.model.js";

// recruiter will post the job
export const postJob = async (request, response) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      experienceLevel,
      location,
      jobType,
      position,
      companyId,
    } = request.body;
    const userId = request.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !experienceLevel ||
      !location ||
      !jobType ||
      !position ||
      !companyId
    ) {
      return response.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      experienceLevel,
      location,
      jobType,
      position,
      company: companyId,
      created_by: userId,
    });

    return response.status(201).json({
      message: "Job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// user will call this
export const getAllJobs = async (request, response) => {
  try {
    const keyword = request.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    // populate will help to populate entire object not just id
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return response.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return response.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (request, response) => {
  try {
    const jobId = request.params.id;
    const job = await Job.findById(jobId)
      .populate({
        path: "applications",
      })
      .sort({ createdAt: -1 });
    if (!job) {
      return response.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return response.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// recruiter will call this
export const getAdminJobs = async (request, response) => {
  try {
    const adminId = request.id;
    const jobs = await Job.find({ created_by: adminId })
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return response.status(404).json({
        message: "No jobs created.",
        success: false,
      });
    }

    return response.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log();
  }
};
