import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = (props) => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">{props?.job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{props?.job?.title}</h1>
        <p className="text-sm text-gray-600">{props?.job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="font-bold text-blue-700" variant="ghost">
          {props?.job?.position} Positions
        </Badge>
        <Badge className="font-bold text-[#F83002]" variant="ghost">
          {props?.job?.jobType}
        </Badge>
        <Badge className="font-bold text-[#7209B7]" variant="ghost">
          {props?.job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
