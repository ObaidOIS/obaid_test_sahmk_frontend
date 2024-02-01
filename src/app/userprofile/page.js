import React from "react";
import UserProfileContainer from "@/components/sections/UserProfileContainer";

const UserProfile = () => {
  return (
    <div>
      <UserProfileContainer />
    </div>
  );
};

export default UserProfile;

export function generateViewport({ params }) {
  return {
    themeColor: '#09202D',
  }
}

