"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { isAuthenticated } from "@/components/common/utils";
import { useRouter } from "next/navigation";
const UserProfileSection = dynamic(
  () => import("@/components/sections/UserProfileSection"),
  {
    ssr: false,
  }
);

const UserProfileContainer = () => {
    
  const router = useRouter();
  useEffect(() => {
    const isAuth = isAuthenticated();
    isAuth || router.push("/auth/login");
  }, []);

  return (
    <div>
      <UserProfileSection />
    </div>
  )
}

export default UserProfileContainer
