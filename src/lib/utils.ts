import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string | { toString(): string } | null | undefined): string {
  if (amount === null || amount === undefined) return "LKR 0.00";
  const num = typeof amount === "number" ? amount : parseFloat(amount.toString());
  if (isNaN(num)) return "LKR 0.00";
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(num)
    .replace("LKR", "LKR ");
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "-";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return "-";
  const d = new Date(date);
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getBookingStatusBadge(status: string) {
  switch (status) {
    case "ENQUIRY":
      return { label: "Enquiry", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" };
    case "QUOTATION_SENT":
      return { label: "Quotation Sent", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" };
    case "PENDING_CONFIRMATION":
      return { label: "Pending", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
    case "CONFIRMED":
      return { label: "Confirmed", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
    case "IN_PROGRESS":
      return { label: "In Progress", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" };
    case "COMPLETED":
      return { label: "Completed", color: "bg-emerald-600/20 text-emerald-300 border-emerald-600/30" };
    case "CANCELLED":
      return { label: "Cancelled", color: "bg-rose-500/10 text-rose-400 border-rose-500/20" };
    default:
      return { label: status, color: "bg-zinc-800 text-zinc-300 border-zinc-700" };
  }
}
