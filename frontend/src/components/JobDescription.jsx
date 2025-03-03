import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {
  const isApplied = false;
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Frontend Developer</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="font-bold text-blue-700" variant="ghost">
              12 Positions
            </Badge>
            <Badge className="font-bold text-[#F83002]" variant="ghost">
              Full time
            </Badge>
            <Badge className="font-bold text-[#7209B7]" variant="ghost">
              24 LPA
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed text-white"
              : "bg-[#7209B7] hover:bg-[#5f32AD] text-white"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          Job Description
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1">
            Role:{" "}
            <span className="font-normal pl-4 text-gray-800">
              Frontend Developer
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location:{" "}
            <span className="font-normal pl-4 text-gray-800">Banglore</span>
          </h1>
          <h1 className="font-bold my-1">
            Description:{" "}
            <span className="font-normal pl-4 text-gray-800">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus, inventore?
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience:{" "}
            <span className="font-normal pl-4 text-gray-800">0-2 years</span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="font-normal pl-4 text-gray-800">24 LPA</span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants:{" "}
            <span className="font-normal pl-4 text-gray-800">4</span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:{" "}
            <span className="font-normal pl-4 text-gray-800">03-03-2025</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
