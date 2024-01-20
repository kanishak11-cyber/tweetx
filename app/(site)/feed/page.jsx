"use client";
import Feedx from '@/components/Feedx';
import { useSession } from 'next-auth/react';
import React from 'react'


const FeedPage = () => {
  const { data: session, status } = useSession();
  console.log(session, status)
  return (
    <>
      <Feedx/>
    </>
  )
}

export default FeedPage;