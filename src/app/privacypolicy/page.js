"use client";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import PrivacyPolicyDoc from "@/components/sections/PrivacyPolicyDoc";
import MainSidebar from "@/components/widgets/MainSidebar";
import React, { useState } from "react";

const PrivacyPolicy = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <div className={` w-96 z-[2147483647] flex lg:hidden`}>
        <MainSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          toggleSidebar={toggleSidebar}
          content={
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
          }
        />{" "}
      </div>
      <PrivacyPolicyDoc />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
