"use client";
import React, { useState } from "react";
import { FaRegComment, FaWindowClose } from "react-icons/fa";
import Navbar from "./Navbar";
import { RiCloseCircleLine } from "react-icons/ri";
const Feedx = () => {
  const [isWriteBoxOpen, setIsWriteBoxOpen] = useState(false);

  const handleWriteButtonClick = () => {
    setIsWriteBoxOpen(true);
  };

  const handleTweet = (text) => {
    // Handle the tweet logic here, e.g., send it to the server
    console.log("Tweet:", text);
    setIsWriteBoxOpen(false);
  };

  return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center mx-auto">
        <div className="my-10 w-full max-w-screen-md ">
          <button
            onClick={handleWriteButtonClick}
            className="text-white px-5 py-3 rounded-xl bg-[#ff748d] absolute top-[10vh]"
          >
            Write
          </button>

          {/* Write Box */}
          {isWriteBoxOpen && (
            <WriteDialog
              onClose={() => setIsWriteBoxOpen(false)}
              onTweet={handleTweet}
            />
          )}

          {/* Tweet card */}
          <div className="flex flex-row items-center w-full border rounded-xl shadow-md mt-4">
            <div className="flex space-x-4 p-4 flex-1">
              <div className="w-20 h-20 bg-white border border-black rounded-full overflow-hidden"></div>
              <div className="flex-1">
                <div className="flex space-x-2">
                  <div className="font-semibold">Name</div>
                  <div className="text-gray-500">@username</div>
                  <div className="text-gray-500">•</div>
                  <div className="text-gray-500">1h</div>
                </div>
                <div className="text-gray-500">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Repudiandae porro tempora commodi rem minus asperiores amet id
                  illum voluptas incidunt, aperiam quaerat dolorum iste, quas
                  enim, minima voluptatibus. Illum, eveniet.
                </div>
              </div>
            </div>
            <div className="w-10 h-10 overflow-hidden">
              {/* Semi-circle */}
              <div className="bg-[#ff748d] h-10 w-10 ml-5 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedx;

const WriteDialog = ({ onClose, onTweet }) => {
  const [writeText, setWriteText] = useState("");

  const handleTweet = () => {
    onTweet(writeText);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-md shadow-md ">
        {/* Write box content goes here */}
        <div className="flex items-center justify-between py-3">
          <div className="font-semibold text-gray-700">What&apos;s on your mind?</div>
          <button onClick={onClose} >
            <RiCloseCircleLine className="text-2xl text-red-500" />
          </button>
        </div>
        <textarea
          className="w-full border p-2 rounded "
          placeholder="Write your thoughts...."
          value={writeText}
          onChange={(e) => setWriteText(e.target.value)}
        ></textarea>
        <button
          onClick={handleTweet}
          className="bg-[#ff748d] text-white px-4 py-2 mt-2 rounded"
        >
          Tweet
        </button>
      </div>
    </div>
  );
};
