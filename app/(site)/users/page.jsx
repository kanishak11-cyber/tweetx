
"use client";
import UserList from '@/components/UserList'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'


const UserPage = () => {
  const {data:session} = useSession()
const router = useRouter()
  React.useEffect(() => {
    if(!session){
      router.push('/login')
    }
  }, [session, router])
  return (
    <>
    <div className='max-w-2xl mx-auto my-6 px-5'>
      <UserList />
    </div>
    
    </>
  )
}

export default UserPage