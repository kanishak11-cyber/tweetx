"use client";
import React, { useEffect, useState } from "react";
import { FaRegComment, FaWindowClose } from "react-icons/fa";
import TweetList from "./TweetList";
import { RiCloseCircleLine } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DNA } from "react-loader-spinner";
const Feedx = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const authorId = session?.user?.id;
  const [isWriteBoxOpen, setIsWriteBoxOpen] = useState(false);
  const[feedData, setFeedData] = useState([])
  const handleWriteButtonClick = () => {
    setIsWriteBoxOpen(true);
  };

  const getFeed = async () => {
    try {
      const response = await axios.get('/api/getAllTweets');
      const data = await response.data;
      console.log(data[0].author.name)
      setFeedData(data);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  const postTweet = async (text) => {
    console.log("Posting tweet", text);
    try {
      const response = await axios.post("/api/create-tweet", {
        text,
        authorId,
      });

      if (response.status === 200) {
        console.log("Tweet posted successfully");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error posting tweet");
    }
  };

  const handleTweet = async (text) => {
    setIsWriteBoxOpen(false);

    try {
      await postTweet(text);
      toast.success("Tweet posted successfully");
      getFeed();
    } catch (error) {
      console.error(error);
      toast.error("Error posting tweet");
    }
  };
  useEffect(() => {
    if (session?.user?.email && status === "authenticated") {
      router.push("/feed");
    } else {
      router.push("/login");
    }
  }, [session, router, status]);

  if (status === "loading") {
    return (
      <div className="grid min-h-screen mx-auto justify-center items-center">
        <DNA
          visible={true}
          height="180"
          width="180"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center mx-auto -pb-20">
        <div className="my-10 w-full max-w-screen-md ">
          <button
            onClick={handleWriteButtonClick}
            className="text-white px-5 py-3 rounded-xl bg-[#ff748d] "
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
          <TweetList feedData={feedData}  />
        </div>
      </div>
    </>
  );
};

export default Feedx;
// export {session, status};

const WriteDialog = ({ onClose, onTweet }) => {
  const [writeText, setWriteText] = useState("");

  const handleTweet = () => {
    onTweet(writeText);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white p-4 rounded-md shadow-md ">
        {/* Write box content goes here */}
        <div className="flex items-center justify-between py-3">
          <div className="font-semibold text-gray-700">
            What&apos;s on your mind?
          </div>
          <button onClick={onClose}>
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
