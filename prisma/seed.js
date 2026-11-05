const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for B.M Catering...');

  // 1. Admin User
  const hashedPassword = await bcrypt.hash('adminpassword123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@bmcatering.lk' },
    update: {},
    create: {
      name: 'B.M Catering Management',
      email: 'admin@bmcatering.lk',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created/verified:', admin.email);

  // 2. Service Categories
  const catCatering = await prisma.serviceCategory.upsert({
    where: { slug: 'catering' },
    update: {},
    create: {
      name: 'Catering Services',
      slug: 'catering',
      description: 'Gourmet banquet dining, authentic Sri Lankan buffets, live cooking stations, and custom celebration menus.',
      icon: 'Utensils',
      sortOrder: 1,
    },
  });

  const catRentals = await prisma.serviceCategory.upsert({
    where: { slug: 'equipment-rentals' },
    update: {},
    create: {
      name: 'Equipment Rentals',
      slug: 'equipment-rentals',
      description: 'Chairs, banquet tables, luxury marquees, stage setups, commercial catering warmers, and festival essentials.',
      icon: 'Tent',
      sortOrder: 2,
    },
  });

  const catLighting = await prisma.serviceCategory.upsert({
    where: { slug: 'lighting-decorations' },
    update: {},
    create: {
      name: 'Lighting & Decorations',
      slug: 'lighting-decorations',
      description: 'Fairy light canopies, moving-head beams, stage illumination, floral arches, and thematic backdrops.',
      icon: 'Sparkles',
      sortOrder: 3,
    },
  });

  // 3. Services
  const services = [
    {
      categoryId: catCatering.id,
      name: 'Grand Wedding Catering Package',
      slug: 'wedding-catering',
      description: 'Lavish multi-cuisine wedding banquet including welcome mocktails, curated Sri Lankan & international entrees, live carving station, and deluxe dessert bar.',
      basePrice: 3850, // Per guest in LKR
      pricingUnit: 'PER_PERSON',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-27.jpg',
      features: JSON.stringify(['Welcome Drinks & Canapés', '3 Rice Varieties & 5 Meat/Seafood Curries', 'Live Hopper/Kottu or BBQ Station', 'Assorted Sri Lankan & Western Desserts', 'Uniformed Service Crew & Cutlery Included']),
      sortOrder: 1,
    },
    {
      categoryId: catCatering.id,
      name: 'Corporate Functions & Conferences',
      slug: 'corporate-catering',
      description: 'High-standard corporate catering offering morning coffee breaks, executive buffet lunch, and afternoon high-tea savories.',
      basePrice: 2750,
      pricingUnit: 'PER_PERSON',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-47.jpg',
      features: JSON.stringify(['Mid-morning Gourmet Tea/Coffee', 'Executive Buffet with Continental & Local Options', 'Chafing Dishes & Food Warmers Included', 'Professional On-site Stewarding']),
      sortOrder: 2,
    },
    {
      categoryId: catCatering.id,
      name: 'Birthday & Private Celebrations',
      slug: 'birthday-parties',
      description: 'Fun, vibrant food options featuring finger foods, mini burgers, pasta counters, mocktail towers, and custom party treats.',
      basePrice: 2200,
      pricingUnit: 'PER_PERSON',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-34.jpg',
      features: JSON.stringify(['Kid-friendly & Gourmet Finger Food Platter', 'Live Pasta / Snack Counter', 'Unlimited Fruit Punch / Iced Tea Dispenser', 'Complete Setup & Cleanup Service']),
      sortOrder: 3,
    },
    {
      categoryId: catCatering.id,
      name: 'Traditional Festival & Cultural Catering',
      slug: 'festival-catering',
      description: 'Authentic celebratory Sri Lankan feasts (Alms Giving, Pirith Chanting, Avurudu, Christmas & Temple festivals) prepared with high culinary reverence.',
      basePrice: 1950,
      pricingUnit: 'PER_PERSON',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-46.jpg',
      features: JSON.stringify(['Authentic Yellow Rice / Ghee Rice with accompaniments', 'Traditional Clay Pots / Buffet Display', 'Watalappan, Curd & Treacle, Sweetmeats', 'Vegetarian & Halal-friendly preparations available']),
      sortOrder: 4,
    },
    {
      categoryId: catRentals.id,
      name: 'Full Event Infrastructure Package',
      slug: 'event-infrastructure-package',
      description: 'Turnkey equipment provisioning including weather-proof marquees, modular stage, VIP seating, sound truss, and power generation.',
      basePrice: 75000,
      pricingUnit: 'PER_EVENT',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-41.jpg',
      features: JSON.stringify(['Custom Marquee Sizing (Up to 500 Guests)', 'Heavy Duty Carpeting & Platform', 'Full Logistics, Erection & Dismantling Crew', 'Standby Electrical Generator Setup']),
      sortOrder: 5,
    },
    {
      categoryId: catLighting.id,
      name: 'Luxury Wedding Illumination & Theme Decor',
      slug: 'wedding-lighting-decor',
      description: 'Magical fairy light tunnels, ambient warm uplighting, crystal chandeliers, floral backdrop structure, and photo corner styling.',
      basePrice: 85000,
      pricingUnit: 'PER_EVENT',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-53.jpg',
      features: JSON.stringify(['Fairy Light Roof Canopy / Tunnel', 'Programmable LED Ambience Washes', 'Chandelier Hanging System', 'Floral Archway & Poruwa Accents']),
      sortOrder: 6,
    },
    {
      categoryId: catLighting.id,
      name: 'Stage & Concert Festival Lighting',
      slug: 'stage-festival-lighting',
      description: 'High-intensity stage lighting arrays, moving heads, spotlights, smoke machines, and dynamic beam control for concerts and festivals.',
      basePrice: 120000,
      pricingUnit: 'PER_EVENT',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-49.jpg',
      features: JSON.stringify(['Moving Head Beam Fixtures', 'LED Par Cans with DMX Console', 'Haze/Smoke Atmosphere Generation', 'Dedicated Lighting Technician']),
      sortOrder: 7,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
  }
  console.log('✅ Services created');

  // 4. Inventory Categories
  const invCats = [
    { name: 'Chairs & Seating', slug: 'chairs-seating', description: 'Banquet, Chiavari, and outdoor seating options' },
    { name: 'Tables & Dining', slug: 'tables-dining', description: 'Round banquet, buffet, and cocktail tables' },
    { name: 'Tents & Marquees', slug: 'tents-marquees', description: 'Weatherproof canopies, pyramid tents, and marquee pavilions' },
    { name: 'Stages & Platforms', slug: 'stages-platforms', description: 'Modular stages, red carpets, and truss backdrops' },
    { name: 'Catering Equipment', slug: 'catering-equipment', description: 'Buffet chafing dishes, drink dispensers, and cutlery sets' },
    { name: 'Festival & Power', slug: 'festival-power', description: 'High-power generators, misting fans, crowd control barricades' },
    { name: 'Lighting Fixtures', slug: 'lighting-fixtures', description: 'Fairy lights, LED pars, spotlights, and chandeliers' },
  ];

  const createdInvCats = {};
  for (const c of invCats) {
    createdInvCats[c.slug] = await prisma.inventoryCategory.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  // 5. Inventory Items with realistic Sri Lankan rental rates (LKR)
  const items = [
    {
      categoryId: createdInvCats['chairs-seating'].id,
      name: 'Gold Chiavari Chair with Cushion',
      sku: 'CHR-CHIAVARI-GOLD',
      description: 'Luxury golden Chiavari resin chairs with plush white leatherette cushion for high-end weddings and VIP events.',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-29.jpg',
      totalQuantity: 400,
      rentalPrice: 350, // LKR per day
      pricingUnit: 'PER_DAY',
      condition: 'EXCELLENT',
      status: 'AVAILABLE',
    },
    {
      categoryId: createdInvCats['chairs-seating'].id,
      name: 'Classic White Banquet Chair with Gold Bow',
      sku: 'CHR-BANQUET-WHT',
      description: 'Sturdy steel banquet chair with luxury white stretch cover and gold satin sash.',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-28.jpg',
      totalQuantity: 600,
      rentalPrice: 180,
      pricingUnit: 'PER_DAY',
      condition: 'EXCELLENT',
      status: 'AVAILABLE',
    },
    {
      categoryId: createdInvCats['tables-dining'].id,
      name: '6ft Round Banquet Table (10 Seater)',
      sku: 'TBL-ROUND-6FT',
      description: 'Heavy-duty foldable wooden round table comfortably seating 10 guests. Includes ivory underlay.',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-26.jpg',
      totalQuantity: 60,
      rentalPrice: 1200,
      pricingUnit: 'PER_DAY',
      condition: 'EXCELLENT',
      status: 'AVAILABLE',
    },
    {
      categoryId: createdInvCats['tables-dining'].id,
      name: 'Rectangular Buffet Service Table (6ft)',
      sku: 'TBL-BUFFET-6FT',
      description: 'Long banquet service table with black skirting for buffet and food displays.',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-27 2.jpg',
      totalQuantity: 40,
      rentalPrice: 1000,
      pricingUnit: 'PER_DAY',
      condition: 'EXCELLENT',
      status: 'AVAILABLE',
    },
    {
      categoryId: createdInvCats['tables-dining'].id,
      name: 'High Cocktail Standing Table with Spandex',
      sku: 'TBL-COCKTAIL-HIGH',
      description: 'Sleek bar-height cocktail table with black or champagne fitted spandex drape.',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-27.jpg',
      totalQuantity: 30,
      rentalPrice: 850,
      pricingUnit: 'PER_DAY',
      condition: 'EXCELLENT',
      status: 'AVAILABLE',
    },
    {
      categoryId: createdInvCats['tents-marquees'].id,
      name: 'Waterproof Wedding Marquee Tent (20x40 ft)',
      sku: 'TNT-MARQUEE-2040',
      description: 'Commercial grade galvanized frame marquee tent with elegant pleated ceiling draping and side curtains.',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-41.jpg',
      totalQuantity: 6,
      rentalPrice: 45000,
      pricingUnit: 'PER_DAY',
      condition: 'EXCELLENT',
      status: 'AVAILABLE',
    },
    {
      categoryId: createdInvCats['tents-marquees'].id,
      name: 'Canopy Gazebo Tent (10x10 ft)',
      sku: 'TNT-CANOPY-1010',
      description: 'Quick-setup pop-up canopy tent ideal for food stalls, registration desks, and beverage bars.',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-46.jpg',
      totalQuantity: 15,
      rentalPrice: 5000,
      pricingUnit: 'PER_DAY',
      condition: 'EXCELLENT',
      status: 'AVAILABLE',
    },
    {
      categoryId: createdInvCats['stages-platforms'].id,
      name: 'Modular Elevated Stage Platform (16x12 ft)',
      sku: 'STG-MODULAR-1612',
      description: 'Heavy duty aluminum modular stage with adjustable height (2ft-3ft), skirted, and dark grey carpeted surface.',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-37.jpg',
      totalQuantity: 4,
      rentalPrice: 28000,
      pricingUnit: 'PER_DAY',
      condition: 'EXCELLENT',
      status: 'AVAILABLE',
    },
    {
      categoryId: createdInvCats['catering-equipment'].id,
      name: 'Stainless Steel Roll-Top Chafing Dish',
      sku: 'CAT-CHAFING-ROLTOP',
      description: 'Deluxe round and rectangular roll-top buffet food warmers with stern-fuel burners.',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-47.jpg',
      totalQuantity: 50,
      rentalPrice: 750,
      pricingUnit: 'PER_DAY',
      condition: 'EXCELLENT',
      status: 'AVAILABLE',
    },
    {
      categoryId: createdInvCats['catering-equipment'].id,
      name: 'Beverage & Juice Dispenser (12L Double Bowl)',
      sku: 'CAT-JUICE-DISP12L',
      description: 'Chilled iced beverage dispenser with stainless steel ice core for welcome drinks.',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-49 2.jpg',
      totalQuantity: 12,
      rentalPrice: 1500,
      pricingUnit: 'PER_DAY',
      condition: 'EXCELLENT',
      status: 'AVAILABLE',
    },
    {
      categoryId: createdInvCats['festival-power'].id,
      name: 'Soundproof Silent Diesel Generator (45 kVA)',
      sku: 'GEN-DIESEL-45KVA',
      description: 'Ultra-quiet 3-phase diesel generator with automated voltage stabilization for outdoor lighting and sound systems.',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-50.jpg',
      totalQuantity: 3,
      rentalPrice: 35000,
      pricingUnit: 'PER_DAY',
      condition: 'EXCELLENT',
      status: 'AVAILABLE',
    },
    {
      categoryId: createdInvCats['lighting-fixtures'].id,
      name: 'LED RGBW PAR Stage Can (54x3W)',
      sku: 'LGT-PAR-54LED',
      description: 'High output stage and wall wash lighting with DMX control for indoor and outdoor ambiance.',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-49.jpg',
      totalQuantity: 40,
      rentalPrice: 800,
      pricingUnit: 'PER_DAY',
      condition: 'EXCELLENT',
      status: 'AVAILABLE',
    },
    {
      categoryId: createdInvCats['lighting-fixtures'].id,
      name: 'Warm Fairy Light Festoon String (100m Roll)',
      sku: 'LGT-FAIRY-100M',
      description: 'Commercial warm-white weatherproof twinkle light string for trees, marquee ceilings, and garden pathways.',
      imageUrl: '/images/real/PHOTO-2026-11-04-21-37-53.jpg',
      totalQuantity: 25,
      rentalPrice: 4500,
      pricingUnit: 'PER_DAY',
      condition: 'EXCELLENT',
      status: 'AVAILABLE',
    },
  ];

  for (const itm of items) {
    await prisma.inventoryItem.upsert({
      where: { sku: itm.sku },
      update: {},
      create: itm,
    });
  }
  console.log('✅ Inventory items created');

  // 6. Realistic Customers
  const customer1 = await prisma.customer.create({
    data: {
      name: 'Kasun Wickramasinghe',
      phone: '+94 77 458 9123',
      whatsapp: '+94774589123',
      email: 'kasun.wick@gmail.com',
      address: 'No. 42, Ward Place, Colombo 07',
      notes: 'Prefers communication via WhatsApp. Wedding reception at Mount Lavinia.',
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: 'Dilani Perera (MAS Holdings)',
      phone: '+94 71 892 3456',
      whatsapp: '+94718923456',
      email: 'dilani.p@masholdings.com',
      address: 'Biyagama Free Trade Zone, Malwana',
      notes: 'Corporate event coordinator for annual awards banquet.',
    },
  });

  const customer3 = await prisma.customer.create({
    data: {
      name: 'Rohan Senanayake',
      phone: '+94 76 331 4589',
      whatsapp: '+94763314589',
      email: 'rohan.sen@outlook.com',
      address: 'Hill Crest Gardens, Kandy',
      notes: '21st Birthday party celebration outdoors.',
    },
  });

  // 7. Realistic Bookings with Multi-Service Breakdown & Payments
  // Today's base
  const now = new Date();
  const dateIn = (daysAhead) => new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);

  // Booking 1: Confirmed Wedding in 5 days
  const b1 = await prisma.booking.create({
    data: {
      bookingNumber: 'BK-2026-001',
      customerId: customer1.id,
      eventType: 'Wedding Reception',
      eventLocation: 'Mount Lavinia Hotel Beach Lawn, Colombo',
      startDate: dateIn(5),
      endDate: dateIn(6),
      status: 'CONFIRMED',
      cateringAmount: 770000, // 200 guests * 3850
      rentalAmount: 115000,
      lightingAmount: 95000,
      discount: 20000,
      totalAmount: 960000,
      advanceAmount: 500000,
      paidAmount: 500000,
      guestCount: 200,
      notes: 'Gold Chiavari chairs required. Buffet with live BBQ station. Elegant fairy light canopy.',
    },
  });

  // Services breakdown for B1
  await prisma.bookingService.createMany({
    data: [
      { bookingId: b1.id, serviceType: 'CATERING', name: 'Grand Wedding Buffet (200 pax)', amount: 770000 },
      { bookingId: b1.id, serviceType: 'RENTALS', name: 'Marquee Tent & Chiavari Chairs', amount: 115000 },
      { bookingId: b1.id, serviceType: 'LIGHTING', name: 'Fairy Light Roof & Warm Ambiance', amount: 95000 },
    ],
  });

  // Payment for B1
  await prisma.payment.create({
    data: {
      paymentNumber: 'PAY-2026-001',
      bookingId: b1.id,
      amount: 500000,
      paymentMethod: 'BANK_TRANSFER',
      paymentDate: new Date(),
      reference: 'BOC-TX-889421',
      notes: '50% Initial Advance Deposit received via Bank of Ceylon',
      recordedBy: 'Admin',
    },
  });

  // Booking 2: Corporate Conference next week
  const b2 = await prisma.booking.create({
    data: {
      bookingNumber: 'BK-2026-002',
      customerId: customer2.id,
      eventType: 'Corporate Annual Gala',
      eventLocation: 'BMICH Main Convention Hall, Colombo',
      startDate: dateIn(12),
      endDate: dateIn(13),
      status: 'CONFIRMED',
      cateringAmount: 412500, // 150 guests * 2750
      rentalAmount: 85000,
      lightingAmount: 120000,
      discount: 17500,
      totalAmount: 600000,
      advanceAmount: 300000,
      paidAmount: 300000,
      guestCount: 150,
      notes: 'Includes morning coffee break, executive buffet lunch, and stage presentation lighting.',
    },
  });

  await prisma.payment.create({
    data: {
      paymentNumber: 'PAY-2026-002',
      bookingId: b2.id,
      amount: 300000,
      paymentMethod: 'CHEQUE',
      paymentDate: new Date(),
      reference: 'CHQ-COMMERCIAL-9901',
      notes: 'Company Advance Cheque cleared',
      recordedBy: 'Admin',
    },
  });

  // Booking 3: Pending Enquiry for Birthday
  await prisma.booking.create({
    data: {
      bookingNumber: 'BK-2026-003',
      customerId: customer3.id,
      eventType: '21st Birthday Party',
      eventLocation: 'Private Residence Lawn, Kandy',
      startDate: dateIn(18),
      endDate: dateIn(19),
      status: 'ENQUIRY',
      cateringAmount: 176000, // 80 guests * 2200
      rentalAmount: 45000,
      lightingAmount: 35000,
      discount: 0,
      totalAmount: 256000,
      advanceAmount: 0,
      paidAmount: 0,
      guestCount: 80,
      notes: 'Requested quotation for canopy tents, sound system, and cocktail standing tables.',
    },
  });

  // 8. Operating Expenses (Realistic LKR figures)
  await prisma.expense.createMany({
    data: [
      {
        expenseNumber: 'EXP-2026-001',
        category: 'INGREDIENTS',
        title: 'Fresh Meat, Seafood & Spices Purchase',
        amount: 145000,
        vendor: 'Cargills FoodCity Wholesale & Negombo Fish Market',
        description: 'Quality chicken, prawns, basmati rice, and spices for upcoming wedding banquet.',
        recordedBy: 'Head Chef',
      },
      {
        expenseNumber: 'EXP-2026-002',
        category: 'FUEL_TRANSPORT',
        title: 'Diesel for Transport Trucks & Generator',
        amount: 32000,
        vendor: 'Ceypetco Fuel Station, Wattala',
        description: 'Fuel for 2 lorries and 45kVA generator tank.',
        recordedBy: 'Logistics Manager',
      },
      {
        expenseNumber: 'EXP-2026-003',
        category: 'STAFF_WAGES',
        title: 'Event Service Staff & Kitchen Crew Wages',
        amount: 68000,
        vendor: 'BM Catering Staff Pool',
        description: 'Advance wages for 12 waitstaff and 4 culinary assistants.',
        recordedBy: 'Operations Manager',
      },
      {
        expenseNumber: 'EXP-2026-004',
        category: 'EQUIPMENT_MAINTENANCE',
        title: 'Marquee Tent Canvas Patching & Chair Re-cushioning',
        amount: 24500,
        vendor: 'Industrial Canvas & Upholstery Works',
        description: 'Refurbished 15 chair cushions and reinforced tent grommets.',
        recordedBy: 'Inventory Supervisor',
      },
    ],
  });

  // 9. Gallery Images using user's real uploaded photos!
  const galleryItems = [
    { title: 'Deluxe Wedding Buffet Setup', category: 'CATERING', imageUrl: '/images/real/PHOTO-2026-11-04-21-37-27.jpg', featured: true, sortOrder: 1 },
    { title: 'Executive Warmers & Chafing Station', category: 'CATERING', imageUrl: '/images/real/PHOTO-2026-11-04-21-37-47.jpg', featured: true, sortOrder: 2 },
    { title: 'Authentic Traditional Festival Spread', category: 'CATERING', imageUrl: '/images/real/PHOTO-2026-11-04-21-37-46.jpg', featured: false, sortOrder: 3 },
    { title: 'Luxury Weatherproof Marquee Tent', category: 'EQUIPMENT', imageUrl: '/images/real/PHOTO-2026-11-04-21-37-41.jpg', featured: true, sortOrder: 4 },
    { title: 'Outdoor Celebration Canopy Stalls', category: 'EQUIPMENT', imageUrl: '/images/real/PHOTO-2026-11-04-21-37-26.jpg', featured: false, sortOrder: 5 },
    { title: 'High-Impact Stage & Festival Lighting', category: 'LIGHTING', imageUrl: '/images/real/PHOTO-2026-11-04-21-37-49.jpg', featured: true, sortOrder: 6 },
    { title: 'Enchanted Evening Fairy Light Garden', category: 'LIGHTING', imageUrl: '/images/real/PHOTO-2026-11-04-21-37-53.jpg', featured: true, sortOrder: 7 },
    { title: 'Corporate Gala Stage Presentation', category: 'CORPORATE', imageUrl: '/images/real/PHOTO-2026-11-04-21-37-37.jpg', featured: false, sortOrder: 8 },
    { title: 'Birthday Celebration & Finger Food Bar', category: 'CATERING', imageUrl: '/images/real/PHOTO-2026-11-04-21-37-34.jpg', featured: false, sortOrder: 9 },
    { title: 'Gold Chiavari VIP Seating Arrangement', category: 'EQUIPMENT', imageUrl: '/images/real/PHOTO-2026-11-04-21-37-29.jpg', featured: true, sortOrder: 10 },
  ];

  for (const g of galleryItems) {
    await prisma.galleryImage.create({ data: g });
  }

  // 10. Website Content
  await prisma.websiteContent.upsert({
    where: { section: 'HERO' },
    update: {},
    create: {
      section: 'HERO',
      title: 'Sri Lanka’s Premier Luxury Event & Catering Specialist',
      subtitle: 'From magnificent weddings and vibrant festivals to corporate conferences — delivering culinary excellence, luxury equipment rentals, and breathtaking lighting design.',
      content: {
        ctaText: 'Request a Quotation',
        secondaryCta: 'Explore Rental Catalogue',
        phone: '+94 77 123 4567',
        whatsapp: '+94771234567',
        experienceYears: '15+',
        eventsCompleted: '2,500+',
        guestSatisfaction: '99.4%',
      },
    },
  });

  console.log('🎉 Seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
