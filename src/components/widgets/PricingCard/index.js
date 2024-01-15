"use client";
import React from "react";
import PrimaryButton from "../PrimaryButton";
import OutlineButton from "../OutlineButton";
import MainBadge from "../MainBadge";
import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import {pricing} from "@/components/common/pricing";  
import { useRouter } from "next/navigation";

const PricingCard = ({ tier, frequencies, frequency, setFrequency }) => {

  const router = useRouter();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const handlePlanSelection = (subscriptionType) => {
    router.push(`${tier.href}?subscription=${subscriptionType}&duration=${JSON.stringify(frequency)}`);
  };
  
  return (
    <div>
      <div
        key={tier.id}
        className={classNames(
          tier.mostPopular
            ? "bg-whiteColor dark:bg-white/5 ring-2 ring-primaryColor"
            : "ring-1 bg-whiteColor dark:bg-white/5 ring-darkColor/10 dark:ring-white/10",
          "rounded-3xl p-8 xl:p-10"
        )}
      >
        <div className="flex items-center justify-between gap-x-4">
          <h3
            id={tier.id}
            className="text-lg font-semibold leading-8 text-primaryColor dark:text-white"
          >
            {tier.name}
          </h3>
          {tier.mostPopular ? (
            <p className="rounded-full bg-primaryColor px-2.5 py-1 text-xs font-semibold leading-5 text-white">
              {tier.badge}
            </p>
          ) : null}
        </div>
        <p className="mt-4 text-sm leading-6 text-darkColor/50 dark:text-gray-300">
          {tier.description}
        </p>
        <p className="mt-6 flex items-baseline gap-x-1">
          <span className="text-4xl font-bold tracking-tight text-darkColor dark:text-white">
          {tier.card == "free" ? pricing.pricing.free[frequency.value] : tier.card == "premium" ? pricing.pricing.premium[frequency?.value] : tier.card == "advance" ? pricing.pricing.companies[frequency?.value] : "" }
          </span>
          <span className="text-sm font-semibold leading-6 text-darkColor/50 dark:text-gray-300">
            {frequency.priceSuffix}
          </span>
        </p>
        <div 
          aria-describedby={tier.id}
          onClick={() => handlePlanSelection(tier.name)}
          className={classNames(
            tier.mostPopular
              ? "bg-primaryColor text-white shadow-sm hover:bg-primaryColor/90 dark:focus-visible:outline-primaryColor"
              : "bg-whiteColor border-2 border-primaryColor dark:bg-white/10 text-primaryColor hover:bg-darkColor/5 dark:hover:bg-white/20 focus-visible:outline-white",
            "mt-6 cursor-pointer block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          )}
        >
          {tier.button}
        </div>
        <ul
          role="list"
          className="mt-8 space-y-3 text-sm leading-6 dark:text-gray-300 xl:mt-10"
        >
          {tier.features[frequency.value].map((item, index) => (
            <li key={index} className="flex gap-x-3">
              <CheckIcon
                className={`${item.isAvaiable == true ? "text-primaryColor" : "text-mediumGreyColor" } h-6 w-5 flex-none`}
                aria-hidden="true"
              />
              <p className={`${item.isAvaiable == true ? "text-darkColor" : "text-mediumGreyColor"}`}>
              {item.feature}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
