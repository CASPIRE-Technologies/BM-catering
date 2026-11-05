"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Users, Phone, MessageCircle, Mail, MapPin } from "lucide-react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        if (data.bookings) {
          // Extract unique customers
          const map: Record<string, any> = {};
          for (const b of data.bookings) {
            if (b.customer) {
              if (!map[b.customer.id]) {
                map[b.customer.id] = {
                  ...b.customer,
                  totalSpend: 0,
                  bookingCount: 0,
                };
              }
              map[b.customer.id].bookingCount += 1;
              map[b.customer.id].totalSpend += Number(b.totalAmount || 0);
            }
          }
          setCustomers(Object.values(map));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-gold-400" />
          <span>Customer Relationship Directory (CRM)</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Registered corporate clients, wedding couples, and event coordinators.
        </p>
      </div>

      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden">
        <table className="w-full text-left text-xs text-zinc-300">
          <thead className="bg-zinc-950 border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-400">
            <tr>
              <th className="py-3.5 px-4">Customer Name</th>
              <th className="py-3.5 px-4">Contact Phone</th>
              <th className="py-3.5 px-4">WhatsApp</th>
              <th className="py-3.5 px-4">Email</th>
              <th className="py-3.5 px-4 text-center">Bookings</th>
              <th className="py-3.5 px-4 text-right">Lifetime Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-zinc-500">
                  Loading customers...
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-zinc-500">
                  No customers recorded yet.
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr key={c.id} className="hover:bg-zinc-800/40 transition">
                  <td className="py-3.5 px-4 font-bold text-zinc-100">
                    {c.name}
                  </td>
                  <td className="py-3.5 px-4">{c.phone}</td>
                  <td className="py-3.5 px-4">
                    <a
                      href={`https://wa.me/${c.whatsapp || c.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>{c.whatsapp || c.phone}</span>
                    </a>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400">{c.email || "-"}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-gold-300">
                    {c.bookingCount}
                  </td>
                  <td className="py-3.5 px-4 text-right font-serif font-bold text-emerald-400">
                    {formatCurrency(c.totalSpend)}
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
