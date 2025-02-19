import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, ArrowRight } from "lucide-react";

interface PricingPlan {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  popular?: boolean;
  savePercentage?: number;
  saveAmount?: number;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Pro",
    priceMonthly: 129,
    priceYearly: 1290,
    popular: true,
    savePercentage: 17,
    saveAmount: 258,
    features: [
      "700 included minutes",
      "$0.16 per extra minute",
      "5 assistants",
      "5 outbound campaigns",
      "10 calls in parallel",
      "5 cloned voices",
      "10,000 no-code automate platform runs monthly"
    ]
  },
  {
    name: "Agency",
    priceMonthly: 249,
    priceYearly: 2490,
    savePercentage: 17,
    saveAmount: 498,
    features: [
      "1,700 included minutes",
      "$0.09 per extra minute",
      "Unlimited assistants",
      "Unlimited outbound campaigns",
      "500 calls in parallel",
      "10 cloned voices",
      "100,000 no-code automate platform runs monthly"
    ]
  },
  {
    name: "Whitelabel",
    priceMonthly: 419,
    priceYearly: 4190,
    savePercentage: 17,
    saveAmount: 838,
    features: [
      "3,500 included minutes",
      "$0.09 per extra minute",
      "Unlimited assistants",
      "Unlimited outbound campaigns",
      "1,000 calls in parallel",
      "Unlimited cloned voices",
      "Unlimited no-code automate platform runs monthly",
      "White label (your own branding)"
    ]
  }
];

export default function Billing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Billing</h1>
        <p className="text-gray-600 dark:text-gray-400">
          You are on the Free plan. Upgrade to a paid plan to get more credits and features.
        </p>
      </div>

      <div className="flex justify-end items-center gap-2 text-sm">
        <span className={isYearly ? "text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-white"}>Monthly</span>
        <Switch
          checked={isYearly}
          onCheckedChange={setIsYearly}
          className="data-[state=checked]:bg-blue-500"
        />
        <span className={!isYearly ? "text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-white"}>Yearly</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-xl border ${
              plan.popular
                ? "border-blue-500/50 bg-blue-500/5 dark:border-blue-500/50 dark:bg-blue-500/5"
                : "border-gray-200 bg-white/50 dark:border-gray-800 dark:bg-gray-900/50"
            } p-6 backdrop-blur-sm`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-6 px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                POPULAR
              </div>
            )}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
              <div className="space-y-1">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${isYearly ? plan.priceYearly : plan.priceMonthly}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
                {isYearly && plan.savePercentage && (
                  <div className="text-green-500 text-sm">
                    Save {plan.savePercentage}% - ${plan.saveAmount} off
                  </div>
                )}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                    <Check className="h-5 w-5 text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                Purchase
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
