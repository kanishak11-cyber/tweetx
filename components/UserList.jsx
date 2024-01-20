"use client"
import React, { useState } from 'react'
import { Avatar } from './TweetList';
import { useSession } from 'next-auth/react';

const UserList = ({name, imageUrl}) => {
    const {data:session} = useSession()
    const userId = session?.user?.id;
    console.log(userId)
    const [isFollowedStatus, setIsFollowedStatus] = useState([]);
  const [followingCount, setFollowingCount] = useState([]);
  return (
    <div className="flex flex-col gap-6 mt-6">
      {userData.map((user, index) => (
        <div key={user.uid} className="flex justify-between items-center border-b border-gray-300 pb-10 pt-4 px-8 relative overflow-hidden">
          <div className='flex flex-col sm:flex-row'>
            <div>
              <Avatar name={user.displayName} imageUrl={user.imageUrl} />
            </div>
            <div className="flex flex-col md:mt-4">
              <h4 className="text-lg font-medium text-gray-600">
                {user.displayName}
              </h4>
              <p className="text-gray-400 font-light">Following: {user.followingCount}</p>
            </div>
          </div>
          {user.isFollowedStatus ?
            <button
            className={`text-gray-400 px-6 py-2  rounded-md font-medium`}>
            Following
          </button>:
          <button
          onClick={() => followUser(userId, user.id,index)}
          className={`text-white bg-rose-400 px-6 py-2  rounded-md font-medium`}>
          Follow
        </button>}
        </div>
      ))}
    </div>
  )
}

export default UserList;


export const userData = [
    {
        uid: "1",
        displayName: "John Doe",
        followingCount: 10,
        isFollowedStatus: true,
       
    },
    {
        uid: "2",
        displayName: "John Doe",
        followingCount: 100,
        isFollowedStatus: false,
       
    },
   
]