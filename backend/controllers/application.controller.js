import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (request, response) => {
  try {
    const jobId = request.params.id;
    const userId = request.id; // logged in user id
    if (!jobId) {
      return response.status(404).json({
        message: "Job Id is required",
        success: false,
      });
    }

    // check if user has already applied for this job or not
    // this can be done from frontend also by disabling the apply button
    // but for safer side we are handling this corner case
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return response.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return response.status(400).json({
        message: "Job doesn't exists",
        success: false,
      });
    }

    // create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // in job model we have this array which holds all the applications
    job.applications.push(newApplication._id);
    await job.save();
    return response.status(200).json({
      message: "Job applied successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (request, response) => {
  try {
    const userId = request.id;
    const applications = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!applications) {
      return response.status(404).json({
        message: "No applications found.",
        success: false,
      });
    }
    return response.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// recruiter will call this
export const getApplicants = async (request, response) => {
  try {
    const jobId = request.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return response.status(404).json({
        message: "Job not found.",
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

export const updateStatus = async (request, response) => {
  try {
    const { status } = request.body;
    const applicationId = request.params.id;
    if (!status) {
      return response.status(400).json({
        message: "Status is required.",
        success: false,
      });
    }

    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return response.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();
    return response.status(200).json({
      message: "status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
