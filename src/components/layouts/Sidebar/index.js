"use client";
import React, { useState, Fragment, useEffect } from "react";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { isAuthenticated } from "@/components/common/utils";

const Sidebar = ({ toggleSidebar }) => {
  const navigation = [
    { name: "الرئيسية", href: "/#", current: true },
    // { name: "الخدمات", href: "/#services", current: false },
    { name: "الخدمات", href: "/#features", current: false },
    { name: "اشتراكاتنا", href: "/#pricing", current: false },
    { name: "من نحن", href: "/#try-us", current: false },
    { name: "تواصل معنا", href: "/contactus#", current: false },
  ];

  const [isAuthenticate, setIsAuthenticate] = useState(false);
  useEffect(() => {
    setIsAuthenticate(isAuthenticated());
  }, []);

  const handleNavigationClick = (e, href) => {
    e.preventDefault();
  
    // Add your logic to run before navigating, for example, closing the sidebar
    toggleSidebar();
  
    // Now navigate to the specified href
    window.location.href = href;
  };

  return (
    <Dialog.Panel className="fixed inset-y-0 pointer-events-auto right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
      <div className="flex items-center justify-between">
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Sahmak_sa</span>
          <Image
            loading="eager"
            className="h-10 w-auto"
            src="/assets/logos/logo.svg"
            width={30}
            height={30}
            alt="img"
            priority
          />
        </Link>
      </div>
      <div className="mt-6 flow-root">
        <div className="-my-6 divide-y divide-gray-500/10">
          <div className="space-y-2 py-6">
            {navigation.map((item) => (
              <div key={item.name}
              onClick={(e) => handleNavigationClick(e, item.href)}
              className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                {item.name}
              </div>
            ))}
          </div>
          {isAuthenticate != null && isAuthenticate == false ? (
            <div className="py-6 ">
              <div className="items-center h-full mt-6 flex">
                <Link
                  href={isAuthenticate == true ? "/userprofile" : "/auth/login"}
                  onClick={(e) => {
                    if (
                      isAuthenticate == true &&
                      localStorage.getItem("page")
                    ) {
                      localStorage.removeItem("page");
                    }
                  }}
                  className="hover:text-gray-900 font-normal"
                >
                  تسجل الدخول{" "}
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Dialog.Panel>
  );
};

export default Sidebar;
