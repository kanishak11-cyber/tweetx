import Image from "next/image";
import Link from "next/link";
import React from "react";

const JobCard = ({ job }) => {
  const sliceDescription = () => {
    return job.description.slice(0, 250) + "...";
  };

  const initials = (company) => {
    const initials = company
      .split(" ")
      .map((word) => word.slice(0, 2))
      .join("")
      .toUpperCase();
    return initials;
  };

  return (
    <div className="bg-white p-4  border mb-4 rounded-lg">
      <div className="flex gap-2 flex-col md:flex-row items-center">
        <div className="mb-4 md:mb-0 md:mr-4">
          <div className="mb-2">
            {job.image_url ? (
              <img
                src={job.image_url}
                alt={job.company}
                className="h-20 w-20 object-cover mb-2 rounded-md"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-3xl rounded-md">
                {initials(job.company)}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{job.title}</h2>
          <p className="text-gray-600">{job.company}</p>
          <p className="mt-2 text-sm">{sliceDescription()}</p>
          <Link
            href={job.url}
            className="text-blue-500 hover:underline block mt-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
