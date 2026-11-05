# B.M Catering & Luxury Event Services

A modern, production-grade full-stack web application built for **B.M Catering**, a premier Sri Lankan event services company providing:
1. **Gourmet Catering Services** (Weddings, Corporate, Festivals, Live Stations)
2. **Event & Festival Equipment Rentals** (Chiavari chairs, tables, marquees, stages, food warmers, generators)
3. **Lighting & Event Decorations** (Fairy light canopies, moving head stage beams, chandeliers, mandaps)

---

## 🛠 Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom luxury color palette (Obsidian, Champagne Gold, Ivory)
- **Database**: PostgreSQL
- **ORM**: Prisma ORM
- **Authentication**: JWT & Cookie-based admin authentication
- **Analytics & Charts**: Recharts
- **Icons**: Lucide React
- **Currency**: Sri Lankan Rupee (LKR)

---

## 🚀 Key Features

### 🌟 Public Website
- **Homepage**: Luxury hero banner with real event photography, company heritage, three main service pillars, featured equipment, previous event gallery, client testimonials, and direct WhatsApp booking buttons.
- **Services Showcase**: Detailed presentations of Catering (with per-plate pricing), Equipment Rentals, and Lighting & Decor.
- **Rental Catalogue with Date-Range Availability**:
  - Live availability calculation: filters warehouse stock based on chosen event dates, accounting for overlapping bookings, maintenance, and damaged stock.
  - Interactive Quantity Selector capped to available stock.
  - Quotation Cart Drawer that persists items for booking.
- **Event Gallery**: Interactive category filtering and full-screen image lightbox viewer with high-resolution photography.
- **Booking Enquiry Workflow**: Comprehensive multi-step booking form. Generates a unique booking reference (`BK-2026-XXXX`). *Customer enquiries do not automatically reserve stock until admin verification.*
- **Contact & Logistics**: Office locations in Colombo & Peliyagoda, Google Maps coverage, phone numbers, and WhatsApp integration.

### 🛡 Secure Admin Management Dashboard (`/admin`)
- **Dashboard Overview**: Financial KPIs in LKR, Recharts revenue growth area charts, category distribution donut charts, upcoming event schedule, and low-stock alerts.
- **Event Calendar**: Monthly grid and chronological list view of events, equipment setups, and dismantles.
- **Inventory Management**: Add/edit equipment, track total owned, booked, maintenance, and damaged quantities, and simulate date availability.
- **Bookings Management**: Multi-service tracking (Catering + Rentals + Lighting = Total), quotation generation, status transitions, dispatch & return tracking, and payment logging.
- **Catering Management**: Per-plate pricing, menu inclusions, and guest count banquet revenue calculator.
- **Lighting & Decor**: Stage and ambiance fixtures management.
- **Customers CRM**: Lifetime customer value, booking history, and one-click WhatsApp customer chat.
- **Income & Payments Ledger**: Advance deposits, settlements, and receipt logging.
- **Expenses Tracker**: Operating cost tracking (ingredients, transport fuel, crew wages, maintenance).
- **Financial Reports**: Audit summaries, cash vs invoiced metrics, and one-click CSV export.
- **Website Content & Settings**: Update headlines, bank accounts for quotations, and business profiles.

---

## 🔑 Initial Admin Credentials

- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@bmcatering.lk`
- **Password**: `adminpassword123`

---

## 🏃 Local Setup & Running Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create or verify `.env`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/bm_catering?schema=public"
   JWT_SECRET="your-jwt-secret-key"
   ADMIN_EMAIL="admin@bmcatering.lk"
   ADMIN_PASSWORD="adminpassword123"
   NEXT_PUBLIC_SITE_NAME="B.M Catering"
   NEXT_PUBLIC_WHATSAPP="94771234567"
   NEXT_PUBLIC_CONTACT_PHONE="+94 77 123 4567"
   ```

3. **Synchronize & Seed Database**:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Directory Structure

```
bm-catering/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.js             # Realistic Sri Lankan seed data
├── public/
│   └── images/real/        # Authentic event photography
├── src/
│   ├── app/
│   │   ├── admin/          # 12 admin modules
│   │   ├── api/            # REST API endpoints
│   │   ├── book/           # Booking enquiry page
│   │   ├── contact/        # Contact page
│   │   ├── gallery/        # Lightbox gallery page
│   │   ├── rentals/        # Rental catalogue page
│   │   ├── services/       # Services page
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/
│   │   ├── admin/          # Admin UI components
│   │   ├── layout/         # Navbar, Footer
│   │   └── public/         # Catalogue & Booking forms
│   └── lib/
│       ├── auth.ts         # JWT authentication
│       ├── cart-context.tsx# Quotation cart provider
│       ├── db.ts           # Prisma client
│       ├── inventory.ts    # Concurrency-safe availability
│       └── utils.ts        # Currency and date formatting
```
