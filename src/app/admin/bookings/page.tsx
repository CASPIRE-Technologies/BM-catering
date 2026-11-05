"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency, formatDate, getBookingStatusBadge } from "@/lib/utils";
import {
  CalendarDays,
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  CreditCard,
  Truck,
  RotateCcw,
  AlertTriangle,
  X,
  FileText,
  DollarSign,
} from "lucide-react";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [activeBooking, setActiveBooking] = useState<any | null>(null);
  
  // Payment modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("BANK_TRANSFER");
  const [paymentReference, setPaymentReference] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      let url = "/api/bookings";
      const params = new URLSearchParams();
      if (selectedStatus !== "ALL") params.append("status", selectedStatus);
      if (search) params.append("search", search);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.bookings) {
        setBookings(data.bookings);
        if (activeBooking) {
          const refreshed = data.bookings.find((b: any) => b.id === activeBooking.id);
          if (refreshed) setActiveBooking(refreshed);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [selectedStatus, search]);

  const handleUpdateStatus = async (bookingId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Status update failed");
      } else {
        fetchBookings();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBooking || !paymentAmount) return;

    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: activeBooking.id,
          amount: paymentAmount,
          paymentMethod,
          reference: paymentReference,
        }),
      });

      if (res.ok) {
        setIsPaymentModalOpen(false);
        setPaymentAmount("");
        setPaymentReference("");
        fetchBookings();
      } else {
        const d = await res.json();
        alert(d.error || "Payment record failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDispatchUpdate = async (bookingItemId: string, itemId: string, dispatchStatus: string, returnedQty?: number, damagedQty?: number) => {
    if (!activeBooking) return;
    try {
      const res = await fetch(`/api/bookings/${activeBooking.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemsToUpdate: [
            {
              bookingItemId,
              itemId,
              dispatchStatus,
              returnedQty,
              damagedQuantity: damagedQty,
            },
          ],
        }),
      });
      if (res.ok) {
        fetchBookings();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const statuses = [
    { key: "ALL", label: "All Bookings" },
    { key: "ENQUIRY", label: "Enquiries" },
    { key: "QUOTATION_SENT", label: "Quotation Sent" },
    { key: "CONFIRMED", label: "Confirmed" },
    { key: "IN_PROGRESS", label: "In Progress" },
    { key: "COMPLETED", label: "Completed" },
    { key: "CANCELLED", label: "Cancelled" },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-gold-400" />
            <span>Bookings & Enquiries Management</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Track customer enquiries, approve quotes, log advances, and manage multi-service contracts.
          </p>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {statuses.map((s) => (
          <button
            key={s.key}
            onClick={() => setSelectedStatus(s.key)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              selectedStatus === s.key
                ? "bg-gold-500 text-black shadow-gold font-bold"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-3.5 px-4">Booking No</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Event & Location</th>
                <th className="py-3.5 px-4">Dates</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Total Amount</th>
                <th className="py-3.5 px-4 text-right">Paid</th>
                <th className="py-3.5 px-4 text-right">Balance</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-zinc-500">
                    Loading bookings...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-zinc-500">
                    No bookings found matching filter.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => {
                  const badge = getBookingStatusBadge(b.status);
                  const total = Number(b.totalAmount);
                  const paid = Number(b.paidAmount);
                  const balance = Math.max(0, total - paid);

                  return (
                    <tr key={b.id} className="hover:bg-zinc-800/40 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-gold-300">
                        {b.bookingNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-zinc-200">{b.customer?.name}</p>
                        <p className="text-[11px] text-zinc-400">{b.customer?.phone}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="text-zinc-200">{b.eventType}</p>
                        <p className="text-[11px] text-zinc-500 truncate max-w-xs">{b.eventLocation}</p>
                      </td>
                      <td className="py-3.5 px-4 text-zinc-300">
                        {formatDate(b.startDate)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full font-semibold text-[10px] border ${badge.color}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-serif font-bold text-zinc-100">
                        {formatCurrency(total)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-serif font-semibold text-emerald-400">
                        {formatCurrency(paid)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-serif font-semibold text-amber-400">
                        {formatCurrency(balance)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => setActiveBooking(b)}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-gold-500 hover:text-black text-xs font-semibold text-zinc-300 transition flex items-center gap-1 mx-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal / Drawer */}
      {activeBooking && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">
                  Booking Specification
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                  {activeBooking.bookingNumber} • {activeBooking.eventType}
                </h3>
              </div>
              <button
                onClick={() => setActiveBooking(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Transition Actions */}
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-zinc-400 block">Current Status</span>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold border ${getBookingStatusBadge(activeBooking.status).color}`}>
                  {getBookingStatusBadge(activeBooking.status).label}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-400 mr-2">Change Status:</span>
                {activeBooking.status === "ENQUIRY" && (
                  <button
                    onClick={() => handleUpdateStatus(activeBooking.id, "QUOTATION_SENT")}
                    className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition"
                  >
                    Send Quotation
                  </button>
                )}
                {activeBooking.status !== "CONFIRMED" && (
                  <button
                    onClick={() => handleUpdateStatus(activeBooking.id, "CONFIRMED")}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm Booking</span>
                  </button>
                )}
                {activeBooking.status === "CONFIRMED" && (
                  <button
                    onClick={() => handleUpdateStatus(activeBooking.id, "IN_PROGRESS")}
                    className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Mark In Progress</span>
                  </button>
                )}
                {activeBooking.status === "IN_PROGRESS" && (
                  <button
                    onClick={() => handleUpdateStatus(activeBooking.id, "COMPLETED")}
                    className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Completed</span>
                  </button>
                )}
                {activeBooking.status !== "CANCELLED" && (
                  <button
                    onClick={() => handleUpdateStatus(activeBooking.id, "CANCELLED")}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-rose-600 text-zinc-300 hover:text-white text-xs font-semibold transition"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>

            {/* Customer & Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
                <span className="text-zinc-500 uppercase tracking-wider block font-semibold">Customer Contact</span>
                <p className="text-sm font-bold text-zinc-100">{activeBooking.customer?.name}</p>
                <p className="text-zinc-300">Phone: {activeBooking.customer?.phone}</p>
                <p className="text-zinc-300">WhatsApp: {activeBooking.customer?.whatsapp || "-"}</p>
                <p className="text-zinc-300">Email: {activeBooking.customer?.email || "-"}</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
                <span className="text-zinc-500 uppercase tracking-wider block font-semibold">Event Parameters</span>
                <p className="text-sm font-bold text-zinc-100">{activeBooking.eventType}</p>
                <p className="text-zinc-300">Location: {activeBooking.eventLocation}</p>
                <p className="text-zinc-300">Date Range: {formatDate(activeBooking.startDate)} to {formatDate(activeBooking.endDate)}</p>
                <p className="text-zinc-300">Guests: {activeBooking.guestCount || "Not specified"}</p>
              </div>
            </div>

            {/* Multi-Service Financial Breakdown */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <h4 className="font-serif font-bold text-sm text-gold-300">
                Multi-Service Financial Breakdown
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-500 block">Catering</span>
                  <span className="text-sm font-serif font-bold text-zinc-200 mt-1 block">
                    {formatCurrency(activeBooking.cateringAmount)}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-500 block">Equipment Rentals</span>
                  <span className="text-sm font-serif font-bold text-zinc-200 mt-1 block">
                    {formatCurrency(activeBooking.rentalAmount)}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-500 block">Lighting & Decor</span>
                  <span className="text-sm font-serif font-bold text-zinc-200 mt-1 block">
                    {formatCurrency(activeBooking.lightingAmount)}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-gold-500/30">
                  <span className="text-gold-400 block font-semibold">Combined Total</span>
                  <span className="text-base font-serif font-bold text-gold-300 mt-1 block">
                    {formatCurrency(activeBooking.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Assigned Rental Items & Dispatch Tracking */}
            {activeBooking.items && activeBooking.items.length > 0 && (
              <div className="space-y-3 text-xs">
                <h4 className="font-serif font-bold text-sm text-zinc-100 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold-400" />
                  <span>Assigned Equipment & Return Tracking</span>
                </h4>
                <div className="rounded-xl border border-zinc-800 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-zinc-950 text-zinc-400 text-[10px] uppercase">
                      <tr>
                        <th className="p-3">Equipment</th>
                        <th className="p-3 text-center">Qty</th>
                        <th className="p-3">Dispatch Status</th>
                        <th className="p-3 text-center">Returned Qty</th>
                        <th className="p-3 text-center">Damaged</th>
                        <th className="p-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 bg-zinc-900/40">
                      {activeBooking.items.map((bi: any) => (
                        <tr key={bi.id}>
                          <td className="p-3 font-semibold text-zinc-200">
                            {bi.item?.name}
                          </td>
                          <td className="p-3 text-center font-bold text-gold-300">
                            {bi.quantity}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-medium text-zinc-300">
                              {bi.dispatchStatus}
                            </span>
                          </td>
                          <td className="p-3 text-center text-zinc-300">
                            {bi.returnedQty || 0}
                          </td>
                          <td className="p-3 text-center text-rose-400 font-semibold">
                            {bi.damagedQuantity || 0}
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              {bi.dispatchStatus !== "DISPATCHED" && (
                                <button
                                  onClick={() => handleDispatchUpdate(bi.id, bi.itemId, "DISPATCHED")}
                                  className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] text-zinc-300"
                                >
                                  Dispatch
                                </button>
                              )}
                              {bi.dispatchStatus === "DISPATCHED" && (
                                <button
                                  onClick={() => handleDispatchUpdate(bi.id, bi.itemId, "RETURNED_FULL", bi.quantity, 0)}
                                  className="px-2 py-1 rounded bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50 text-[10px]"
                                >
                                  Mark Full Return
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Payments & Advances Recorded */}
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-zinc-100 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <span>Payments & Advances Ledger</span>
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Total Paid: {formatCurrency(activeBooking.paidAmount)} | Balance Remaining: {formatCurrency(Math.max(0, Number(activeBooking.totalAmount) - Number(activeBooking.paidAmount)))}
                  </p>
                </div>
                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Record Payment</span>
                </button>
              </div>

              {activeBooking.payments && activeBooking.payments.length > 0 ? (
                <div className="space-y-2 text-xs">
                  {activeBooking.payments.map((p: any) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800"
                    >
                      <div>
                        <span className="font-mono text-gold-400 font-bold">{p.paymentNumber}</span>
                        <span className="text-zinc-400 ml-2">via {p.paymentMethod}</span>
                        {p.reference && <span className="text-zinc-500 ml-2">({p.reference})</span>}
                      </div>
                      <div className="font-serif font-bold text-emerald-400">
                        +{formatCurrency(p.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-zinc-500 italic">No payments logged yet for this booking.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {isPaymentModalOpen && activeBooking && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <h4 className="font-serif font-bold text-base text-white">
              Record Advance / Settlement Payment
            </h4>
            <form onSubmit={handleRecordPayment} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 mb-1">Payment Amount (LKR) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  step="0.01"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="e.g. 50000"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200"
                >
                  <option value="BANK_TRANSFER">Bank Transfer (BOC, Commercial, Sampath)</option>
                  <option value="CASH">Cash</option>
                  <option value="CHEQUE">Company Cheque</option>
                  <option value="CREDIT_CARD">Credit / Debit Card</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-300 mb-1">Reference / Slip Number</label>
                <input
                  type="text"
                  value={paymentReference}
                  onChange={(e) => setPaymentReference(e.target.value)}
                  placeholder="e.g. TX-994812"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-800 text-zinc-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold"
                >
                  Save Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
