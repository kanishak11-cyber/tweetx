"use client";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { useSession } from "next-auth/react";
import axios from "axios";

const UserList = ({ name, imageUrl }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  console.log(userId);
  const [userData, setUserData] = useState([]);
  const [isFollowedStatus, setIsFollowedStatus] = useState([]);
  const [followingCount, setFollowingCount] = useState([]);
  const [followedCount, setFollowedCount] = useState([]);
  const getAllUsers = async () => {
    try {
      const response = await axios.get("/api/register");
      const data = await response.data;
      console.log(data[0]);
      setUserData(data);
      setFollowingCount(data.following);
      setFollowedCount(data.follower);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting users");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="flex flex-col gap-6 mt-6">
      {userData.map((user, index) => (
        <div
          key={user.id}
          className="flex justify-between items-center border-b border-gray-300 pb-10 pt-4 px-8 relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row">
            <div>
              <Avatar name={user.name} imageUrl={user.imageUrl} />
            </div>
            <div className="flex flex-col md:mt-4">
              <h4 className="text-lg font-medium text-gray-600">{user.name}</h4>
              <p className="text-gray-400 font-light">
                Following: {user.following > 0 ? user.following : 0}
              </p>
            </div>
          </div>
          {user.isFollowedStatus ? (
            <button
              className={`text-gray-400 px-6 py-2  rounded-md font-medium`}
            >
              Following
            </button>
          ) : (
            <button
              onClick={() => followUser(userId, user.id, index)}
              className={`text-white bg-rose-400 px-6 py-2  rounded-md font-medium`}
            >
              Follow
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserList;
