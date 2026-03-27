import { getPricingConfig } from "@/lib/content";
import CostEstimator from "@/components/CostEstimator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Construction Cost Estimator",
  description:
    "Estimate your construction cost in Lahore instantly. " +
    "Get a free estimate for residential, commercial, grey " +
    "structure and turnkey projects.",
};

export default function EstimatePage() {
  const config = getPricingConfig();
  if (!config.isEnabled) return null;

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold text-[#1A3C5E] mb-4">
          Construction Cost Estimator
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Get an instant ballpark estimate for your construction project in
          Lahore. Enter your plot size and select your desired finish level.
        </p>
      </div>
      <CostEstimator config={config} />
    </main>
  );
}
