"use client";

import React, { useState } from "react";
import { Settings, Save, Building2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-gold-400" />
          <span>System & Business Profile Settings</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Configure official company details, quotation bank accounts, and invoice footers.
        </p>
      </div>

      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 space-y-5 text-xs">
        <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
          <Building2 className="w-4 h-4 text-gold-400" />
          <span>Official Company Profile</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-zinc-400 mb-1">Business Name</label>
            <input
              type="text"
              defaultValue="B.M Catering & Event Services"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200"
            />
          </div>
          <div>
            <label className="block text-zinc-400 mb-1">Hotline / WhatsApp</label>
            <input
              type="text"
              defaultValue="+94 77 123 4567"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200"
            />
          </div>
          <div>
            <label className="block text-zinc-400 mb-1">Official Email</label>
            <input
              type="email"
              defaultValue="info@bmcatering.lk"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200"
            />
          </div>
          <div>
            <label className="block text-zinc-400 mb-1">Default Currency</label>
            <input
              type="text"
              disabled
              value="Sri Lankan Rupee (LKR)"
              className="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-500 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800">
          <h4 className="font-semibold text-zinc-200 mb-2">Quotation Bank Transfer Details</h4>
          <textarea
            rows={3}
            defaultValue={`Bank of Ceylon (BOC) - Peliyagoda Branch
Account Name: B.M Catering (Pvt) Ltd
Account No: 008123456789`}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-300 font-mono text-xs"
          />
        </div>

        <button
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}
          className="px-6 py-2.5 rounded-xl bg-gold-gradient text-zinc-950 font-bold uppercase tracking-wider flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{saved ? "Settings Saved!" : "Save Settings"}</span>
        </button>
      </div>
    </div>
  );
}
