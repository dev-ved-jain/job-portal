import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/constants";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  let [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const changeFileHandler = (event) => {
    setInput({ ...input, file: event.target.files?.[0] });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // as we are sending file also we will sent it as a file-data
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-7/20 border border-gray-300 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                type="file"
                accept="image/*"
                name="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-5">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2> Please
              wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="text-white bg-[#18181b] hover:bg-[#808080] w-full my-5"
            >
              SignUp
            </Button>
          )}
          <span className="text-sm">
            Already have an account?&nbsp;
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
