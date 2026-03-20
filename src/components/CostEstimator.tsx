"use client";

import { useState, useMemo } from "react";
import { PricingConfig, PricingTier } from "@/lib/content";
import { toSqFt, formatPKR, UNIT_LABELS, LandUnit } from "@/lib/units";

type Props = { config: PricingConfig };

const unitOptions = Object.keys(UNIT_LABELS) as LandUnit[];

export default function CostEstimator({ config }: Props) {
  const [area, setArea] = useState<string>("");
  const [unit, setUnit] = useState<LandUnit>("marla");
  const [tier, setTier] = useState<PricingTier | null>(null);

  const sqFt = useMemo(() => {
    const val = parseFloat(area);
    if (!val || val <= 0) return 0;
    return toSqFt(val, unit);
  }, [area, unit]);

  const estimate = useMemo(() => {
    if (!tier || sqFt <= 0) return null;
    const min = sqFt * tier.pricePerSqFt * 0.9;
    const max = sqFt * tier.pricePerSqFt * 1.1;
    return { min, mid: sqFt * tier.pricePerSqFt, max };
  }, [sqFt, tier]);

  const updatedLabel = new Date(config.lastUpdated).toLocaleDateString(
    "en-PK",
    {
      month: "long",
      year: "numeric",
    },
  );

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
      <div className="bg-gradient-to-br from-slate-50 via-white to-amber-50/40 px-6 py-6 md:px-10 md:py-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-[#1A3C5E]/10 bg-[#1A3C5E]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#1A3C5E]">
              Instant estimate
            </span>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Construction Cost Estimator
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
              Get an instant estimate for your project in Lahore. Prices updated{" "}
              {updatedLabel}.
            </p>
          </div>

          <div className="hidden grid-cols-2 gap-3 sm:grid-cols-3 md:grid md:w-auto">
            <div className="rounded-2xl border border-white/70 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Step 1
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Plot size
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Step 2
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Build quality
              </p>
            </div>
            <div className="col-span-2 rounded-2xl border border-white/70 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm sm:col-span-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Result
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Live estimate
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5 px-6 py-6 md:px-10 md:py-8">
        <section className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 md:p-6">
          <label className="mb-3 block text-sm font-semibold text-[#1A3C5E]">
            Step 1 — Enter your plot size
          </label>
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_10rem]">
            <input
              type="number"
              min="0"
              step="0.5"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g. 10"
              className="min-w-0 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-lg shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#1A3C5E]"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as LandUnit)}
              className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 text-base shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#1A3C5E]"
            >
              {unitOptions.map((u) => (
                <option key={u} value={u}>
                  {UNIT_LABELS[u]}
                </option>
              ))}
            </select>
          </div>
          {sqFt > 0 && (
            <p className="mt-2 text-xs text-slate-500">
              Approx. {sqFt.toLocaleString("en-PK")} sq ft
            </p>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-4 md:p-6">
          <label className="mb-3 block text-sm font-semibold text-[#1A3C5E]">
            Step 2 — Select construction type
          </label>
          <div className="grid gap-3 md:grid-cols-3">
            {config.tiers.map((t) => (
              <button
                key={t.label}
                type="button"
                onClick={() => setTier(t)}
                className={`group relative w-full rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1A3C5E] ${
                  tier?.label === t.label
                    ? "border-[#1A3C5E] bg-[#F2F6FB] shadow-sm"
                    : "border-gray-200 bg-white hover:border-[#1A3C5E]/35"
                }`}
              >
                {t.isPopular && (
                  <span className="absolute right-3 top-3 rounded-full bg-[#C8A951] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-sm">
                    Popular
                  </span>
                )}
                <p className="pr-16 text-base font-semibold text-[#1A3C5E]">
                  {t.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {t.description}
                </p>
                <p className="mt-4 text-sm font-bold text-[#C8A951]">
                  PKR {t.pricePerSqFt.toLocaleString("en-PK")} / sq ft
                </p>
              </button>
            ))}
          </div>
        </section>

        {estimate && sqFt > 0 && tier ? (
          <section className="overflow-hidden rounded-2xl bg-[#1A3C5E] p-5 text-white md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm text-blue-100/90">
                  Estimated cost for {area} {UNIT_LABELS[unit]} — {tier.label}
                </p>
                <p className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                  {formatPKR(estimate.mid)}
                </p>
                <p className="mt-1 text-sm text-blue-100/90">
                  Range: {formatPKR(estimate.min)} — {formatPKR(estimate.max)}
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-blue-50">
                Final pricing depends on design, materials, and site conditions.
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-center">
                <p className="text-xs uppercase tracking-[0.12em] text-blue-100/75">
                  Plot size
                </p>
                <p className="mt-1 font-semibold">
                  {sqFt.toLocaleString("en-PK")} sq ft
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-center">
                <p className="text-xs uppercase tracking-[0.12em] text-blue-100/75">
                  Rate
                </p>
                <p className="mt-1 font-semibold">
                  PKR {tier.pricePerSqFt.toLocaleString("en-PK")} / sq ft
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-center">
                <p className="text-xs uppercase tracking-[0.12em] text-blue-100/75">
                  Type
                </p>
                <p className="mt-1 font-semibold">{tier.label}</p>
              </div>
            </div>
          </section>
        ) : area && !tier ? (
          <div className="rounded-2xl border border-[#1A3C5E]/10 bg-[#F2F6FB] px-4 py-4 text-center text-sm text-[#1A3C5E]">
            Now select a construction type above.
          </div>
        ) : null}

        {estimate && (
          <a
            href="/contact"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-[#C8A951] px-5 py-4 text-base font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-[#b8952f] focus:outline-none focus:ring-2 focus:ring-[#1A3C5E] focus:ring-offset-2"
          >
            Get a Detailed Quote →
          </a>
        )}

        <p className="text-center text-xs leading-relaxed text-slate-500">
          {config.disclaimer}
        </p>
      </div>
    </div>
  );
}
