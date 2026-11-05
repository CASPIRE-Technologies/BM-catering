"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CreditCard, Plus, CheckCircle2, ArrowDownLeft } from "lucide-react";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/payments")
      .then((res) => res.json())
      .then((data) => {
        if (data.payments) setPayments(data.payments);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalCollected = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-400" />
            <span>Income & Received Payments Ledger</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Cash receipts, bank transfers, advances, and full settlements in Sri Lankan Rupees.
          </p>
        </div>
        <div className="p-3 px-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-right">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Total Payments Received</span>
          <span className="text-xl font-serif font-bold text-emerald-300">
            {formatCurrency(totalCollected)}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden">
        <table className="w-full text-left text-xs text-zinc-300">
          <thead className="bg-zinc-950 border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-400">
            <tr>
              <th className="py-3.5 px-4">Receipt No</th>
              <th className="py-3.5 px-4">Booking Ref</th>
              <th className="py-3.5 px-4">Customer</th>
              <th className="py-3.5 px-4">Method</th>
              <th className="py-3.5 px-4">Reference / Slip</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-zinc-500">
                  Loading payments...
                </td>
              </tr>
            ) : payments.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-zinc-500">
                  No payments logged yet.
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-800/40 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-gold-300">
                    {p.paymentNumber}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-zinc-300">
                    {p.booking?.bookingNumber}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-200">
                    {p.booking?.customer?.name}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-medium text-zinc-300">
                      {p.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400 font-mono text-[11px]">
                    {p.reference || "-"}
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400">
                    {formatDate(p.paymentDate)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-serif font-bold text-emerald-400 text-sm">
                    +{formatCurrency(p.amount)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
