"use client"

import { Tab } from '@headlessui/react';
import { Fragment } from "react";
import { BsPostcard } from "react-icons/bs";
import { HiUser, HiUserGroup } from "react-icons/hi";
import TweetList from './TweetList';
import { useSession } from 'next-auth/react';
import UserList from './UserList';
const ProfileTab = () => {
  const {data:session} = useSession()
  const user = session?.user;
  const posts = user?.tweets;
  // console.log(posts)
  const followers = user?.follower;
  const following = user?.following;

  return (
    <div>
         <div className=" mt-12">
        <Tab.Group>
          {/* Nav Tabs */}
          <Tab.List className="flex items-center border-t border-gray-200/75 text-sm">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`-mb-px gap-3 flex grow items-center justify-center space-x-2 border-t-2 px-3 py-3 font-medium focus:outline-none  md:px-5 ${
                    selected
                      ? "border-gray-700 text-gray-600"
                      : "border-transparent text-gray-400 "
                      
                  }hover:btext-gray-700`}
                >
                 <BsPostcard className='text-2xl'/> Posts
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`-mb-px gap-3 flex grow items-center justify-center space-x-2 border-t-2 px-3 py-3 font-medium focus:outline-none  md:px-5 ${
                    selected
                      ? "border-gray-700 text-gray-600"
                      : "border-transparent text-gray-400 "
                  }
                  hover:text-gray-700` }
                >
                 <HiUser className='text-2xl' /> Followers
                </button>
              )}
            </Tab>{" "}
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`-mb-px gap-3 flex grow items-center justify-center space-x-2 border-t-2 px-3 py-3 font-medium focus:outline-none  md:px-5 ${
                    selected
                      ? "border-gray-700 text-gray-600"
                      : "border-transparent text-gray-400 "
                  } hover:text-gray-700`}
                >
                  <HiUserGroup className='text-2xl' />Following
                </button>
              )}
            </Tab>
          </Tab.List>
          {/* END Nav Tabs */}

          {/* Tab Content */}
          <Tab.Panels className="py-6">
            <Tab.Panel>
              <TweetList feedData={posts} />
            </Tab.Panel>
            <Tab.Panel>
              <UserList userData={followers} />
            </Tab.Panel>
            <Tab.Panel>
              <UserList userData={following}/>
            </Tab.Panel>
          </Tab.Panels>
          {/* END Tab Content */}
        </Tab.Group>
      </div>
    </div>
  )
}

export default ProfileTab