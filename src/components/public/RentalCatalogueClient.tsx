"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuotation } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { formatCurrency } from "@/lib/utils";
import {
  Calendar,
  Search,
  Filter,
  Check,
  Plus,
  Minus,
  Sparkles,
  Info,
  Clock,
  AlertCircle,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface RentalItem {
  id: string;
  name: string;
  sku: string;
  description: string | null;
  imageUrl: string | null;
  totalQuantity: number;
  availableQuantity: number;
  bookedQuantity?: number;
  rentalPrice: number;
  pricingUnit: string;
  condition: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  isDateChecked?: boolean;
}

export function RentalCatalogueClient({
  initialItems,
  categories,
}: {
  initialItems: RentalItem[];
  categories: Category[];
}) {
  const { addItem, startDate, endDate, setDateRange } = useQuotation();
  const { t } = useLanguage();

  const [items, setItems] = useState<RentalItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [localStartDate, setLocalStartDate] = useState<string>(startDate || "");
  const [localEndDate, setLocalEndDate] = useState<string>(endDate || "");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  // When date range changes, fetch date-based availability from API
  const handleCheckDates = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!localStartDate || !localEndDate) return;

    if (new Date(localStartDate) > new Date(localEndDate)) {
      alert("Start date must be before or equal to End date.");
      return;
    }

    setIsLoading(true);
    setDateRange(localStartDate, localEndDate);

    try {
      const res = await fetch(
        `/api/inventory?startDate=${encodeURIComponent(localStartDate)}&endDate=${encodeURIComponent(
          localEndDate
        )}${selectedCategory !== "ALL" ? `&category=${selectedCategory}` : ""}`
      );
      const data = await res.json();
      if (data.items) {
        setItems(data.items);
      }
    } catch (err) {
      console.error("Availability check failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getSelectedQuantity = (itemId: string) => {
    return selectedQuantities[itemId] || 1;
  };

  const handleQuantityChange = (itemId: string, delta: number, maxAvailable: number) => {
    const current = getSelectedQuantity(itemId);
    const updated = Math.min(Math.max(1, current + delta), Math.max(1, maxAvailable));
    setSelectedQuantities((prev) => ({ ...prev, [itemId]: updated }));
  };

  const handleAddToCart = (item: RentalItem) => {
    const qty = getSelectedQuantity(item.id);
    addItem(
      {
        itemId: item.id,
        name: item.name,
        sku: item.sku,
        rentalPrice: item.rentalPrice,
        imageUrl: item.imageUrl || undefined,
        category: item.category.name,
      },
      qty
    );

    // Flash feedback
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  // Filter items locally by category & search
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "ALL" || item.category.slug === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <section className="relative -mt-12 py-14 bg-zinc-950 border-b border-zinc-900 overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/real/PHOTO-2026-11-04-21-37-41.jpg"
            alt="B.M Catering Rental Inventory"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold">
            {t.rentalsPage.kicker}
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            {t.rentalsPage.title}
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
            {t.rentalsPage.subtitle}
          </p>
        </div>
      </section>

      {/* 1. Date Range Availability Tool Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-gold-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gold-400" />
                <span>{t.rentalsPage.selectedDates}</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Select your event dates to see exact available warehouse stock and prevent double booking.
              </p>
            </div>
            {localStartDate && localEndDate && (
              <span className="text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full font-medium self-start sm:self-auto">
                ✓ Dates Active
              </span>
            )}
          </div>

          <form onSubmit={handleCheckDates} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                {t.rentalsPage.startDate}:
              </label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={localStartDate}
                onChange={(e) => setLocalStartDate(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                {t.rentalsPage.endDate}:
              </label>
              <input
                type="date"
                min={localStartDate || new Date().toISOString().split("T")[0]}
                value={localEndDate}
                onChange={(e) => setLocalEndDate(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
                required
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gold-gradient text-zinc-950 font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl hover:brightness-110 shadow-gold transition flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Clock className="w-4 h-4" />
                    <span>Check Availability</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              selectedCategory === "ALL"
                ? "bg-gold-500 text-black shadow-gold font-bold"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
            }`}
          >
            {t.rentalsPage.allCategory} ({items.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat.slug
                  ? "bg-gold-500 text-black shadow-gold font-bold"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
          <input
            type="text"
            placeholder={t.rentalsPage.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-gold-400"
          />
        </div>
      </div>

      {/* 3. Products Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/20 rounded-2xl border border-zinc-800/80 space-y-3">
          <AlertCircle className="w-10 h-10 text-zinc-600 mx-auto" />
          <h4 className="text-lg font-serif font-semibold text-zinc-200">{t.rentalsPage.noResults}</h4>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const hasCheckedDates = !!item.isDateChecked;
            const availableQty = item.availableQuantity;
            const isOutOfStock = availableQty <= 0;
            const selectedQty = getSelectedQuantity(item.id);
            const isAdded = addedItemIds[item.id];

            return (
              <div
                key={item.id}
                className="group rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-gold-500/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
              >
                {/* Image & Category */}
                <div className="relative h-60 bg-zinc-800 overflow-hidden">
                  <Image
                    src={item.imageUrl || "/images/real/PHOTO-2026-11-04-21-37-29.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-zinc-950/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium text-gold-400 border border-zinc-800">
                    {item.category.name}
                  </div>
                  <div className="absolute top-3 right-3 bg-zinc-950/85 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-zinc-400 border border-zinc-800">
                    {item.sku}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg font-bold text-zinc-100 group-hover:text-gold-300 transition line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {item.description || "High quality rental equipment for events and weddings."}
                    </p>
                  </div>

                  {/* Pricing & Availability Badges */}
                  <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-400">Daily Rate</span>
                      <span className="text-base font-serif font-bold text-gold-300">
                        {formatCurrency(item.rentalPrice)}
                      </span>
                    </div>

                    {/* Date Availability Indicator */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-zinc-500">Warehouse Stock</span>
                      {hasCheckedDates ? (
                        isOutOfStock ? (
                          <span className="text-rose-400 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                            Booked Out for Dates
                          </span>
                        ) : (
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {availableQty} Available for Dates
                          </span>
                        )
                      ) : (
                        <span className="text-zinc-400 font-medium">
                          {item.totalQuantity} Units Owned
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Selector & Add Button */}
                  <div className="pt-2 flex items-center gap-2">
                    <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl p-1">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1, availableQty)}
                        disabled={isOutOfStock || selectedQty <= 1}
                        className="w-7 h-7 rounded-lg hover:bg-zinc-800 text-zinc-300 flex items-center justify-center disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-zinc-200">
                        {selectedQty}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1, availableQty)}
                        disabled={isOutOfStock || selectedQty >= availableQty}
                        className="w-7 h-7 rounded-lg hover:bg-zinc-800 text-zinc-300 flex items-center justify-center disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={isOutOfStock}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : isOutOfStock
                          ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                          : "bg-gold-gradient text-zinc-950 hover:brightness-110 shadow-gold"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{t.featuredRentals.added}!</span>
                        </>
                      ) : isOutOfStock ? (
                        <span>{t.rentalsPage.outOfStock}</span>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>{t.featuredRentals.addToCart}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
