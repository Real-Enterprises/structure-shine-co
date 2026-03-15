'use client';

import { useState, useMemo } from 'react';
import { PricingConfig, PricingTier } from '@/lib/content';
import {
  toSqFt, formatPKR, UNIT_LABELS, LandUnit
} from '@/lib/units';

type Props = { config: PricingConfig };

export default function CostEstimator({ config }: Props) {
  const [area, setArea]   = useState<string>('');
  const [unit, setUnit]   = useState<LandUnit>('marla');
  const [tier, setTier]   = useState<PricingTier | null>(null);

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

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 max-w-3xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#1A3C5E] mb-2">
          Construction Cost Estimator
        </h3>
        <p className="text-gray-500 text-sm">
          Get an instant estimate for your project in Lahore.
          Prices updated{' '}
          {new Date(config.lastUpdated).toLocaleDateString('en-PK', {
            month: 'long', year: 'numeric'
          })}.
        </p>
      </div>

      {/* Step 1 — Area Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#1A3C5E] mb-2">
          Step 1 — Enter your plot size
        </label>
        <div className="flex gap-3">
          <input
            type="number"
            min="0"
            step="0.5"
            value={area}
            onChange={e => setArea(e.target.value)}
            placeholder="e.g. 10"
            className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#1A3C5E] focus:border-transparent"
          />
          <select
            value={unit}
            onChange={e => setUnit(e.target.value as LandUnit)}
            className="border border-gray-200 rounded-lg px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#1A3C5E] cursor-pointer min-w-[130px]"
          >
            {(Object.keys(UNIT_LABELS) as LandUnit[]).map(u => (
              <option key={u} value={u}>{UNIT_LABELS[u]}</option>
            ))}
          </select>
        </div>
        {sqFt > 0 && (
          <p className="text-xs text-gray-400 mt-2">
            = {sqFt.toLocaleString('en-PK')} sq ft
          </p>
        )}
      </div>

      {/* Step 2 — Construction Type */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-[#1A3C5E] mb-3">
          Step 2 — Select construction type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {config.tiers.map(t => (
            <button
              key={t.label}
              onClick={() => setTier(t)}
              className={`relative text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                tier?.label === t.label
                  ? 'border-[#1A3C5E] bg-[#F2F6FB]'
                  : 'border-gray-200 hover:border-[#1A3C5E]/40'
              }`}
            >
              {t.isPopular && (
                <span className="absolute top-3 right-3 text-xs font-bold bg-[#C8A951] text-white px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
              <p className="font-semibold text-[#1A3C5E] mb-1">
                {t.label}
              </p>
              <p className="text-xs text-gray-500 mb-2 pr-16">
                {t.description}
              </p>
              <p className="text-sm font-bold text-[#C8A951]">
                PKR {t.pricePerSqFt.toLocaleString('en-PK')} / sq ft
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {estimate && sqFt > 0 && tier ? (
        <div className="bg-[#1A3C5E] rounded-xl p-6 text-white mb-6">
          <p className="text-sm text-blue-200 mb-1">
            Estimated cost for {area} {UNIT_LABELS[unit]} —{' '}
            {tier.label}
          </p>
          <p className="text-4xl font-bold mb-1">
            {formatPKR(estimate.mid)}
          </p>
          <p className="text-sm text-blue-200">
            Range: {formatPKR(estimate.min)} — {formatPKR(estimate.max)}
          </p>
          <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-blue-200">Plot Size</p>
              <p className="font-semibold">
                {sqFt.toLocaleString('en-PK')} sq ft
              </p>
            </div>
            <div>
              <p className="text-xs text-blue-200">Rate</p>
              <p className="font-semibold">
                PKR {tier.pricePerSqFt.toLocaleString('en-PK')}/sqft
              </p>
            </div>
            <div>
              <p className="text-xs text-blue-200">Type</p>
              <p className="font-semibold">{tier.label}</p>
            </div>
          </div>
        </div>
      ) : (
        area && !tier ? (
          <div className="bg-[#F2F6FB] rounded-xl p-4 mb-6 text-center text-[#1A3C5E] text-sm">
            ← Now select a construction type above
          </div>
        ) : null
      )}

      {/* CTA */}
      {estimate && (
        <a
          href="/contact"
          className="block w-full text-center bg-[#C8A951] hover:bg-[#b8952f] text-white font-bold py-4 rounded-xl transition-colors duration-200 mb-4"
        >
          Get a Detailed Quote →
        </a>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center leading-relaxed">
        {config.disclaimer}
      </p>
    </div>
  );
}
