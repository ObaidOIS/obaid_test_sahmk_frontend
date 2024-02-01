"use client";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import FeatureSection from "@/components/sections/FeatureSection";
import HeroSection from "@/components/sections/HeroSection";
import PricingSection from "@/components/sections/PricingSection";
import ServiceSection from "@/components/sections/ServiceSection";
import TryMeSection from "@/components/sections/TryMeSection";
import MainSidebar from "@/components/widgets/MainSidebar";
import React, { useState } from "react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <div className={`w-96 z-[2147483647] flex lg:hidden`}>
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
        />
        {/* <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
      </div>
      <HeroSection />
      <FeatureSection />
      <ServiceSection />
      <PricingSection />
      <TryMeSection />
      <Footer />
    </>
  );
}
