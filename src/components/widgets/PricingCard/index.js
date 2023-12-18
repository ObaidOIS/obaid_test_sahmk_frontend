"use client";
import React from "react";
import PrimaryButton from "../PrimaryButton";
import OutlineButton from "../OutlineButton";
import MainBadge from "../MainBadge";
import { CheckIcon } from "@heroicons/react/20/solid";

const PricingCard = ({ tier, frequencies, frequency, setFrequency }) => {

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div>
      <div
        key={tier.id}
        className={classNames(
          tier.mostPopular
            ? "bg-whiteColor dark:bg-white/5 ring-2 ring-accentColor"
            : "ring-1 bg-whiteColor dark:bg-white/5 ring-darkColor/10 dark:ring-white/10",
          "rounded-3xl p-8 xl:p-10"
        )}
      >
        <div className="flex items-center justify-between gap-x-4">
          <h3
            id={tier.id}
            className="text-lg font-semibold leading-8 text-accentColor dark:text-white"
          >
            {tier.name}
          </h3>
          {tier.mostPopular ? (
            <p className="rounded-full bg-accentColor px-2.5 py-1 text-xs font-semibold leading-5 text-white">
              {tier.badge}
            </p>
          ) : null}
        </div>
        <p className="mt-4 text-sm leading-6 text-darkColor/50 dark:text-gray-300">
          {tier.description}
        </p>
        <p className="mt-6 flex items-baseline gap-x-1">
          <span className="text-4xl font-bold tracking-tight text-darkColor dark:text-white">
            {tier.price[frequency.value]}
          </span>
          <span className="text-sm font-semibold leading-6 text-darkColor/50 dark:text-gray-300">
            {frequency.priceSuffix}
          </span>
        </p>
        <a
          href={tier.href}
          aria-describedby={tier.id}
          className={classNames(
            tier.mostPopular
              ? "bg-accentColor text-white shadow-sm hover:bg-accentColor/90 dark:focus-visible:outline-accentColor"
              : "bg-whiteColor border-2 border-accentColor dark:bg-white/10 text-accentColor hover:bg-darkColor/5 dark:hover:bg-white/20 focus-visible:outline-white",
            "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          )}
        >
          {tier.button}
        </a>
        <ul
          role="list"
          className="mt-8 space-y-3 text-sm leading-6 text-darkColor dark:text-gray-300 xl:mt-10"
        >
          {tier.features.map((feature) => (
            <li key={feature} className="flex gap-x-3">
              <CheckIcon
                className="h-6 w-5 flex-none text-accentColor"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
