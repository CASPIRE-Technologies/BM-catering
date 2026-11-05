"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatCurrency, formatDate, getBookingStatusBadge } from "@/lib/utils";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  UtensilsCrossed,
  Tent,
  Sparkles,
  Truck,
  Eye,
} from "lucide-react";

export default function AdminCalendarPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"MONTH" | "LIST">("MONTH");
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        if (data.bookings) {
          setBookings(data.bookings.filter((b: any) => b.status !== "CANCELLED"));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Get events on a specific day
  const getEventsForDay = (day: number) => {
    const targetDate = new Date(year, month, day);
    const dateStr = targetDate.toISOString().split("T")[0];

    return bookings.filter((b) => {
      const bStart = new Date(b.startDate).toISOString().split("T")[0];
      const bEnd = new Date(b.endDate).toISOString().split("T")[0];
      return dateStr >= bStart && dateStr <= bEnd;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-gold-400" />
            <span>Event & Equipment Dispatch Calendar</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Visual schedule of catering banquets, marquee setups, and lighting installations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 text-xs font-semibold">
            <button
              onClick={() => setViewMode("MONTH")}
              className={`px-3 py-1.5 rounded-lg transition ${
                viewMode === "MONTH" ? "bg-gold-500 text-black font-bold" : "text-zinc-400 hover:text-white"
              }`}
            >
              Monthly Grid
            </button>
            <button
              onClick={() => setViewMode("LIST")}
              className={`px-3 py-1.5 rounded-lg transition ${
                viewMode === "LIST" ? "bg-gold-500 text-black font-bold" : "text-zinc-400 hover:text-white"
              }`}
            >
              List Schedule
            </button>
          </div>
        </div>
      </div>

      {viewMode === "MONTH" ? (
        <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 space-y-4">
          {/* Calendar Month Navigation Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-white">
              {monthNames[month]} {year}
            </h3>
            <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 rounded-xl p-1">
              <button
                onClick={prevMonth}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-2.5 py-1 text-xs font-semibold text-zinc-300 hover:text-white"
              >
                Today
              </button>
              <button
                onClick={nextMonth}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500 py-2 border-b border-zinc-800">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty offset days */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-24 rounded-xl bg-zinc-950/30 border border-zinc-900/50 p-2" />
            ))}

            {/* Days of current month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDay(day);
              const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === month &&
                new Date().getFullYear() === year;

              return (
                <div
                  key={`day-${day}`}
                  className={`min-h-24 rounded-xl border p-2 flex flex-col justify-between transition ${
                    isToday
                      ? "bg-gold-500/10 border-gold-500/50"
                      : "bg-zinc-950/80 border-zinc-800/80 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-mono font-bold ${isToday ? "text-gold-400" : "text-zinc-400"}`}>
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    )}
                  </div>

                  <div className="space-y-1 mt-1 overflow-hidden">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        onClick={() => setSelectedEvent(ev)}
                        className="truncate text-[10px] font-medium px-1.5 py-0.5 rounded bg-zinc-900 hover:bg-gold-500 hover:text-black border border-zinc-800 text-zinc-200 cursor-pointer transition"
                      >
                        {ev.eventType}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[9px] text-zinc-500 font-medium block">
                        +{dayEvents.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* List Schedule View */
        <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-white">Chronological Event Timeline</h3>
          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedEvent(b)}
                className="flex items-center justify-between p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-gold-500/40 cursor-pointer transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-gold-300">{b.bookingNumber}</span>
                    <span className="text-xs font-semibold text-zinc-100">• {b.eventType}</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    📍 {b.eventLocation} ({b.customer?.name})
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-zinc-300">{formatDate(b.startDate)}</p>
                  <p className="text-xs font-serif font-bold text-gold-400">{formatCurrency(b.totalAmount)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest font-bold">
                  {selectedEvent.bookingNumber}
                </span>
                <h4 className="font-serif text-lg font-bold text-white mt-0.5">
                  {selectedEvent.eventType}
                </h4>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-zinc-500 block">Customer</span>
                <p className="font-semibold text-zinc-100">{selectedEvent.customer?.name} ({selectedEvent.customer?.phone})</p>
              </div>

              <div>
                <span className="text-zinc-500 block">Venue Location</span>
                <p className="text-zinc-300">{selectedEvent.eventLocation}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <div>
                  <span className="text-zinc-500 block">Dispatch / Setup</span>
                  <p className="font-semibold text-zinc-200">{formatDate(selectedEvent.startDate)}</p>
                </div>
                <div>
                  <span className="text-zinc-500 block">Return / Dismantle</span>
                  <p className="font-semibold text-zinc-200">{formatDate(selectedEvent.endDate)}</p>
                </div>
              </div>

              <div>
                <span className="text-zinc-500 block">Total Booking Value</span>
                <p className="font-serif text-base font-bold text-gold-300">
                  {formatCurrency(selectedEvent.totalAmount)}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Link
                href="/admin/bookings"
                className="px-4 py-2 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs uppercase tracking-wider"
              >
                Open in Bookings →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
