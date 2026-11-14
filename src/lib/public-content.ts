export const fallbackServices = {
  catering: [
    {
      id: "fallback-catering-banquet",
      slug: "banquet-wedding-catering",
      name: "Banquet & wedding catering",
      description: "Generous menus for weddings, homecomings, family celebrations and corporate gatherings, shaped around your guests and style.",
      features: JSON.stringify(["Live cooking stations", "Sri Lankan and global menus", "Halal-certified kitchens"]),
      basePrice: 0,
      categoryId: "fallback-category-catering",
      pricingUnit: "PER_PERSON",
      sortOrder: 0,
      isActive: true,
      imageUrl: "/images/real/PHOTO-2026-11-04-21-37-47.jpg",
      createdAt: new Date(0),
      updatedAt: new Date(0),
    },
    {
      id: "fallback-catering-buffet",
      slug: "buffet-and-live-stations",
      name: "Buffet & live stations",
      description: "Warm service, fresh preparation and thoughtful presentation for celebrations that feel relaxed and generous.",
      features: JSON.stringify(["Custom menu planning", "Fresh on-site preparation", "Professional service team"]),
      basePrice: 0,
      categoryId: "fallback-category-catering",
      pricingUnit: "PER_PERSON",
      sortOrder: 1,
      isActive: true,
      imageUrl: "/images/real/PHOTO-2026-11-04-21-37-53.jpg",
      createdAt: new Date(0),
      updatedAt: new Date(0),
    },
  ],
  rentals: [
    {
      id: "fallback-rental-marquees",
      slug: "marquees-and-canopies",
      name: "Marquees, chairs & stages",
      description: "Practical event infrastructure including marquees, seating, tables, stage elements and buffet essentials for indoor or outdoor venues.",
      features: JSON.stringify(["Weather-ready options", "Flexible layouts", "Islandwide setup support"]),
      basePrice: 0,
      categoryId: "fallback-category-rentals",
      pricingUnit: "PER_EVENT",
      sortOrder: 0,
      isActive: true,
      imageUrl: "/images/real/PHOTO-2026-11-04-21-37-41.jpg",
      createdAt: new Date(0),
      updatedAt: new Date(0),
    },
  ],
  lighting: [
    {
      id: "fallback-lighting-ambience",
      slug: "lighting-and-ambience",
      name: "Lighting & ambience",
      description: "Warm fairy lights, simple stage lighting and finishing touches that help your celebration feel inviting after sunset.",
      features: JSON.stringify(["Fairy light tunnels", "Stage and ambient lighting", "Standby power options"]),
      basePrice: 0,
      categoryId: "fallback-category-lighting",
      pricingUnit: "PER_EVENT",
      sortOrder: 0,
      isActive: true,
      imageUrl: "/images/real/PHOTO-2026-11-04-21-37-50.jpg",
      createdAt: new Date(0),
      updatedAt: new Date(0),
    },
  ],
};

export const fallbackGallery = [
  { id: "gallery-banquet", title: "Warm banquet tables", category: "CATERING", imageUrl: "/images/real/PHOTO-2026-11-04-21-37-47.jpg", description: "Thoughtful table settings for shared celebrations.", featured: true, createdAt: new Date(0), updatedAt: new Date(0), sortOrder: 0 },
  { id: "gallery-celebration", title: "Colourful celebrations", category: "WEDDINGS", imageUrl: "/images/real/PHOTO-2026-11-04-21-37-50.jpg", description: "A welcoming atmosphere for every guest.", featured: true, createdAt: new Date(0), updatedAt: new Date(0), sortOrder: 1 },
  { id: "gallery-food", title: "Freshly prepared food", category: "CATERING", imageUrl: "/images/real/PHOTO-2026-11-04-21-37-53.jpg", description: "Made for sharing.", featured: true, createdAt: new Date(0), updatedAt: new Date(0), sortOrder: 2 },
  { id: "gallery-outdoor", title: "Outdoor event atmosphere", category: "EQUIPMENT", imageUrl: "/images/real/PHOTO-2026-11-04-21-37-41.jpg", description: "Practical setups made beautiful.", featured: true, createdAt: new Date(0), updatedAt: new Date(0), sortOrder: 3 },
  { id: "gallery-lighting", title: "Evening lighting", category: "LIGHTING", imageUrl: "/images/real/PHOTO-2026-11-04-21-37-34.jpg", description: "Soft event glow after sunset.", featured: true, createdAt: new Date(0), updatedAt: new Date(0), sortOrder: 4 },
  { id: "gallery-details", title: "Details made personal", category: "CORPORATE", imageUrl: "/images/real/PHOTO-2026-11-04-21-37-37.jpg", description: "Finishing touches that feel like yours.", featured: true, createdAt: new Date(0), updatedAt: new Date(0), sortOrder: 5 },
];

export const fallbackRentalItems = [
  { id: "fallback-item-marquee", name: "Marquees & canopies", sku: "BM-MARQUEE", description: "Flexible shelter for outdoor weddings, family gatherings and celebrations.", imageUrl: "/images/real/PHOTO-2026-11-04-21-37-41.jpg", totalQuantity: 20, availableQuantity: 20, rentalPrice: 0, pricingUnit: "PER_EVENT", condition: "GOOD", damagedQuantity: 0, maintenanceQuantity: 0, status: "AVAILABLE", categoryId: "fallback-inventory-category", createdAt: new Date(0), updatedAt: new Date(0), category: { id: "marquees", name: "Marquees", slug: "marquees", description: null, sortOrder: 0, createdAt: new Date(0), updatedAt: new Date(0) } },
  { id: "fallback-item-chairs", name: "Chairs & seating", sku: "BM-CHAIRS", description: "Guest seating options to suit banquet layouts, ceremonies and relaxed events.", imageUrl: "/images/real/PHOTO-2026-11-04-21-37-29.jpg", totalQuantity: 2000, availableQuantity: 2000, rentalPrice: 0, pricingUnit: "PER_EVENT", condition: "GOOD", damagedQuantity: 0, maintenanceQuantity: 0, status: "AVAILABLE", categoryId: "fallback-inventory-category", createdAt: new Date(0), updatedAt: new Date(0), category: { id: "seating", name: "Seating", slug: "seating", description: null, sortOrder: 0, createdAt: new Date(0), updatedAt: new Date(0) } },
  { id: "fallback-item-tables", name: "Tables & buffet pieces", sku: "BM-TABLES", description: "Tables, serving stations and buffet essentials for a smooth guest experience.", imageUrl: "/images/real/PHOTO-2026-11-04-21-37-27.jpg", totalQuantity: 100, availableQuantity: 100, rentalPrice: 0, pricingUnit: "PER_EVENT", condition: "GOOD", damagedQuantity: 0, maintenanceQuantity: 0, status: "AVAILABLE", categoryId: "fallback-inventory-category", createdAt: new Date(0), updatedAt: new Date(0), category: { id: "tables", name: "Tables", slug: "tables", description: null, sortOrder: 0, createdAt: new Date(0), updatedAt: new Date(0) } },
].map((item) => ({
  ...item,
  status: "AVAILABLE" as const,
  condition: "GOOD" as const,
}));

export async function loadPublicData<T>(
  label: string,
  loader: () => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    return await loader();
  } catch {
    console.error(`[public-data] ${label} unavailable; using fallback content`);
    return fallback;
  }
}
