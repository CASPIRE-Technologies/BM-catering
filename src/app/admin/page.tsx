"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency, formatDate, getBookingStatusBadge } from "@/lib/utils";
import {
  DollarSign,
  CalendarCheck,
  TrendingUp,
  AlertTriangle,
  Boxes,
  Sparkles,
  UtensilsCrossed,
  Tent,
  Clock,
  ArrowRight,
  Eye,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analytics");
      const json = await res.json();
      if (!res.ok || json.error || !json.summary) {
        throw new Error(json.error || "Analytics are temporarily unavailable.");
      }
      setData(json);
    } catch (err) {
      console.error("Failed to load analytics", err);
      setError(err instanceof Error ? err.message : "Analytics are temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] space-y-3 flex-col">
        <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-zinc-400 tracking-wider">Loading operations analytics...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-center space-y-4">
          <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto" />
          <h1 className="text-lg font-semibold text-white">Admin dashboard unavailable</h1>
          <p className="text-sm text-zinc-400">
            {error || "The dashboard could not load its data."} Check the database connection and try again.
          </p>
          <button
            onClick={fetchAnalytics}
            className="px-4 py-2 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs uppercase tracking-wider"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const { summary, upcomingEvents, lowStockItems, revenueTrend, categoryDistribution } = data;

  const COLORS = ["#A6B9BE", "#D8D2C6", "#38BDF8"];

  return (
    <div className="space-y-8">
      {/* Page Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
            Operations & Revenue Overview
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time performance metrics, cash flow ledger, and active bookings across Sri Lanka.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchAnalytics}
            className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition flex items-center gap-2 text-xs font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <Link
            href="/admin/bookings"
            className="px-4 py-2.5 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold transition"
          >
            Manage Bookings
          </Link>
        </div>
      </div>

      {/* 1. TOP METRIC CARDS (Financials in LKR) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Invoiced Revenue */}
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Invoiced Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-white">
              {formatCurrency(summary.invoicedRevenue)}
            </h3>
            <p className="text-[11px] text-zinc-500 mt-1">
              From confirmed & completed events
            </p>
          </div>
        </div>

        {/* Received Payments */}
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Received Payments</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-emerald-300">
              {formatCurrency(summary.totalReceivedPayments)}
            </h3>
            <p className="text-[11px] text-zinc-500 mt-1">
              Bank transfers, advances & cheques
            </p>
          </div>
        </div>

        {/* Outstanding Balances */}
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Pending Balances</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-amber-300">
              {formatCurrency(summary.outstandingPayments)}
            </h3>
            <p className="text-[11px] text-zinc-500 mt-1">
              Remaining receivables on confirmed jobs
            </p>
          </div>
        </div>

        {/* Net Profit Estimate */}
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Net Cash Surplus</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-cyan-300">
              {formatCurrency(summary.netProfit)}
            </h3>
            <p className="text-[11px] text-zinc-500 mt-1">
              Cash received minus operational expenses
            </p>
          </div>
        </div>
      </div>

      {/* 2. THREE SERVICE REVENUE BREAKDOWN PILLARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 uppercase tracking-wider block">Catering Revenue</span>
            <h4 className="text-xl font-serif font-bold text-white mt-0.5">
              {formatCurrency(summary.cateringRevenue)}
            </h4>
          </div>
        </div>

        <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-champagne-500/10 text-champagne-300 flex items-center justify-center shrink-0">
            <Tent className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 uppercase tracking-wider block">Equipment Rentals</span>
            <h4 className="text-xl font-serif font-bold text-white mt-0.5">
              {formatCurrency(summary.rentalRevenue)}
            </h4>
          </div>
        </div>

        <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 uppercase tracking-wider block">Lighting & Decor</span>
            <h4 className="text-xl font-serif font-bold text-white mt-0.5">
              {formatCurrency(summary.lightingRevenue)}
            </h4>
          </div>
        </div>
      </div>

      {/* 3. CHARTS SECTION (Recharts Area & Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Monthly Revenue Trend Area Chart */}
        <div className="lg:col-span-2 rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Revenue Trend & Growth (LKR)
              </h3>
              <p className="text-xs text-zinc-400">Monthly booking recognized revenue</p>
            </div>
            <span className="text-xs font-mono bg-zinc-800 text-gold-300 px-2.5 py-1 rounded-md">
              Past 6 Months
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="themeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A6B9BE" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#A6B9BE" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="month" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#71717a"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `Rs.${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    borderColor: "#3f3f46",
                    borderRadius: "12px",
                    color: "#D8D2C6",
                    fontSize: "12px",
                  }}
                  formatter={(val: any) => [formatCurrency(val), "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#A6B9BE"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#themeGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Donut Chart */}
        <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-white">
              Revenue by Service
            </h3>
            <p className="text-xs text-zinc-400">Contribution split by department</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    borderColor: "#3f3f46",
                    borderRadius: "12px",
                    color: "#D8D2C6",
                    fontSize: "12px",
                  }}
                  formatter={(val: any) => [formatCurrency(val), "Revenue"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-zinc-800">
            {categoryDistribution.map((c: any, idx: number) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <span className="text-zinc-300 font-medium">{c.name}</span>
                </div>
                <span className="font-serif font-bold text-zinc-100">
                  {c.percentage}% ({formatCurrency(c.value)})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. UPCOMING EVENTS & INVENTORY HEALTH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Events (2 Cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Upcoming Events Schedule
              </h3>
              <p className="text-xs text-zinc-400">Next confirmed & in-progress operations</p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs text-gold-400 hover:text-gold-300 font-semibold"
            >
              View All Bookings →
            </Link>
          </div>

          {upcomingEvents.length === 0 ? (
            <p className="text-xs text-zinc-500 py-6 text-center">No upcoming events scheduled</p>
          ) : (
            <div className="space-y-3">
              {upcomingEvents.map((event: any) => {
                const badge = getBookingStatusBadge(event.status);
                return (
                  <div
                    key={event.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-gold-500/30 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-gold-300">
                          {event.bookingNumber}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-zinc-100">
                        {event.eventType} • {event.customer.name}
                      </h4>
                      <p className="text-xs text-zinc-400">
                        📍 {event.eventLocation}
                      </p>
                    </div>

                    <div className="sm:text-right space-y-1 shrink-0">
                      <p className="text-xs font-medium text-zinc-300">
                        📅 {formatDate(event.startDate)}
                      </p>
                      <p className="text-sm font-serif font-bold text-gold-300">
                        {formatCurrency(event.totalAmount)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Inventory Alerts & Operations Counts */}
        <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Boxes className="w-5 h-5 text-gold-400" />
              <span>Inventory Status</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 block">Total Units</span>
                <span className="text-xl font-bold font-serif text-zinc-200 mt-1 block">
                  {summary.totalInventoryCount}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 block">Ready to Rent</span>
                <span className="text-xl font-bold font-serif text-emerald-400 mt-1 block">
                  {summary.availableInventoryCount}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 block">In Maintenance</span>
                <span className="text-xl font-bold font-serif text-amber-400 mt-1 block">
                  {summary.totalMaintenanceCount}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 block">Damaged/Loss</span>
                <span className="text-xl font-bold font-serif text-rose-400 mt-1 block">
                  {summary.totalDamagedCount}
                </span>
              </div>
            </div>

            {/* Low stock notice */}
            {lowStockItems.length > 0 && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Equipment Attention Needed:</span>
                </div>
                <ul className="list-disc list-inside text-[11px] text-amber-200/80">
                  {lowStockItems.slice(0, 3).map((item: any) => (
                    <li key={item.id}>
                      {item.name}: only {item.available} units remaining
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Link
            href="/admin/inventory"
            className="w-full py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-gold-400 hover:text-gold-300 font-bold text-xs uppercase tracking-wider text-center transition"
          >
            Manage Warehouse Stock →
          </Link>
        </div>
      </div>
    </div>
  );
}
