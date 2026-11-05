"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface QuotationItem {
  itemId: string;
  name: string;
  sku: string;
  rentalPrice: number;
  quantity: number;
  imageUrl?: string;
  category?: string;
}

interface QuotationContextType {
  items: QuotationItem[];
  startDate: string;
  endDate: string;
  addItem: (item: Omit<QuotationItem, "quantity">, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearItems: () => void;
  setDateRange: (start: string, end: string) => void;
  totalRentalAmount: number;
  totalItemCount: number;
}

const QuotationContext = createContext<QuotationContextType | undefined>(undefined);

export function QuotationProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuotationItem[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bm_quotation_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.items)) setItems(parsed.items);
        if (parsed.startDate) setStartDate(parsed.startDate);
        if (parsed.endDate) setEndDate(parsed.endDate);
      }
    } catch {
      // Ignore
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem(
        "bm_quotation_cart",
        JSON.stringify({ items, startDate, endDate })
      );
    } catch {
      // Ignore
    }
  }, [items, startDate, endDate]);

  const addItem = (item: Omit<QuotationItem, "quantity">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.itemId === item.itemId);
      if (existing) {
        return prev.map((i) =>
          i.itemId === item.itemId ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.itemId !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.itemId === itemId ? { ...i, quantity } : i))
    );
  };

  const clearItems = () => {
    setItems([]);
  };

  const setDateRange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  const totalRentalAmount = items.reduce(
    (sum, i) => sum + i.rentalPrice * i.quantity,
    0
  );

  const totalItemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <QuotationContext.Provider
      value={{
        items,
        startDate,
        endDate,
        addItem,
        removeItem,
        updateQuantity,
        clearItems,
        setDateRange,
        totalRentalAmount,
        totalItemCount,
      }}
    >
      {children}
    </QuotationContext.Provider>
  );
}

export function useQuotation() {
  const context = useContext(QuotationContext);
  if (!context) {
    throw new Error("useQuotation must be used within a QuotationProvider");
  }
  return context;
}
