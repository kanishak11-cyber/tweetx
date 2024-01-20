"use client"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [activeLink, setActiveLink] = useState('feed');
  const router = useRouter();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    if (session?.user?.email && status === 'authenticated') {
      router.push('/feed');
    } else {
      router.push('/login');
    }
  }, [session, router, status]);

    return (
      <div className='shadow bg-slate-50 p-4'>
        <div className='container mx-auto flex justify-between items-center'>
          <div>
            <h1 className='text-[#ff748d] text-2xl font-semibold'>TweetX</h1>
          </div>
          <div className='flex space-x-4'>
            <Link href='/feed'>
              <div
                id='feed'
                className={`${
                  activeLink === 'feed' ? 'text-[#ff748d] font-bold' : ''
                } hover:underline`}
                onClick={() => setActiveLink('feed')}
              >
                Feed
              </div>
            </Link>
            <Link href='/users'>
              <div
                className={`${
                  activeLink === 'users' ? 'text-[#ff748d] font-bold' : ''
                } hover:underline`}
                onClick={() => setActiveLink('users')}
              >
                Users
              </div>
            </Link>
            <Link href='/profile'>
              <div
                className={`${
                  activeLink === 'profile' ? 'text-[#ff748d] font-bold' : ''
                } hover:underline`}
                onClick={() => setActiveLink('profile')}
              >
                Profile
              </div>
            </Link>
            <button onClick={()=> signOut()}>
Logout
            </button>
          </div>
        </div>
      </div>
    );
};

export default Navbar;
