"use client";
import React, { useState } from "react";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigation = [
    { name: "الرئيسية", href: "#features", current: true },
    { name: "الخدمات", href: "#services", current: false },
    { name: "اشتراكاتنا", href: "#pricing", current: false },
    { name: "من نحن", href: "#try-us", current: false },
    { name: "تواصل معنا", href: "#", current: false },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Dialog
      as="div"
      className="lg:hidden"
      open={isSidebarOpen}
      onClose={toggleSidebar}
    >
      <div className="fixed inset-0 z-50" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Sahmak_sa</span>
            <Image
              className="h-10 w-auto"
              src="/assets/logos/logo.svg"
              width={30}
              height={30}
              alt=""
            />
          </a>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => toggleSidebar()}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="py-6">
              <div className="items-center h-full mt-6 flex">
                <Link href="/auth/login" className="font-semibold hover:text-gray-900">
                  {" "}
                  تسجل الدخول{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default Sidebar;
