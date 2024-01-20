"use client";
import LoginForm from '@/components/LoginForm'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const LoginPage = () => {
  const router = useRouter()
  const {data:session} = useSession()
  useEffect(() => {
    if(session){
      router.push('/feed')
    }
  }, [session])
  
  return (
    <>
    <LoginForm />
    </>
  )
}

export default LoginPage