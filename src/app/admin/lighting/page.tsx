"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { Sparkles, Plus, CheckCircle2 } from "lucide-react";

export default function AdminLightingPage() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        const cat = data.categories?.find((c: any) => c.slug === "lighting-decorations");
        if (cat) setServices(cat.services || []);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-gold-400" />
          <span>Lighting & Event Decorations</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Stage moving beams, ambient washes, fairy light arrays, and thematic wedding mandaps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s) => (
          <div key={s.id} className="rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-white">{s.name}</h4>
                <p className="text-xs text-zinc-400 mt-1">{s.description}</p>
              </div>
              <span className="font-serif font-bold text-sm text-gold-300 shrink-0">
                {formatCurrency(s.basePrice)}
              </span>
            </div>
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
              <span className="text-emerald-400 font-medium">✓ Active Concept</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
