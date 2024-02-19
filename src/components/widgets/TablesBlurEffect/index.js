import Image from "next/image";
import React from "react";
import PrimaryButton from "../PrimaryButton";

const TableBlurEffect = ({handlePageChange, page}) => {
    
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0 });
      };

  return (
    <div className="absolute inset-0 rounded-b-3xl bg-cover bg-[url('/assets/images/free-table-bg.png')] bg-white/40 backdrop-blur-md">
      <div className="flex justify-center text-whiteColor ">
        <div className=" w-48 flex gap-2 px-4 py-3 rounded-b-3xl text-center bg-gradient-to-br from-lightAmberColor to-darkAmberColor/60">
          <Image
            unoptimized={true}
            loading="eager"
            src="/assets/icons/lock.svg"
            width={16}
            height={16}
            alt="Image"
            priority
          />
          <p className="text-sm">قم بترقية باقتك لتطلع على تفاصيل السهم</p>
        </div>
      </div>
      <div className="flex justify-center mt-14">
        <Image
          unoptimized={true}
          loading="eager"
          src="/assets/icons/free-table-icon.svg"
          width={320}
          height={320}
          alt="Image"
          priority
        />
      </div>
      <div className="flex justify-center">
        <PrimaryButton
          button="الترقية الآن"
          buttonStyle="py-2 !px-10 rounded-xl bg-mediumGreenColor !font-normal justify-center mt-3"
          onClick={()=>{handlePageChange(page); handleScrollToTop()}}
        />
      </div>
    </div>
  );
};

export default TableBlurEffect;
