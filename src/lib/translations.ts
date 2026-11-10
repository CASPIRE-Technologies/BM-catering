export type Language = "en" | "si";

export const translations = {
  en: {
    // Top banner
    topBanner: "Now taking reservations for upcoming wedding & festival seasons across Sri Lanka",
    phone: "+94 77 123 4567",
    staffPortal: "Staff Portal",

    // Navigation
    nav: {
      home: "Home",
      services: "Services",
      rentals: "Rental Catalogue",
      gallery: "Gallery",
      book: "Booking Enquiry",
      contact: "Contact",
      quoteBtn: "Rental Quote",
      bookBtn: "Book Event",
      tagline: "Luxury Events • Rentals • Decor",
    },

    // Hero Section
    hero: {
      trustBadge: "Sri Lanka's Leading Luxury Event & Banquet Specialist",
      titlePre: "Unforgettable Celebrations, Crafted with",
      titleHighlight: "Perfection",
      subtitle:
        "From regal wedding banquets and outdoor festivals to corporate conferences — we provide exquisite catering, luxury marquees, furniture rentals, and enchanting lighting design.",
      bookCta: "Book Your Event",
      rentalsCta: "Explore Rental Catalogue",
      stats: {
        yearsVal: "15+ Years",
        yearsLabel: "Catering Excellence",
        eventsVal: "5,000+",
        eventsLabel: "Events Hosted",
        halalVal: "100%",
        halalLabel: "Halal Certified Kitchens",
        quoteVal: "1 Hour",
        quoteLabel: "Fast Quotation Delivery",
      },
    },

    // Core Services Section
    servicesSection: {
      kicker: "Comprehensive Event Solutions",
      title: "Everything You Need for a Grand Celebration",
      subtitle:
        "We integrate gourmet catering, modern event infrastructure, and bespoke ambient lighting under one trusted management.",
      service1: {
        tag: "Culinary Artistry",
        title: "Banquet & Wedding Catering",
        desc: "Live cooking stations, Sri Lankan traditional feasts, Western carving stations, Arabic biryani banquets, and customized dessert displays crafted by master chefs.",
        bullet1: "Live Hoppers, Kottu & BBQ Grills",
        bullet2: "Customized 3 to 7-Course Banquets",
        bullet3: "Halal Certified Meats & Hygienic Prep",
        cta: "Explore Catering Menus",
      },
      service2: {
        tag: "Event Infrastructure",
        title: "Marquee, Chair & Stage Rentals",
        desc: "Heavy-duty waterproof aluminium A-frame marquees, gold Chiavari chairs, round banquet tables, red carpets, VIP stage sets, and buffet warmers.",
        bullet1: "Waterproof A-Frame Aluminium Tents",
        bullet2: "Gold & White Chiavari Chairs",
        bullet3: "VIP Sofa Lounges & Stages",
        cta: "Browse Rental Inventory",
      },
      service3: {
        tag: "Atmosphere & Ambience",
        title: "Fairy Lights & Stage Illumination",
        desc: "Warm white fairy light tunnels, canopy festoon drops, moving head stage beams, ambient uplighting, and soundproof standby diesel generators.",
        bullet1: "Overhead Fairy Light Drapes & Tunnels",
        bullet2: "Intelligent Stage & Spot Lighting",
        bullet3: "Silent Standby Diesel Generators",
        cta: "Discover Lighting Packages",
      },
    },

    // Featured Rentals Section
    featuredRentals: {
      kicker: "Depot Inventory",
      title: "Popular Event Rental Assets",
      subtitle:
        "Reserve chairs, banquet tables, marquees, and catering chaffing dishes with verified live availability.",
      viewAll: "View Complete Rental Catalogue",
      addToCart: "Add to Quote",
      added: "Added",
      perDay: "per day",
      available: "available",
    },

    // Why Us Section
    whyUs: {
      kicker: "The B.M Standard",
      title: "Why Leading Planners Choose Us",
      subtitle:
        "Over 15 years of delivering flawless event production for high-profile weddings, corporate summits, and cultural galas.",
      feature1Title: "100% Halal Certified",
      feature1Desc:
        "All meats and cooking processes strictly adhere to Halal requirements with dedicated clean kitchens and certification.",
      feature2Title: "Own Heavy Inventory",
      feature2Desc:
        "Over 2,000 Chiavari chairs, 50,000 sq.ft of marquees, and 40+ transport vehicles stationed islandwide.",
      feature3Title: "Dedicated Event Coordinators",
      feature3Desc:
        "Every booking gets a dedicated site manager to coordinate logistics from initial setup to final post-event teardown.",
      feature4Title: "Reliable Backup Power",
      feature4Desc:
        "Standby soundproof generators included with marquee and lighting packages to guarantee zero power interruptions.",
    },

    // Gallery Teaser Section
    gallerySection: {
      kicker: "Event Portfolio",
      title: "Moments from Recent Celebrations",
      subtitle: "See how we transform venues into enchanting, memorable spaces across Sri Lanka.",
      viewAll: "View Full Gallery",
    },

    // CTA Banner
    ctaBanner: {
      title: "Ready to Plan an Extraordinary Event?",
      subtitle:
        "Get an immediate quotation, menu tasting schedule, or equipment inventory reservation with our senior banquet team.",
      bookOnline: "Book Your Event Online",
      callUs: "Call Concierge",
      whatsapp: "WhatsApp Instant Quote",
    },

    // Rentals Page
    rentalsPage: {
      kicker: "B.M Catering Equipment Depots",
      title: "Event & Festival Rental Catalogue",
      subtitle:
        "Reserve high-quality marquees, Chiavari chairs, banquet furniture, tableware, and lighting setups. Add items to your quotation request cart for instant pricing.",
      searchPlaceholder: "Search items (e.g. Chiavari, Marquee, Chafing, Stage)...",
      allCategory: "All Items",
      available: "available",
      outOfStock: "Booked",
      pricingUnit: "/ day",
      selectedDates: "Event Rental Dates",
      startDate: "Start Date",
      endDate: "End Date",
      cartTotal: "Selected Items Total",
      itemsInCart: "items selected",
      reviewQuote: "Review & Request Quote",
      noResults: "No equipment found matching your criteria.",
      resetFilters: "Reset Filters",
    },

    // Gallery Page
    galleryPage: {
      kicker: "Real Moments",
      title: "Luxury Event Gallery",
      subtitle:
        "Explore real banquets, marquee setups, and lighting designs executed across Sri Lanka.",
      all: "All Events",
      weddings: "Weddings",
      rentals: "Rentals & Setup",
      lighting: "Lighting",
      corporate: "Corporate",
      buffets: "Banquet Buffets",
      noImages: "No images found for this category.",
    },

    // Book Page
    bookPage: {
      kicker: "Reserve Your Date",
      title: "Event Booking & Quotation Request",
      subtitle:
        "Provide your event details below. Our planning team will verify date availability and send an official itemized quotation via WhatsApp and email.",
      sec1: "1. Client & Contact Information",
      name: "Full Name / Organization",
      namePlaceholder: "e.g. Mohamed Rizwan / Ceylon Enterprises",
      phone: "Phone (WhatsApp Preferred)",
      phonePlaceholder: "+94 77 123 4567",
      email: "Email Address",
      emailPlaceholder: "rizwan@example.com",
      sec2: "2. Event Details",
      eventType: "Event Type",
      eventTypes: {
        wedding: "Wedding Reception",
        homecoming: "Homecoming Banquet",
        corporate: "Corporate Summit / Gala",
        birthday: "Birthday / Private Celebration",
        festival: "Religious / Cultural Festival",
        other: "Other Event",
      },
      eventDate: "Event Date",
      guestCount: "Estimated Guest Count",
      guestsPlaceholder: "e.g. 350",
      venue: "Event Venue / City Location",
      venuePlaceholder: "e.g. Colombo, Kandy, Galle, Negombo...",
      sec3: "3. Services Required",
      reqCatering: "Banquet Catering",
      reqCateringDesc: "Buffet, live cooking, waiters & tableware",
      reqRentals: "Equipment Rentals",
      reqRentalsDesc: "Marquees, tables, Chiavari chairs, stage",
      reqLighting: "Stage & Lighting",
      reqLightingDesc: "Fairy lights, chandeliers, spotlights & power",
      sec4: "4. Special Notes & Menu Preferences",
      notesPlaceholder:
        "Mention specific menu preferences, dietary needs, marquee dimensions, or schedule requirements...",
      submitBtn: "Submit Booking Enquiry",
      submitting: "Submitting Enquiry...",
      trustGuarantee: "Official quotation delivered within 1 hour. No payment required upfront.",
      successTitle: "Enquiry Received Successfully!",
      successRef: "Reference Number",
      successDesc:
        "Thank you for contacting B.M Catering. Our banquet manager will review your requirements and send a customized quotation within 1 hour.",
      submitAnother: "Submit Another Enquiry",
    },

    // Contact Page
    contactPage: {
      kicker: "We are here for you",
      title: "Connect With B.M Catering",
      subtitle:
        "Reach out via phone, WhatsApp, or visit our central offices and equipment warehouse in Colombo.",
      officeTitle: "Central Head Office & Warehouse",
      address: "No. 142/5 Galle Road, Colombo 03, Sri Lanka",
      phoneTitle: "Direct Phone Line",
      whatsappTitle: "WhatsApp Business Support",
      emailTitle: "Email Inquiries",
      hoursTitle: "Operating Hours",
      hours: "Monday – Sunday: 8:00 AM – 8:00 PM (Emergency line active 24/7)",
      formTitle: "Send Us a Message",
      formSubtitle: "Our event planning desk responds within 30 minutes during business hours.",
      nameLabel: "Your Name",
      phoneLabel: "Phone Number",
      emailLabel: "Email Address",
      subjectLabel: "Subject",
      subjectPlaceholder: "e.g. Inquiring about wedding dates in December",
      messageLabel: "Message",
      messagePlaceholder: "Tell us about your event vision, dates, expected guest count...",
      sendBtn: "Send Message",
      sentSuccess: "Message sent! We will contact you shortly.",
      halalBadge: "100% Halal Certified Kitchens & Facilities",
    },

    // Services Page
    servicesPage: {
      kicker: "Our Expertise",
      title: "Complete Banqueting, Rental & Lighting Services",
      subtitle:
        "From intimate backyard celebrations to 2,000+ guest national festival marquees — we manage catering, event infrastructure, and lighting.",
      cateringTitle: "1. Luxury Banquet & Wedding Catering",
      rentalsTitle: "2. Marquee, Chair & Equipment Rentals",
      lightingTitle: "3. Fairy Lights, Sound & Stage Illumination",
      culturalTitle: "4. Cultural & Religious Festivity Setups",
    },

    // Quotation Drawer
    drawer: {
      title: "Quotation Request Cart",
      itemsCount: "items",
      emptyTitle: "Your quotation list is empty",
      emptyDesc: "Browse our rental catalogue to add chairs, marquees, tables, and lighting for your event.",
      browseBtn: "Browse Equipment Rentals →",
      clearAll: "Clear All",
      dailyRate: "per day",
      totalEstimate: "Total Equipment Rental",
      proceedBtn: "Proceed to Booking Enquiry",
    },

    // Footer
    footer: {
      tagline: "Luxury Events & Rentals",
      bio: "Sri Lanka's premier event partner offering gourmet banquet catering, luxury marquees, furniture rentals, and enchanting lighting design for memorable occasions.",
      halalCert: "100% Halal Certified • Registered Sri Lankan Business",
      coreServices: "Our Core Services",
      service1: "Banquet & Wedding Catering",
      service2: "Marquee, Chair & Stage Rentals",
      service3: "Fairy Lights & Stage Illumination",
      service4: "Equipment Rental Catalogue",
      service5: "Cultural Festival Packages",
      quickLinks: "Quick Navigation",
      linkHome: "Home",
      linkGallery: "Event Gallery",
      linkBook: "Book Date & Request Quote",
      linkContact: "Contact & Warehouse",
      linkStaff: "Staff & Management Portal",
      contactInfo: "Contact & Head Office",
      rights: "All rights reserved. Professional Event Caterers & Infrastructure Specialists.",
    },

    // WhatsApp Floating Button
    whatsapp: {
      support: "Instant Support",
      chat: "Chat on WhatsApp",
      defaultMsg: "Hello B.M Catering! I would like to inquire about event catering and equipment rentals.",
    },
  },

  si: {
    // Top banner
    topBanner: "ශ්‍රී ලංකාව පුරා ඉදිරි මංගල සහ උත්සව සමය සඳහා දැන් වෙන්කිරීම් සිදුකෙරේ",
    phone: "+94 77 123 4567",
    staffPortal: "කාර්ය මණ්ඩලය",

    // Navigation
    nav: {
      home: "මුල් පිටුව",
      services: "සේවාවන්",
      rentals: "උපකරණ නාමාවලිය",
      gallery: "ඡායාරූප ගැලරිය",
      book: "වෙන්කිරීම් විමසීම්",
      contact: "සම්බන්ධ වන්න",
      quoteBtn: "මිල ගණන්",
      bookBtn: "දිනය වෙන්කරන්න",
      tagline: "සුඛෝපභෝගී උත්සව • උපකරණ • ආලෝකකරණය",
    },

    // Hero Section
    hero: {
      trustBadge: "ශ්‍රී ලංකාවේ ප්‍රමුඛතම සුඛෝපභෝගී උත්සව සහ භෝජන සංග්‍රහ විශේෂඥයා",
      titlePre: "අමතක නොවන උත්සව සැමරුම්, අසමසම",
      titleHighlight: "විශිෂ්ටත්වයෙන්",
      subtitle:
        "රාජකීය මංගල භෝජන සංග්‍රහ, එළිමහන් උත්සව සහ ව්‍යාපාරික සමුළු සඳහා ප්‍රණීත ආහාර පාන, සුඛෝපභෝගී කූඩාරම් (Marquees), උත්සව උපකරණ සහ ආකර්ෂණීය ආලෝකකරණ සේවා.",
      bookCta: "ඔබගේ දිනය වෙන්කරන්න",
      rentalsCta: "උපකරණ නාමාවලිය බලන්න",
      stats: {
        yearsVal: "වසර 15+",
        yearsLabel: "විශිෂ්ට සේවා පළපුරුද්ද",
        eventsVal: "5,000+",
        eventsLabel: "සාර්ථක උත්සව",
        halalVal: "100%",
        halalLabel: "හලාල් සහතිකලත් මුළුතැන්ගෙවල්",
        quoteVal: "පැය 1",
        quoteLabel: "කඩිනම් මිල ගණන් ලබාදීම",
      },
    },

    // Core Services Section
    servicesSection: {
      kicker: "සම්පූර්ණ උත්සව විසඳුම්",
      title: "භෝජන සහ උත්සව සැමරුම් සඳහා අවශ්‍ය සියල්ල එකම තැනකින්",
      subtitle:
        "ප්‍රණීත ආහාර පාන, නවීන උත්සව උපකරණ සහ මනරම් ආලෝකකරණය විශ්වාසනීය එකම සෙවණක් යටින් ලබාගන්න.",
      service1: {
        tag: "ප්‍රණීත ආහාර කලාව",
        title: "මංගල සහ විශේෂ භෝජන සංග්‍රහ",
        desc: "සජීවී ඉවුම් පිහුම් කුටි, සම්ප්‍රදායික ශ්‍රී ලාංකේය ආහාර, බටහිර සහ අරාබි බුරියානි භෝජන සංග්‍රහ සමඟ ප්‍රවීණ සූපවේදීන් පිළියෙල කරන විශේෂ අතුරුපස.",
        bullet1: "සජීවී ආප්ප, කොත්තු සහ BBQ ග්‍රිල්ස්",
        bullet2: "පාඨමාලා 3 සිට 7 දක්වා වූ විශේෂ භෝජන",
        bullet3: "100% හලාල් සහතිකලත් පිරිසිදු සැකසුම",
        cta: "මෙනු විස්තර බලන්න",
      },
      service2: {
        tag: "උත්සව උපකරණ සංචිතය",
        title: "කූඩාරම්, පුටු සහ වේදිකා කුලියට දීම",
        desc: "ජලයට ඔරොත්තු දෙන ශක්තිමත් ඇලුමිනියම් කූඩාරම් (A-Frame Marquees), රන්වන් සහ සුදු චියාවරි පුටු, රවුම් මේස, රතු පලස්, වී.අයි.පී වේදිකා සහ බුෆේ උණුසුම්කාරක.",
        bullet1: "වෝටර්පෲෆ් A-Frame ඇලුමිනියම් කූඩාරම්",
        bullet2: "රන්වන් සහ සුදු චියාවරි (Chiavari) පුටු",
        bullet3: "VIP සෝෆා සහ අලංකාර වේදිකා",
        cta: "උපකරණ නාමාවලිය බලන්න",
      },
      service3: {
        tag: "මනරම් ආලෝකකරණය",
        title: "විදුලි බුබුළු සහ වේදිකා ආලෝකකරණය",
        desc: "උත්සව විදුලි බුබුළු සැරසිලි (Fairy light tunnels), මංගල මණ්ඩප ආලෝකකරණය, ස්ටේජ් ලයිට්ස්, ඇම්බියන්ට් ලයිටින් සහ ශබ්ද රහිත ඩීසල් ජනක යන්ත්‍ර.",
        bullet1: "විදුලි බුබුළු වියන් සහ උමං මාර්ග සැරසිලි",
        bullet2: "ස්මාර්ට් ස්ටේජ් බීම්ස් සහ ස්පොට් ලයිට්ස්",
        bullet3: "ශබ්ද රහිත අතිරේක ඩීසල් ජනක යන්ත්‍ර",
        cta: "ආලෝකකරණ පැකේජ බලන්න",
      },
    },

    // Featured Rentals Section
    featuredRentals: {
      kicker: "උපකරණ ගබඩාව",
      title: "ජනප්‍රිය උත්සව උපකරණ",
      subtitle:
        "පුටු, මේස, කූඩාරම් සහ ආහාර බඳුන් සජීවීව පරීක්ෂා කර වෙන්කරවා ගන්න.",
      viewAll: "සම්පූර්ණ උපකරණ නාමාවලිය බලන්න",
      addToCart: "මිල ගණන් ලැයිස්තුවට",
      added: "එක් කළා",
      perDay: "දිනකට",
      available: "තිබේ",
    },

    // Why Us Section
    whyUs: {
      kicker: "බී.එම්. සුවිශේෂත්වය",
      title: "ප්‍රමුඛ පෙළේ උත්සව සංවිධායකයින් අපව තෝරාගන්නේ ඇයි",
      subtitle:
        "වසර 15කට වැඩි කාලයක් පුරා ප්‍රමුඛ පෙළේ මංගල උත්සව, ව්‍යාපාරික සමුළු සහ සංස්කෘතික උත්සව සාර්ථකව මෙහෙයවූ විශිෂ්ටත්වය.",
      feature1Title: "100% හලාල් සහතිකලත්",
      feature1Desc:
        "සියලුම මස් වර්ග සහ ආහාර පිසීමේ ක්‍රියාවලීන් දැඩි හලාල් ප්‍රමිතීන්ට අනුකූලව පිරිසිදු මුළුතැන්ගෙවල් තුළ සකස් කෙරේ.",
      feature2Title: "විශාල උපකරණ සංචිතය",
      feature2Desc:
        "පුටු 2,000+ ක්, වර්ග අඩි 50,000+ ක කූඩාරම් සහ දිවයින පුරා ප්‍රවාහන රථ 40+ ක ස්ථිර සංචිතයක්.",
      feature3Title: "කැපවූ උත්සව සම්බන්ධීකාරකවරුන්",
      feature3Desc:
        "සැකසුමේ සිට අවසානය දක්වා සියලු කටයුතු අධීක්ෂණය කිරීමට කැපවූ ප්‍රධාන කළමනාකරුවෙකු සේවයේ යෙදවේ.",
      feature4Title: "නොබිඳෙන විදුලි සැපයුම",
      feature4Desc:
        "උත්සවය කිසිදු බාධාවකින් තොරව පවත්වා ගැනීමට ශබ්ද රහිත අතිරේක ජනක යන්ත්‍ර පහසුකම් ලබාදේ.",
    },

    // Gallery Teaser Section
    gallerySection: {
      kicker: "උත්සව අවස්ථා",
      title: "මෑතකදී නිමකළ උත්සව සැමරුම්",
      subtitle: "දිවයින පුරා අප මනරම් ලෙස නිර්මාණය කළ සැබෑ උත්සව අවස්ථා නරඹන්න.",
      viewAll: "සම්පූර්ණ ගැලරිය නරඹන්න",
    },

    // CTA Banner
    ctaBanner: {
      title: "ඔබගේ විශේෂ දිනය අමතක නොවන අයුරින් සැලසුම් කිරීමට සූදානම්ද?",
      subtitle:
        "අපගේ ජ්‍යෙෂ්ඨ උත්සව සැලසුම් කණ්ඩායම සමඟ වහාම සම්බන්ධ වී මිල ගණන් සහ මෙනු විස්තර ලබාගන්න.",
      bookOnline: "ඔන්ලයින් වෙන්කරවා ගන්න",
      callUs: "අප අමතන්න",
      whatsapp: "වට්ස්ඇප් මඟින් මිල ගණන්",
    },

    // Rentals Page
    rentalsPage: {
      kicker: "බී.එම්. කේටරින් උපකරණ ගබඩාව",
      title: "උත්සව උපකරණ කුලියට දීමේ නාමාවලිය",
      subtitle:
        "උසස් තත්ත්වයේ කූඩාරම්, පුටු, මේස, ආහාර පිඟන් භාණ්ඩ සහ ආලෝකකරණ උපකරණ ඔබේ මිල ගණන් ඉල්ලුම්පත් ලැයිස්තුවට පහසුවෙන්ම එක්කරගන්න.",
      searchPlaceholder: "උපකරණ සොයන්න (උදා: චියාවරි පුටු, කූඩාරම්, බුෆේ බඳුන්)...",
      allCategory: "සියලුම උපකරණ",
      available: "තිබේ",
      outOfStock: "වෙන්වී ඇත",
      pricingUnit: "/ දිනකට",
      selectedDates: "උපකරණ අවශ්‍ය දින වකවානුව",
      startDate: "ආරම්භක දිනය",
      endDate: "අවසන් දිනය",
      cartTotal: "තෝරාගත් උපකරණ මුළු එකතුව",
      itemsInCart: "තෝරාගත් භාණ්ඩ ගණන",
      reviewQuote: "මිල ගණන් ඉල්ලුම්පත පරීක්ෂා කරන්න",
      noResults: "ඔබ සෙවූ උපකරණ හමු නොවීය.",
      resetFilters: "පෙරහන් යළි සකසන්න",
    },

    // Gallery Page
    galleryPage: {
      kicker: "සැබෑ උත්සව අවස්ථා",
      title: "සුඛෝපභෝගී උත්සව ඡායාරූප එකතුව",
      subtitle:
        "දිවයින පුරා අප සාර්ථකව නිමකළ උත්සව, කූඩාරම් සහ ආලෝකකරණ නිර්මාණ නරඹන්න.",
      all: "සියලුම උත්සව",
      weddings: "මංගල උත්සව",
      rentals: "උපකරණ සහ සැකසුම්",
      lighting: "ආලෝකකරණය",
      corporate: "ව්‍යාපාරික උත්සව",
      buffets: "භෝජන සංග්‍රහ බුෆේ",
      noImages: "මෙම කාණ්ඩය යටතේ ඡායාරූප නොමැත.",
    },

    // Book Page
    bookPage: {
      kicker: "ඔබගේ දිනය වෙන්කරන්න",
      title: "උත්සව වෙන්කිරීම සහ මිල ගණන් ඉල්ලීම",
      subtitle:
        "පහත පෝරමය පුරවා ඔබගේ උත්සව විස්තර ලබාදෙන්න. අපගේ කණ්ඩායම දිනය තහවුරු කර නිල මිල ගණන් ලේඛනයක් වට්ස්ඇප් සහ ඊමේල් මඟින් එවනු ඇත.",
      sec1: "1. පාරිභෝගික සහ සම්බන්ධතා විස්තර",
      name: "සම්පූර්ණ නම / ආයතනය",
      namePlaceholder: "උදා: මොහොමඩ් රිස්වාන් / සිලෝන් එන්ටර්ප්‍රයිසස්",
      phone: "දුරකථන අංකය (WhatsApp)",
      phonePlaceholder: "+94 77 123 4567",
      email: "ඊමේල් ලිපිනය",
      emailPlaceholder: "rizwan@example.com",
      sec2: "2. උත්සව විස්තර",
      eventType: "උත්සව වර්ගය",
      eventTypes: {
        wedding: "මංගල උත්සවය (Wedding Reception)",
        homecoming: "දෙවැනි ගමන (Homecoming Banquet)",
        corporate: "ව්‍යාපාරික සමුළුව / සාදය",
        birthday: "උපන්දින / පෞද්ගලික උත්සවය",
        festival: "ආගමික / සංස්කෘතික උත්සවය",
        other: "වෙනත් උත්සවයක්",
      },
      eventDate: "උත්සව දිනය",
      guestCount: "ආරාධිතයින් සංඛ්‍යාව",
      guestsPlaceholder: "උදා: 350",
      venue: "උත්සවය පැවැත්වෙන ස්ථානය / නගරය",
      venuePlaceholder: "උදා: කොළඹ, නුවර, ගාල්ල, මීගමුව...",
      sec3: "3. අවශ්‍ය සේවාවන්",
      reqCatering: "භෝජන සංග්‍රහ සේවාව (Catering)",
      reqCateringDesc: "බුෆේ, සජීවී ඉවුම් පිහුම් කුටි, වේටර්වරු සහ පිඟන් භාණ්ඩ",
      reqRentals: "උපකරණ කුලියට ගැනීම (Rentals)",
      reqRentalsDesc: "කූඩාරම්, මේස, චියාවරි පුටු, වේදිකා",
      reqLighting: "ආලෝකකරණය (Lighting)",
      reqLightingDesc: "විදුලි බුබුළු, පහන් කූඩු, ස්පොට් ලයිට්ස් සහ විදුලි ජනක යන්ත්‍ර",
      sec4: "4. විශේෂ අවශ්‍යතා සහ අමතර සටහන්",
      notesPlaceholder:
        "මෙනු තේරීම්, නිර්මාංශ/විශේෂ ආහාර, කූඩාරම් ප්‍රමාණය හෝ වෙනත් ඕනෑම අවශ්‍යතාවක් මෙහි සඳහන් කරන්න...",
      submitBtn: "වෙන්කිරීමේ ඉල්ලීම යොමුකරන්න",
      submitting: "යොමු කරමින් පවතී...",
      trustGuarantee: "පැයක් ඇතුළත නිල මිල ගණන් ලේඛනයක් ලැබේ. පෙර ගෙවීමක් අවශ්‍ය නොවේ.",
      successTitle: "ඔබගේ ඉල්ලීම සාර්ථකව ලැබුණි!",
      successRef: "යොමු අංකය",
      successDesc:
        "බී.එම්. කේටරින් හා සම්බන්ධ වීම පිළිබඳව ස්තූතියි. අපගේ කළමනාකාරවරයෙකු පැයක් ඇතුළත ඔබ හා සම්බන්ධ වනු ඇත.",
      submitAnother: "තවත් ඉල්ලීමක් යොමුකරන්න",
    },

    // Contact Page
    contactPage: {
      kicker: "අප සැමවිටම ඔබ ළඟින්",
      title: "බී.එම්. කේටරින් හා සම්බන්ධ වන්න",
      subtitle:
        "දුරකථන, වට්ස්ඇප් මඟින් හෝ අපගේ කොළඹ කාර්යාලය සහ ප්‍රධාන ගබඩාව වෙත පැමිණෙන්න.",
      officeTitle: "ප්‍රධාන කාර්යාලය සහ මධ්‍යම ගබඩාව",
      address: "නො. 142/5 ගාලු පාර, කොළඹ 03, ශ්‍රී ලංකාව",
      phoneTitle: "දුරකථන අංක",
      whatsappTitle: "වට්ස්ඇප් ව්‍යාපාරික අංකය",
      emailTitle: "ඊමේල් ලිපිනය",
      hoursTitle: "සේවා වේලාවන්",
      hours: "සඳුදා – ඉරිදා: පෙ.ව. 8:00 – ප.ව. 8:00 (හදිසි ඇමතුම් පැය 24 පුරා)",
      formTitle: "අප වෙත පණිවිඩයක් එවන්න",
      formSubtitle: "කාර්යාල වේලාවන් තුළ විනාඩි 30ක් ඇතුළත අප ඔබ අමතන්නෙමු.",
      nameLabel: "ඔබගේ නම",
      phoneLabel: "දුරකථන අංකය",
      emailLabel: "ඊමේල් ලිපිනය",
      subjectLabel: "විෂය",
      subjectPlaceholder: "උදා: දෙසැම්බර් මාසයේ මංගල උත්සවයක් පිළිබඳ විමසීම",
      messageLabel: "පණිවිඩය",
      messagePlaceholder: "ඔබගේ උත්සව දිනය, ආරාධිතයින් ගණන සහ අවශ්‍යතා සඳහන් කරන්න...",
      sendBtn: "පණිවිඩය යවන්න",
      sentSuccess: "පණිවිඩය සාර්ථකව යවන ලදී! අප ඉක්මනින් ඔබ හා සම්බන්ධ වන්නෙමු.",
      halalBadge: "100% හලාල් සහතිකලත් මුළුතැන්ගෙවල් සහ පහසුකම්",
    },

    // Services Page
    servicesPage: {
      kicker: "අපගේ සේවාවන්",
      title: "සම්පූර්ණ භෝජන, උපකරණ සහ ආලෝකකරණ සේවා",
      subtitle:
        "කුඩා පෞද්ගලික උත්සවයේ සිට ආරාධිතයින් 2,000+ ක දැවැන්ත උත්සව දක්වා ආහාර, උපකරණ සහ ආලෝකකරණය.",
      cateringTitle: "1. සුඛෝපභෝගී මංගල සහ විශේෂ භෝජන සංග්‍රහ",
      rentalsTitle: "2. කූඩාරම්, පුටු සහ උත්සව උපකරණ කුලියට දීම",
      lightingTitle: "3. විදුලි බුබුළු, වේදිකා ආලෝකකරණය සහ ශබ්ද පද්ධති",
      culturalTitle: "4. ආගමික සහ සංස්කෘතික උත්සව විශේෂ සැකසුම්",
    },

    // Quotation Drawer
    drawer: {
      title: "මිල ගණන් ඉල්ලුම්පත් ලැයිස්තුව",
      itemsCount: "භාණ්ඩ",
      emptyTitle: "ඔබගේ මිල ගණන් ලැයිස්තුව හිස්ව පවතී",
      emptyDesc: "උත්සවය සඳහා පුටු, මේස, කූඩාරම් සහ ආලෝකකරණ උපකරණ නාමාවලියෙන් තෝරාගන්න.",
      browseBtn: "උපකරණ නාමාවලිය බලන්න →",
      clearAll: "සියල්ල ඉවත් කරන්න",
      dailyRate: "දිනක කුලිය",
      totalEstimate: "උපකරණ කුලියේ මුළු එකතුව",
      proceedBtn: "වෙන්කිරීමේ පෝරමය වෙත යන්න",
    },

    // Footer
    footer: {
      tagline: "සුඛෝපභෝගී උත්සව සහ උපකරණ",
      bio: "ප්‍රණීත භෝජන සංග්‍රහ, සුඛෝපභෝගී කූඩාරම්, උත්සව උපකරණ සහ ආකර්ෂණීය ආලෝකකරණය සපයන ශ්‍රී ලංකාවේ අංක එකේ උත්සව සහකරුවා.",
      halalCert: "100% හලාල් සහතිකලත් • ශ්‍රී ලංකාවේ ලියාපදිංචි ව්‍යාපාරයකි",
      coreServices: "අපගේ ප්‍රධාන සේවාවන්",
      service1: "මංගල සහ විශේෂ භෝජන සංග්‍රහ",
      service2: "කූඩාරම්, පුටු සහ වේදිකා කුලියට දීම",
      service3: "විදුලි බුබුළු සහ ආලෝකකරණ සේවා",
      service4: "උපකරණ කුලියට දීමේ නාමාවලිය",
      service5: "සංස්කෘතික උත්සව පැකේජ",
      quickLinks: "ප්‍රධාන පිටු",
      linkHome: "මුල් පිටුව",
      linkGallery: "ඡායාරූප ගැලරිය",
      linkBook: "වෙන්කිරීම් සහ මිල ගණන්",
      linkContact: "සම්බන්ධ වන්න සහ ගබඩාව",
      linkStaff: "කාර්ය මණ්ඩල පිවිසුම",
      contactInfo: "කාර්යාලය සහ සම්බන්ධතා",
      rights: "සියලුම හිමිකම් ඇවිරිණි. වෘත්තීය උත්සව සැලසුම් සහ ආහාර සපයන්නෝ.",
    },

    // WhatsApp Floating Button
    whatsapp: {
      support: "ක්ෂණික සේවය",
      chat: "වට්ස්ඇප් මඟින් අමතන්න",
      defaultMsg: "ආයුබෝවන් B.M Catering! මට උත්සව ආහාර සහ උපකරණ කුලියට ගැනීම පිළිබඳ විස්තර දැනගැනීමට අවශ්‍යයි.",
    },
  },
} as const;

export type TranslationDict = typeof translations.en;

