"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { UtensilsCrossed, Plus, CheckCircle2, Calculator, Users } from "lucide-react";

export default function AdminCateringPage() {
  const [guestCount, setGuestCount] = useState<number>(200);
  const [selectedRate, setSelectedRate] = useState<number>(3850);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        const cat = data.categories?.find((c: any) => c.slug === "catering");
        if (cat) setServices(cat.services || []);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
          <UtensilsCrossed className="w-6 h-6 text-gold-400" />
          <span>Catering Management & Menu Pricing</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Configure catering packages, menu inclusions, and calculate banquet guest quotes.
        </p>
      </div>

      {/* Guest Count Quote Estimator Calculator */}
      <div className="rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-gold-500/30 p-6 sm:p-8 space-y-4">
        <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
          <Calculator className="w-5 h-5 text-gold-400" />
          <span>Quick Catering Banquet Estimator</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Guest Count</label>
            <input
              type="number"
              min="10"
              max="5000"
              value={guestCount}
              onChange={(e) => setGuestCount(parseInt(e.target.value, 10) || 0)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Per Person Rate (LKR)</label>
            <input
              type="number"
              min="500"
              step="50"
              value={selectedRate}
              onChange={(e) => setSelectedRate(parseFloat(e.target.value) || 0)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100"
            />
          </div>
          <div className="p-4 rounded-xl bg-zinc-950 border border-gold-500/40 flex flex-col justify-center">
            <span className="text-[10px] uppercase font-bold text-zinc-400">Estimated Banquet Revenue</span>
            <span className="text-2xl font-serif font-bold text-gold-300 mt-0.5">
              {formatCurrency(guestCount * selectedRate)}
            </span>
          </div>
        </div>
      </div>

      {/* Catering Packages List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s) => (
          <div key={s.id} className="rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-white">{s.name}</h4>
                <p className="text-xs text-zinc-400 mt-1">{s.description}</p>
              </div>
              <span className="font-serif font-bold text-sm text-gold-300 shrink-0">
                {formatCurrency(s.basePrice)} / pax
              </span>
            </div>
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
              <span className="text-emerald-400 font-medium">✓ Active Menu Package</span>
              <button
                onClick={() => setSelectedRate(Number(s.basePrice))}
                className="text-gold-400 hover:underline font-semibold"
              >
                Use in Estimator →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
