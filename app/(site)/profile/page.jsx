"use client";
import Avatar from "@/components/Avatar";
import ProfileTab from "@/components/ProfileTab";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = session?.user;
  useEffect(() => {
    if (!session?.user?.email && session?.status === "authenticated") {
      router.push("/login");
    }
  }, [session, status, router]);
  return (
    <>
      <div className="max-w-2xl mx-auto my-6 px-5">
      
        <div className="flex flex-col items-center  sm:flex-row">
          <div>
            <Avatar name={user?.name} imageUrl={user?.imageUrl} />
          </div>
          <div className="mt-4 sm:mt-6">
            <h1 className="text-xl text-gray-600 font-semibold text-center sm:text-start">
              {user?.name}
            </h1>
            <div className="flex justify-between sm:justify-start gap-10 text-gray-400 my-6 font-light">
              <p>
                Following:{" "}
                {user?.following?.length > 0 ? user?.following?.length : 0}
              </p>
              <p>
                {" "}
                Followers:{" "}
                {user?.follower?.length > 0 ? user?.follower?.length : 0}
              </p>
              <p>Posts: {user?.tweets?.length} </p>
            </div>
          </div>
        </div>
        <ProfileTab />
      </div>
    </>
  );
};

export default ProfilePage;
