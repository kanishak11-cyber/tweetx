import Navbar from '@/components/Navbar'
import UserList from '@/components/UserList'
import React from 'react'


const UserPage = () => {

  return (
    <>
    <Navbar />
    <div className='max-w-2xl mx-auto my-6 px-5'>
      <UserList />
    </div>
    
    </>
  )
}

export default UserPage