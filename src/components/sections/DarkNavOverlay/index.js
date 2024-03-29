"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import MessageAlert from "@/components/widgets/MessageAlert";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Loader from "@/components/widgets/Loader";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import ShareWebsitePopup from "../ShareWebsitePopup";

const DarkNavOverlay = ({
  children,
  page,
  setPage,
  toggleSidebar,
  successAlert,
  setSuccessAlert,
  deactivateAlert,
  setDeactivateAlert,
  name,
}) => {
  const [openShareTooltip, setOpenShareTooltip] = useState(false);

  return (
    <div>
      {name !== "" ? (
        <div className="min-h-full overflow-clip">
          <div className="bg-gray-800 relative pb-32 bg-custome">
            <Image unoptimized={true} 
              loading="eager"
              src="/assets/images/layer-design.png"
              width={500}
              height={50}
              className=" w-full absolute top-[-30px]"
              alt="Background Image"
              priority
            />
            <header className="w-full relative">
              <div className="flex p-6">
                <div
                  className="lg:hidden flex flex-1 justify-start "
                  onClick={() => toggleSidebar()}
                >
                  <Bars3Icon className="h-6 w-6 text-whiteColor" />
                </div>
                <div className="flex flex-1 justify-end">
                  <div
                    onClick={() => {
                      setOpenShareTooltip(!openShareTooltip);
                    }}
                    className="bg-whiteColor/10 flex justify-center py-1.5 px-2 items-center rounded-lg ml-2 cursor-pointer"
                  >
                    {/* <p className=" text-whiteColor py-1.5 px-2 text-sm">EN</p> */}
                    <Image unoptimized={true} 
                      loading="eager"
                      src="/assets/icons/share.svg"
                      width={16}
                      height={16}
                      alt="Image"
                      priority
                    />
                  </div>
                  <div>
                    <ShareWebsitePopup
                      content={
                        <div className="flex gap-5">
                          <EmailShareButton
                            url={"https://sahmk.sa"}
                            subject={"سهمك | SAHMK"}
                            body="body"
                          >
                            <EmailIcon size={32} round />
                          </EmailShareButton>
                          <TwitterShareButton
                            url={"https://sahmk.sa"}
                            title={"سهمك | SAHMK"}
                          >
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                          <FacebookShareButton
                            url={"https://sahmk.sa"}
                            quote={"سهمك | SAHMK"}
                            hashtag={"#shamk"}
                          >
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>
                          <WhatsappShareButton
                            url={"https://sahmk.sa"}
                            title={"سهمك | SAHMK"}
                            // separator=":: "
                          >
                            <WhatsappIcon size={32} round />
                          </WhatsappShareButton>
                          <PinterestShareButton
                            url={"https://sahmk.sa"}
                            media={"سهمك | SAHMK"}
                          >
                            <PinterestIcon size={32} round />
                          </PinterestShareButton>
                        </div>
                      }
                      openModal={openShareTooltip}
                      setOpenModal={setOpenShareTooltip}
                    />
                  </div>

                  <Link href="/auth/logout">
                    <div className="bg-whiteColor/10 cursor-pointer flex justify-center py-1.5 px-2 items-center rounded-lg">
                      <Image unoptimized={true} 
                        loading="eager"
                        src="/assets/icons/white-logout.svg"
                        width={16}
                        height={16}
                        alt="Image"
                        priority
                      />
                    </div>
                  </Link>
                </div>
              </div>

              {successAlert == true ? (
                <MessageAlert
                  setOpenModal={setSuccessAlert}
                  title="تم التنشيط بنجاح!"
                  alertStyle="fixed top-5 right-2 text-primaryColor"
                  icon={
                    <CheckCircleIcon
                      className="h-5 w-5 text-primaryColor"
                      aria-hidden="true"
                    />
                  }
                />
              ) : (
                ""
              )}

              {deactivateAlert == true ? (
                <MessageAlert
                  title="تم التعطيل بنجاح!"
                  setOpenModal={setDeactivateAlert}
                  alertStyle="fixed top-8 right-4 text-primaryColor"
                  icon={
                    <CheckCircleIcon
                      className="h-5 w-5 text-primaryColor"
                      aria-hidden="true"
                    />
                  }
                />
              ) : (
                ""
              )}

              <div className="lg:container flex items-center pt-8 justify-center mx-auto">
                <Link href="/" className="flex items-center">
                  <Image unoptimized={true} 
                    loading="eager"
                    src="/assets/logos/logo.svg"
                    width={160}
                    height={90}
                    className="cursor-pointer"
                    alt="Logo"
                    priority
                  />
                </Link>
              </div>
              <div
                className={`text-center mb-8 flex justify-center mt-12 text-whiteColor`}
              >
                <div className="max-w-2xl ">
                  <div className="text-2xl mb-5 leading-none">
                    مرحبا بك{" "}
                    <span className="text-primaryColor">
                      {name}
                      {/* {name || "شخص"} */}،
                    </span>{" "}
                    في نظام سهمك
                  </div>
                  <p className=" font-small text-gray-400/60 text-sm ">
                    يمكنك إدارة حسابك والاطلاع على تفاصيل الاسهم وباقتك
                  </p>
                </div>
              </div>
            </header>
          </div>

          {/* <main className={`${page.name !== "userprofile" ? "-mt-32" : "-mt-[5.5rem]"} relative`}> */}
          <main className={`-mt-32 relative`}>
            <div className="mx-auto xl:w-6/12 lg:w-8/12 max-w-7xl pb-12 sm:px-6 lg:px-8">
              <div className="rounded-lg text-sm px-3 py-6 sm:px-6">
                {page.name !== "userprofile" ? (
                  <div
                    onClick={() => {
                      page.name == "payment"
                        ? setPage({ name: "my-account", value: "باقتي وحسابي" })
                        : setPage({
                            name: "userprofile",
                            value: "الخدمات الرئىيسية",
                          });
                    }}
                    className=" flex items-center self-center align-middle gap-4 cursor-pointer text-whiteColor font-medium mb-5 leading-none"
                  >
                    <Image unoptimized={true} 
                      loading="eager"
                      src="/assets/icons/white-right-arrow.svg"
                      width={16}
                      height={16}
                      className=""
                      alt="img"
                      priority
                    />{" "}
                    عودة للقائمة
                  </div>
                ) : (
                  ""
                )}
                <div className="text-1xl text-whiteColor font-medium mb-5 leading-none">
                  {page.value}
                </div>
                {children}
              </div>
            </div>
          </main>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DarkNavOverlay;
