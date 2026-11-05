"use client";

import React, { useState, useEffect } from "react";
import { Globe, Save } from "lucide-react";

export default function AdminContentPage() {
  const [saved, setSaved] = useState(false);
  const [heroTitle, setHeroTitle] = useState("Unforgettable Celebrations, Crafted with Perfection");
  const [heroSubtitle, setHeroSubtitle] = useState("Sri Lanka's premier event services company specializing in luxury wedding & corporate catering, marquee and furniture rentals, and enchanting event lighting design.");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
          <Globe className="w-6 h-6 text-gold-400" />
          <span>Website Content & CMS</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Update public homepage headings, banners, and promotional messages.
        </p>
      </div>

      <form onSubmit={handleSave} className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 space-y-5 text-xs">
        <div>
          <label className="block text-zinc-300 font-medium mb-1">Homepage Hero Headline</label>
          <input
            type="text"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100"
          />
        </div>

        <div>
          <label className="block text-zinc-300 font-medium mb-1">Homepage Subtitle</label>
          <textarea
            rows={3}
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-100"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-gold-gradient text-zinc-950 font-bold uppercase tracking-wider flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{saved ? "Saved Changes!" : "Save Content"}</span>
        </button>
      </form>
    </div>
  );
}
