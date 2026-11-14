export const fallbackServices = {
  catering: [
    {
      id: "fallback-catering-banquet",
      slug: "banquet-wedding-catering",
      name: "Banquet & wedding catering",
      description: "Generous menus for weddings, homecomings, family celebrations and corporate gatherings, shaped around your guests and style.",
      features: JSON.stringify(["Live cooking stations", "Sri Lankan and global menus", "Halal-certified kitchens"]),
      basePrice: 0,
      imageUrl: "/images/real/PHOTO-2026-11-04-21-37-47.jpg",
    },
    {
      id: "fallback-catering-buffet",
      slug: "buffet-and-live-stations",
      name: "Buffet & live stations",
      description: "Warm service, fresh preparation and thoughtful presentation for celebrations that feel relaxed and generous.",
      features: JSON.stringify(["Custom menu planning", "Fresh on-site preparation", "Professional service team"]),
      basePrice: 0,
      imageUrl: "/images/real/PHOTO-2026-11-04-21-37-53.jpg",
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
      imageUrl: "/images/real/PHOTO-2026-11-04-21-37-41.jpg",
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
      imageUrl: "/images/real/PHOTO-2026-11-04-21-37-50.jpg",
    },
  ],
};

export const fallbackGallery = [
  { id: "gallery-banquet", title: "Warm banquet tables", category: "CATERING", imageUrl: "/images/real/PHOTO-2026-11-04-21-37-47.jpg", description: "Thoughtful table settings for shared celebrations.", featured: true },
  { id: "gallery-celebration", title: "Colourful celebrations", category: "WEDDINGS", imageUrl: "/images/real/PHOTO-2026-11-04-21-37-50.jpg", description: "A welcoming atmosphere for every guest.", featured: true },
  { id: "gallery-food", title: "Freshly prepared food", category: "CATERING", imageUrl: "/images/real/PHOTO-2026-11-04-21-37-53.jpg", description: "Made for sharing.", featured: true },
  { id: "gallery-outdoor", title: "Outdoor event atmosphere", category: "EQUIPMENT", imageUrl: "/images/real/PHOTO-2026-11-04-21-37-41.jpg", description: "Practical setups made beautiful.", featured: true },
  { id: "gallery-lighting", title: "Evening lighting", category: "LIGHTING", imageUrl: "/images/real/PHOTO-2026-11-04-21-37-34.jpg", description: "Soft event glow after sunset.", featured: true },
  { id: "gallery-details", title: "Details made personal", category: "CORPORATE", imageUrl: "/images/real/PHOTO-2026-11-04-21-37-37.jpg", description: "Finishing touches that feel like yours.", featured: true },
];

export const fallbackRentalItems = [
  { id: "fallback-item-marquee", name: "Marquees & canopies", sku: "BM-MARQUEE", description: "Flexible shelter for outdoor weddings, family gatherings and celebrations.", imageUrl: "/images/real/PHOTO-2026-11-04-21-37-41.jpg", totalQuantity: 20, availableQuantity: 20, rentalPrice: 0, pricingUnit: "PER_EVENT", condition: "GOOD", category: { id: "marquees", name: "Marquees", slug: "marquees" } },
  { id: "fallback-item-chairs", name: "Chairs & seating", sku: "BM-CHAIRS", description: "Guest seating options to suit banquet layouts, ceremonies and relaxed events.", imageUrl: "/images/real/PHOTO-2026-11-04-21-37-29.jpg", totalQuantity: 2000, availableQuantity: 2000, rentalPrice: 0, pricingUnit: "PER_EVENT", condition: "GOOD", category: { id: "seating", name: "Seating", slug: "seating" } },
  { id: "fallback-item-tables", name: "Tables & buffet pieces", sku: "BM-TABLES", description: "Tables, serving stations and buffet essentials for a smooth guest experience.", imageUrl: "/images/real/PHOTO-2026-11-04-21-37-27.jpg", totalQuantity: 100, availableQuantity: 100, rentalPrice: 0, pricingUnit: "PER_EVENT", condition: "GOOD", category: { id: "tables", name: "Tables", slug: "tables" } },
];
