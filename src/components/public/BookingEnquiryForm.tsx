"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuotation } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { formatCurrency } from "@/lib/utils";
import {
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  UtensilsCrossed,
  Tent,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export function BookingEnquiryForm({ availableItems }: { availableItems: any[] }) {
  const { items, clearItems, startDate: contextStart, endDate: contextEnd } = useQuotation();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    eventType: "Wedding Reception",
    eventLocation: "",
    startDate: contextStart || "",
    endDate: contextEnd || "",
    guestCount: "",
    requireCatering: true,
    requireRentals: items.length > 0,
    requireLighting: false,
    cateringEstimatedBudget: "",
    lightingEstimatedBudget: "",
    notes: "",
  });

  const [selectedItems, setSelectedItems] = useState<any[]>(items);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync when cart changes
  useEffect(() => {
    if (items.length > 0) {
      setSelectedItems(items);
      setFormData((prev) => ({ ...prev, requireRentals: true }));
    }
  }, [items]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleItemQuantityChange = (itemId: string, qty: number) => {
    if (qty <= 0) {
      setSelectedItems((prev) => prev.filter((i) => i.itemId !== itemId));
    } else {
      setSelectedItems((prev) =>
        prev.map((i) => (i.itemId === itemId ? { ...i, quantity: qty } : i))
      );
    }
  };

  const handleAddItemFromSelector = (itemId: string) => {
    const found = availableItems.find((i) => i.id === itemId);
    if (!found) return;
    const exists = selectedItems.find((i) => i.itemId === itemId);
    if (exists) {
      handleItemQuantityChange(itemId, exists.quantity + 1);
    } else {
      setSelectedItems((prev) => [
        ...prev,
        {
          itemId: found.id,
          name: found.name,
          sku: found.sku,
          rentalPrice: Number(found.rentalPrice),
          quantity: 1,
          imageUrl: found.imageUrl,
        },
      ]);
    }
  };

  const calculateRentalTotal = () => {
    return selectedItems.reduce((sum, i) => sum + i.rentalPrice * i.quantity, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const servicesArray: any[] = [];
      let cateringAmt = 0;
      let lightingAmt = 0;

      if (formData.requireCatering) {
        cateringAmt = parseFloat(formData.cateringEstimatedBudget) || 0;
        servicesArray.push({
          serviceType: "CATERING",
          name: `${formData.eventType} Catering`,
          amount: cateringAmt,
          details: `Guest Count: ${formData.guestCount || "TBD"}`,
        });
      }

      if (formData.requireRentals && selectedItems.length > 0) {
        servicesArray.push({
          serviceType: "RENTALS",
          name: "Equipment Rentals",
          amount: calculateRentalTotal(),
          details: `${selectedItems.length} rental line items requested`,
        });
      }

      if (formData.requireLighting) {
        lightingAmt = parseFloat(formData.lightingEstimatedBudget) || 0;
        servicesArray.push({
          serviceType: "LIGHTING",
          name: "Lighting & Event Decor Setup",
          amount: lightingAmt,
          details: "Special stage and ambient lighting design",
        });
      }

      const payload = {
        customerName: formData.customerName,
        phone: formData.phone,
        whatsapp: formData.whatsapp || formData.phone,
        email: formData.email,
        address: formData.address,
        eventType: formData.eventType,
        eventLocation: formData.eventLocation,
        startDate: formData.startDate,
        endDate: formData.endDate || formData.startDate,
        guestCount: formData.guestCount,
        cateringAmount: cateringAmt,
        rentalAmount: calculateRentalTotal(),
        lightingAmount: lightingAmt,
        services: servicesArray,
        items: selectedItems.map((i) => ({
          itemId: i.itemId,
          quantity: i.quantity,
          rentalRate: i.rentalPrice,
        })),
        notes: formData.notes,
        isAdminCreation: false,
        status: "ENQUIRY",
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit enquiry");
      }

      setSubmissionSuccess(result);
      clearItems();
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <div className="max-w-3xl mx-auto rounded-3xl bg-zinc-900/60 border border-gold-500/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-400">
            Enquiry Received
          </span>
          <h2 className="text-3xl font-serif font-bold text-white">
            Thank You, {formData.customerName}!
          </h2>
          <p className="text-sm text-zinc-300 max-w-lg mx-auto">
            Your booking request has been registered under reference:
          </p>
          <div className="inline-block px-4 py-2 rounded-xl bg-zinc-950 border border-gold-500/50 font-mono text-lg font-bold text-gold-300 tracking-wider">
            {submissionSuccess.bookingNumber}
          </div>
        </div>

        {/* Workflow note */}
        <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-left text-xs text-zinc-400 space-y-2 max-w-xl mx-auto">
          <div className="flex items-center gap-2 text-gold-400 font-semibold">
            <ShieldAlert className="w-4 h-4" />
            <span>Admin-Approved Booking Workflow:</span>
          </div>
          <p>
            As per B.M Catering policy, inventory is not automatically reserved until dates and logistics are verified by our team. We will review warehouse stock for your dates and send an official itemized quotation to your WhatsApp ({formData.whatsapp || formData.phone}).
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/94771234567?text=Hi%20B.M%20Catering!%20I%20just%20submitted%20booking%20enquiry%20${submissionSuccess.bookingNumber}%20under%20the%20name%20${encodeURIComponent(
              formData.customerName
            )}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Notify Management via WhatsApp</span>
          </a>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 transition"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* SECTION 1: CUSTOMER CONTACT */}
      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <div className="w-9 h-9 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-zinc-100">
              {t.bookPage.sec1}
            </h3>
            <p className="text-xs text-zinc-400">
              Please provide your direct contact details for quotation delivery.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              name="customerName"
              required
              value={formData.customerName}
              onChange={handleChange}
              placeholder="e.g. Kasun Perera"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Contact Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 077 123 4567"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              WhatsApp Number (for instant quote)
            </label>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="e.g. 077 123 4567"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Email Address (optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. kasun@example.com"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: EVENT DETAILS */}
      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <div className="w-9 h-9 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-zinc-100">
              {t.bookPage.sec2}
            </h3>
            <p className="text-xs text-zinc-400">
              Dates help us calculate warehouse equipment availability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Event Type *
            </label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
            >
              <option value="Wedding Reception">Wedding Reception</option>
              <option value="Home Wedding / Poruwa Ceremony">Home Wedding / Poruwa Ceremony</option>
              <option value="Birthday Celebration">Birthday Celebration</option>
              <option value="Corporate Banquet / Conference">Corporate Banquet / Conference</option>
              <option value="Traditional Festival / Religious Event">Traditional Festival / Religious Event</option>
              <option value="Alms Giving / Pirith Chanting">Alms Giving / Pirith Chanting</option>
              <option value="Private Gathering">Private Gathering</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Event Start Date *
            </label>
            <input
              type="date"
              name="startDate"
              required
              min={new Date().toISOString().split("T")[0]}
              value={formData.startDate}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Event End Date *
            </label>
            <input
              type="date"
              name="endDate"
              required
              min={formData.startDate || new Date().toISOString().split("T")[0]}
              value={formData.endDate}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Event Location / Venue Address *
            </label>
            <input
              type="text"
              name="eventLocation"
              required
              value={formData.eventLocation}
              onChange={handleChange}
              placeholder="e.g. Mount Lavinia Beach Lawn, Colombo OR Private Residence in Kandy"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Expected Guest Count
            </label>
            <input
              type="number"
              name="guestCount"
              min="10"
              max="5000"
              value={formData.guestCount}
              onChange={handleChange}
              placeholder="e.g. 250"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: SERVICES SELECTION */}
      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <div className="w-9 h-9 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-zinc-100">
              {t.bookPage.sec3}
            </h3>
            <p className="text-xs text-zinc-400">
              Select all services you require for this booking.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className={`p-5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${formData.requireCatering ? "bg-gold-500/10 border-gold-500/50" : "bg-zinc-950 border-zinc-800"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-gold-400" />
                <span className="font-semibold text-sm text-zinc-100">Catering Services</span>
              </div>
              <input
                type="checkbox"
                name="requireCatering"
                checked={formData.requireCatering}
                onChange={handleChange}
                className="w-4 h-4 text-gold-500 rounded"
              />
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              Buffet feasts, live food stations, welcome drinks, service crew.
            </p>
          </label>

          <label className={`p-5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${formData.requireRentals ? "bg-gold-500/10 border-gold-500/50" : "bg-zinc-950 border-zinc-800"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tent className="w-5 h-5 text-gold-400" />
                <span className="font-semibold text-sm text-zinc-100">Equipment Rentals</span>
              </div>
              <input
                type="checkbox"
                name="requireRentals"
                checked={formData.requireRentals}
                onChange={handleChange}
                className="w-4 h-4 text-gold-500 rounded"
              />
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              Chairs, tables, tents/marquees, stages, food warmers, generators.
            </p>
          </label>

          <label className={`p-5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${formData.requireLighting ? "bg-gold-500/10 border-gold-500/50" : "bg-zinc-950 border-zinc-800"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-400" />
                <span className="font-semibold text-sm text-zinc-100">Lighting & Decor</span>
              </div>
              <input
                type="checkbox"
                name="requireLighting"
                checked={formData.requireLighting}
                onChange={handleChange}
                className="w-4 h-4 text-gold-500 rounded"
              />
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              Fairy light canopies, moving head beams, crystal chandeliers, mandaps.
            </p>
          </label>
        </div>
      </div>

      {/* SECTION 4: SELECTED RENTAL ITEMS (IF RENTALS SELECTED) */}
      {formData.requireRentals && (
        <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-zinc-100">
                4. Selected Rental Equipment
              </h3>
              <p className="text-xs text-zinc-400">
                Review items in your quote or add additional equipment.
              </p>
            </div>
            <div className="text-sm font-serif font-bold text-gold-300">
              Estimated Rental: {formatCurrency(calculateRentalTotal())}
            </div>
          </div>

          {selectedItems.length === 0 ? (
            <div className="text-center py-6 text-zinc-400 space-y-3">
              <p className="text-xs">No equipment added to your quotation yet.</p>
              <div className="flex items-center justify-center gap-3">
                <select
                  onChange={(e) => {
                    if (e.target.value) handleAddItemFromSelector(e.target.value);
                  }}
                  defaultValue=""
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200"
                >
                  <option value="" disabled>+ Add equipment from catalogue...</option>
                  {availableItems.map((itm) => (
                    <option key={itm.id} value={itm.id}>
                      {itm.name} ({formatCurrency(itm.rentalPrice)}/day)
                    </option>
                  ))}
                </select>
                <Link
                  href="/rentals"
                  className="text-xs text-gold-400 hover:underline font-semibold"
                >
                  Browse Catalogue
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedItems.map((item) => (
                <div
                  key={item.itemId}
                  className="flex items-center justify-between gap-4 bg-zinc-950 p-3.5 rounded-xl border border-zinc-800"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden shrink-0">
                      <Image
                        src={item.imageUrl || "/images/real/PHOTO-2026-11-04-21-37-29.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-100 truncate">{item.name}</h4>
                      <p className="text-[11px] text-gold-400 font-medium">
                        {formatCurrency(item.rentalPrice)} / day
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
                      <button
                        type="button"
                        onClick={() => handleItemQuantityChange(item.itemId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold text-zinc-300 hover:text-white"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-zinc-100">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleItemQuantityChange(item.itemId, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold text-zinc-300 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs font-serif font-bold text-zinc-200 w-24 text-right">
                      {formatCurrency(item.rentalPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}

              <div className="pt-2 flex justify-end">
                <select
                  onChange={(e) => {
                    if (e.target.value) handleAddItemFromSelector(e.target.value);
                  }}
                  defaultValue=""
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300"
                >
                  <option value="" disabled>+ Add more items from catalogue...</option>
                  {availableItems.map((itm) => (
                    <option key={itm.id} value={itm.id}>
                      {itm.name} ({formatCurrency(itm.rentalPrice)}/day)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 5: NOTES & SUBMIT */}
      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Additional Requirements & Dietary Preferences
          </label>
          <textarea
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Tell us about special dietary needs, desired color theme, marquee setup time, or generator requirements..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
          />
        </div>

        {/* Admin approval workflow notice */}
        <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/20 text-xs text-gold-300/90 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0 text-gold-400 mt-0.5" />
          <p>
            <strong>Note on Reservations:</strong> Submitting this enquiry does not instantly bind or reserve inventory. B.M Catering management reviews date logistics, confirms warehouse stock availability, and provides an official signed quotation with payment instructions.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl bg-gold-gradient text-zinc-950 font-bold uppercase tracking-wider text-sm hover:brightness-110 shadow-gold transition flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
          ) : (
            <>
              <span>{t.bookPage.submitBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
