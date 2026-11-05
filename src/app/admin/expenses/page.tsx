"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Receipt, Plus, X } from "lucide-react";

export default function AdminExpensesPage() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "INGREDIENTS",
    amount: "",
    vendor: "",
    description: "",
  });

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/expenses");
      const data = await res.json();
      if (data.expenses) setExpenses(data.expenses);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleCreateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setForm({ title: "", category: "INGREDIENTS", amount: "", vendor: "", description: "" });
        fetchExpenses();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
            <Receipt className="w-6 h-6 text-rose-400" />
            <span>Operational Expenses Tracker</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Ingredients, transport fuel, staff wages, tent maintenance, and kitchen utilities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-right">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block">Total Expenses</span>
            <span className="text-lg font-serif font-bold text-rose-400">
              {formatCurrency(totalExpense)}
            </span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Log Expense</span>
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden">
        <table className="w-full text-left text-xs text-zinc-300">
          <thead className="bg-zinc-950 border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-400">
            <tr>
              <th className="py-3.5 px-4">Expense No</th>
              <th className="py-3.5 px-4">Title / Purpose</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Vendor</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-zinc-500">
                  Loading expenses...
                </td>
              </tr>
            ) : expenses.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-zinc-500">
                  No expenses recorded.
                </td>
              </tr>
            ) : (
              expenses.map((e) => (
                <tr key={e.id} className="hover:bg-zinc-800/40 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-gold-300">
                    {e.expenseNumber}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-200">
                    {e.title}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-medium text-zinc-300">
                      {e.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400">{e.vendor || "-"}</td>
                  <td className="py-3.5 px-4 text-zinc-400">{formatDate(e.date)}</td>
                  <td className="py-3.5 px-4 text-right font-serif font-bold text-rose-400 text-sm">
                    -{formatCurrency(e.amount)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Log Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h4 className="font-serif font-bold text-base text-white">Record Operating Expense</h4>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateExpense} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 mb-1">Expense Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Seafood & Spices Purchase"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200"
                  >
                    <option value="INGREDIENTS">Ingredients</option>
                    <option value="FUEL_TRANSPORT">Fuel & Transport</option>
                    <option value="STAFF_WAGES">Staff Wages</option>
                    <option value="EQUIPMENT_MAINTENANCE">Equipment Maintenance</option>
                    <option value="DECORATIONS">Decorations</option>
                    <option value="MISC">Miscellaneous</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-300 mb-1">Amount (LKR) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    placeholder="25000"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-zinc-300 mb-1">Vendor / Payee</label>
                <input
                  type="text"
                  value={form.vendor}
                  onChange={(e) => setForm({ ...form, vendor: e.target.value })}
                  placeholder="e.g. Ceypetco / Negombo Fish Market"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-800 text-zinc-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold-gradient text-zinc-950 font-bold uppercase"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
