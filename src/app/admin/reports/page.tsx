"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { FileBarChart, Download, Printer } from "lucide-react";

export default function AdminReportsPage() {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const handleExportCSV = () => {
    if (!data) return;
    const summary = data.summary;
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Financial Measure,Amount (LKR)\n" +
      `Total Booking Value,${summary.totalBookingValue}\n` +
      `Invoiced Recognized Revenue,${summary.invoicedRevenue}\n` +
      `Catering Revenue,${summary.cateringRevenue}\n` +
      `Equipment Rentals Revenue,${summary.rentalRevenue}\n` +
      `Lighting & Decor Revenue,${summary.lightingRevenue}\n` +
      `Total Received Payments,${summary.totalReceivedPayments}\n` +
      `Total Operating Expenses,${summary.totalExpenses}\n` +
      `Net Cash Surplus,${summary.netProfit}\n` +
      `Outstanding Pending Receivables,${summary.outstandingPayments}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BM_Catering_Financial_Report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!data) return <p className="text-xs text-zinc-500 py-12 text-center">Loading reports...</p>;

  const { summary } = data;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
            <FileBarChart className="w-6 h-6 text-gold-400" />
            <span>Financial Statements & Audit Reports</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Detailed separation of Booking Value, Invoiced Revenue, Cash Received, and Net Profit.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 transition flex items-center gap-2 text-xs font-semibold"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold transition flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Financial Statement Table */}
      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 space-y-6">
        <h3 className="font-serif text-lg font-bold text-white">
          Business Financial Position Summary
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex justify-between py-2 border-b border-zinc-800">
            <span className="text-zinc-400">Total Contract Booking Value:</span>
            <span className="font-serif font-bold text-zinc-100">{formatCurrency(summary.totalBookingValue)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-zinc-800">
            <span className="text-zinc-400">Recognized Invoiced Revenue:</span>
            <span className="font-serif font-bold text-gold-300">{formatCurrency(summary.invoicedRevenue)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-zinc-800 pl-4">
            <span className="text-zinc-500">• Catering Department</span>
            <span className="font-serif text-zinc-300">{formatCurrency(summary.cateringRevenue)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-zinc-800 pl-4">
            <span className="text-zinc-500">• Equipment Rentals Department</span>
            <span className="font-serif text-zinc-300">{formatCurrency(summary.rentalRevenue)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-zinc-800 pl-4">
            <span className="text-zinc-500">• Lighting & Decor Department</span>
            <span className="font-serif text-zinc-300">{formatCurrency(summary.lightingRevenue)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-zinc-800">
            <span className="text-zinc-400">Actual Cash / Bank Receipts:</span>
            <span className="font-serif font-bold text-emerald-400">{formatCurrency(summary.totalReceivedPayments)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-zinc-800">
            <span className="text-zinc-400">Total Operational Expenses:</span>
            <span className="font-serif font-bold text-rose-400">-{formatCurrency(summary.totalExpenses)}</span>
          </div>
          <div className="flex justify-between py-3 border-t-2 border-zinc-700 bg-zinc-950 p-4 rounded-xl text-sm">
            <span className="font-bold text-white">Net Operating Cash Surplus:</span>
            <span className="font-serif font-bold text-cyan-300 text-base">{formatCurrency(summary.netProfit)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
