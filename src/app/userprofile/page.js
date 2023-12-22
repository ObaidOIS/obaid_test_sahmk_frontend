import React from "react";
import dynamic from 'next/dynamic';
// import UserProfileSection from "@/components/sections/UserProfileSection";
const UserProfileSection = dynamic(() => import('@/components/sections/UserProfileSection'), {
  ssr: false
})
const UserProfile = () => {
  
  return (
    <div>
      <UserProfileSection />
    </div>
  );
};

export default UserProfile;
