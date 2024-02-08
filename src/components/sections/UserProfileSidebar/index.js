import ArrowList from "@/components/widgets/ArrowList";
import IconButtonUI from "@/components/widgets/IconButtonUI";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserProfileSidebar = ({ toggleSidebar, list, handlePageChange }) => {
  return (
    <div>
      <div className="px-4 sm:px-6">
        <div className=" pb-6 mt-4">
          <Link href="/">
          <Image
            loading="eager"
            src="/assets/logos/logo.svg"
            width={150}
            height={150}
            alt="img"
            className="ms-4"
            priority
          />
          </Link>
          <ul className="my-10 space-y-5 text-sm font-semibold">
            {list.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  handlePageChange(item.page);
                  toggleSidebar();
                }}
                className=""
              >
                <div key={index}>
                  <ArrowList
                    title={item.title}
                    desc={item.desc}
                    icon={item.icon}
                    bgColor={item.bgColor}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t space-y-4 py-5 ">
            <IconButtonUI
              button="EN"
              icon={
                <Image
                  loading="eager"
                  src="/assets/icons/globe.svg"
                  width={20}
                  height={20}
                  alt="img"
                  className="me-5"
                  priority
                />
              }
              buttonStyle="text-darkColor hover:bg-whiteColor hover:border-whiteColor hover:text-darkGreyColor bg-whiteColor !shadow-none"
            />
            <div>
              <Link href="/auth/logout">
                <IconButtonUI
                  button="تسجيل الخروج"
                  icon={
                    <Image
                      loading="eager"
                      src="/assets/icons/logout.svg"
                      width={20}
                      height={20}
                      alt="img"
                      className="me-5"
                      priority
                    />
                  }
                  buttonStyle="text-darkColor hover:bg-whiteColor hover:border-whiteColor hover:text-darkGreyColor bg-whiteColor !shadow-none"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSidebar;
