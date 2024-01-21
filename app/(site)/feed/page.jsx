"use client";
import Feedx from '@/components/Feedx';
import {  useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


const FeedPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  // console.log(session, status)
  useEffect(() => {
    if (session?.user?.email && status === 'authenticated') {
      router.push('/feed');
    } else {
      router.push('/login');
    }
  }, [session, router, status]);
  return (
    <>
      <Feedx/>
    </>
  )
}

export default FeedPage;


