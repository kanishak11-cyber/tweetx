"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const activeLinkClass = "text-[#ff748d] font-bold";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.email && status === "authenticated") {
      router.push("/login");
    }
  }, [session, router, status]);

  const NavLink = ({ href, label }) => (
    <Link
      href={href}
      className={`${usePathname() === href ? activeLinkClass : ""}`}
    >
      {label}
    </Link>
  );

  return (
    <>
      {session?.user?.email && status === "authenticated" ? (
        <div className="shadow bg-slate-50 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <Link href='/feed' className="text-[#ff748d] text-2xl font-semibold">TweetX</Link>
            </div>
            <div className="flex space-x-4">
              <NavLink href="/feed" label="Feed" />
              <NavLink href="/users" label="Users" />
              <NavLink href="/profile" label="Profile" />
              <NavLink href="/jobs" label="Jobs" />

              <button onClick={() => signOut()}>Logout</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
