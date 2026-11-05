"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import {
  Boxes,
  Plus,
  Search,
  Filter,
  Wrench,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Trash2,
  Edit,
  Clock,
  X,
} from "lucide-react";

export default function AdminInventoryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  
  // Date check simulator
  const [checkStartDate, setCheckStartDate] = useState("");
  const [checkEndDate, setCheckEndDate] = useState("");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    categoryId: "",
    totalQuantity: "",
    rentalPrice: "",
    pricingUnit: "PER_DAY",
    condition: "EXCELLENT",
    description: "",
    imageUrl: "/images/real/PHOTO-2026-11-04-21-37-29.jpg",
  });

  const fetchItems = async (start?: string, end?: string) => {
    setLoading(true);
    try {
      let url = "/api/inventory";
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (selectedCategory !== "ALL") params.append("category", selectedCategory);
      if (start && end) {
        params.append("startDate", start);
        params.append("endDate", end);
      }
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.items) {
        setItems(data.items);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(checkStartDate, checkEndDate);
  }, [search, selectedCategory]);

  const handleDateFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchItems(checkStartDate, checkEndDate);
  };

  const handleClearDates = () => {
    setCheckStartDate("");
    setCheckEndDate("");
    fetchItems();
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setForm({
          name: "",
          categoryId: "",
          totalQuantity: "",
          rentalPrice: "",
          pricingUnit: "PER_DAY",
          condition: "EXCELLENT",
          description: "",
          imageUrl: "/images/real/PHOTO-2026-11-04-21-37-29.jpg",
        });
        fetchItems(checkStartDate, checkEndDate);
      } else {
        const d = await res.json();
        alert(d.error || "Failed to add item");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
            <Boxes className="w-6 h-6 text-gold-400" />
            <span>Rental Inventory & Warehouse Management</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Track equipment stock, live date-range reservations, damaged units, and maintenance records.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold transition flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Equipment</span>
        </button>
      </div>

      {/* Date Range Availability Simulator Bar */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-5">
        <form onSubmit={handleDateFilter} className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-gold-400 shrink-0">
            <Calendar className="w-4 h-4" />
            <span>Simulate Booking Dates:</span>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <input
              type="date"
              value={checkStartDate}
              onChange={(e) => setCheckStartDate(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-gold-400"
            />
            <input
              type="date"
              value={checkEndDate}
              onChange={(e) => setCheckEndDate(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-gold-400"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition"
          >
            Check Live Stock
          </button>
          {(checkStartDate || checkEndDate) && (
            <button
              type="button"
              onClick={handleClearDates}
              className="text-xs text-zinc-500 hover:text-zinc-300 underline"
            >
              Reset Dates
            </button>
          )}
        </form>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search equipment by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-200 focus:outline-none focus:border-gold-400"
          />
        </div>
      </div>

      {/* Table of Inventory */}
      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-3.5 px-4">Item & SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Rental Rate</th>
                <th className="py-3.5 px-4 text-center">Total Owned</th>
                <th className="py-3.5 px-4 text-center">Booked</th>
                <th className="py-3.5 px-4 text-center">In Repair</th>
                <th className="py-3.5 px-4 text-center">Damaged</th>
                <th className="py-3.5 px-4 text-center">Available Stock</th>
                <th className="py-3.5 px-4">Condition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-zinc-500">
                    Loading inventory data...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-zinc-500">
                    No equipment found.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-800/40 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg bg-zinc-800 overflow-hidden shrink-0">
                          <Image
                            src={item.imageUrl || "/images/real/PHOTO-2026-11-04-21-37-29.jpg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-100">{item.name}</p>
                          <p className="text-[10px] font-mono text-gold-400">{item.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400">
                      {item.category?.name || "Equipment"}
                    </td>
                    <td className="py-3.5 px-4 font-serif font-bold text-gold-300">
                      {formatCurrency(item.rentalPrice)} / day
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-zinc-200">
                      {item.totalQuantity}
                    </td>
                    <td className="py-3.5 px-4 text-center font-semibold text-amber-400">
                      {item.bookedQuantity || 0}
                    </td>
                    <td className="py-3.5 px-4 text-center font-semibold text-zinc-400">
                      {item.maintenanceQuantity || 0}
                    </td>
                    <td className="py-3.5 px-4 text-center font-semibold text-rose-400">
                      {item.damagedQuantity || 0}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-xs ${
                          item.availableQuantity > 0
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        {item.availableQuantity}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        {item.condition}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="font-serif text-xl font-bold text-white">
                Register New Equipment
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Equipment Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Luxury Banquet Chair (Gold)"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Total Quantity *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={form.totalQuantity}
                    onChange={(e) => setForm({ ...form, totalQuantity: e.target.value })}
                    placeholder="100"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Rental Price (LKR) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={form.rentalPrice}
                    onChange={(e) => setForm({ ...form, rentalPrice: e.target.value })}
                    placeholder="250"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Item specifications, dimensions, color..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-zinc-200"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-800 text-zinc-400 hover:bg-zinc-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold-gradient text-zinc-950 font-bold uppercase tracking-wider"
                >
                  Save Equipment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
