import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
function Profile() {
  const user=useSelector((state)=>state.user)
  useEffect(()=>{
    console.log(user)
  },[])
  return (
    <div>
      <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Profile</h1>
    <Outlet/>
    </div>
  );
}

export default Profile