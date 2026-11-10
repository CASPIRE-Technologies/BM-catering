"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuotation } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { formatCurrency } from "@/lib/utils";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

interface QuotationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuotationDrawer({ isOpen, onClose }: QuotationDrawerProps) {
  const { items, removeItem, updateQuantity, clearItems, totalRentalAmount, totalItemCount } = useQuotation();
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-zinc-950 border-l border-zinc-800 flex flex-col h-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-serif font-semibold text-zinc-100">
              {t.drawer.title}
            </h2>
            <span className="text-xs bg-gold-500/20 text-gold-300 px-2 py-0.5 rounded-full font-medium">
              {totalItemCount} {t.drawer.itemsCount}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12 text-zinc-400 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-zinc-600 opacity-40" />
              <p className="font-medium text-zinc-300">{t.drawer.emptyTitle}</p>
              <p className="text-sm text-zinc-500">
                {t.drawer.emptyDesc}
              </p>
              <Link
                href="/rentals"
                onClick={onClose}
                className="inline-block mt-3 text-xs uppercase tracking-wider text-gold-400 hover:text-gold-300 font-semibold border-b border-gold-400 pb-0.5"
              >
                {t.drawer.browseBtn}
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.itemId}
                className="flex items-center gap-4 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                  <Image
                    src={item.imageUrl || "/images/real/PHOTO-2026-11-04-21-37-29.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-zinc-100 truncate">{item.name}</h4>
                  <p className="text-xs text-gold-400 font-medium">
                    {formatCurrency(item.rentalPrice)} {t.rentalsPage.pricingUnit}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold px-1 text-zinc-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                    <span className="text-xs text-zinc-400 ml-auto font-medium">
                      {formatCurrency(item.rentalPrice * item.quantity)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.itemId)}
                  className="text-zinc-500 hover:text-rose-400 p-1 transition"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-800 bg-zinc-900/70 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">{t.drawer.totalEstimate}</span>
              <span className="text-base font-semibold text-gold-300 font-serif">
                {formatCurrency(totalRentalAmount)}
              </span>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={clearItems}
                className="px-3 py-2.5 text-xs text-zinc-400 hover:text-zinc-200 rounded-lg border border-zinc-800 hover:bg-zinc-800 transition"
              >
                {t.drawer.clearAll}
              </button>
              <Link
                href="/book"
                onClick={onClose}
                className="flex-1 bg-gold-gradient text-zinc-950 font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 transition shadow-gold text-sm"
              >
                <span>{t.drawer.proceedBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
