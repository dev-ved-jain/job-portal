import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

const isResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="data:image/jpeg;base64,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"
                alt="profile"
              ></AvatarImage>
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-gray-500">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div>
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="pb-2">Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length > 0 ? (
              user?.profile?.skills.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
