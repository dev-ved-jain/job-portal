import { JOB_API_END_POINT } from "@/constants";
import { setAllAdminJobs, setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setAllAdminJobs(response.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminJobs();
  }, []);
};

export default useGetAllAdminJobs;
