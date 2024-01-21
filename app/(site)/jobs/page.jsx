"use client";
import JobCard from "@/components/JobCard";

import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const LIMIT = 10;
  const apiUrl = "https://api.crackeddevs.com/api/get-jobs";
  const apiToken = "47cb3287-0112-4a7f-ac9f-36b9e4223039";
  const [jobsData, setJobsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchJobsData = async (page) => {
    try {
      const response = await axios.get(
        `${apiUrl}?limit=${LIMIT}&page=${page}`,
        {
          headers: {
            "api-key": apiToken,
          },
        }
      );

      setJobsData(response.data);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchJobsData(newPage);
  };

  useEffect(() => {
    fetchJobsData(currentPage);
  }, [currentPage]);

  return (
    <>
     
      <div className="flex flex-col gap-4 items-center justify-center w-full min-h-md p-4 md:p-8 mx-auto">
        <div className="overflow-y-auto gap-2 max-h-[80vh] w-full">
          {jobsData.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mr-2 bg-gray-200 rounded-md"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 ml-2 bg-gray-200 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
