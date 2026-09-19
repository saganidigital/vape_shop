/**
 * AURA VAPOR LABS - Product Catalog Data
 * Comprehensive collection of Vapes, Pod Systems, Replacement Pods, and E-Liquid Flavor Bottles
 */

const PRODUCTS_DATA = [
  {
    id: "vape-titan-15k",
    name: "Aura Titan 15,000",
    category: "disposable",
    categoryName: "Disposable Vape",
    tagline: "Ultra Smart Disposable with Dual Mesh & OLED Display",
    price: 24.99,
    originalPrice: 32.99,
    rating: 4.9,
    reviewsCount: 342,
    badge: "Bestseller",
    badgeType: "hot",
    image: "assets/images/vape_disposable.jpg",
    puffCount: "15,000 Puffs",
    battery: "850mAh Type-C Rechargeable",
    nicotineStrength: ["50mg (5%)", "20mg (2%)", "0mg (Nicotine Free)"],
    eLiquidCapacity: "22ml Pre-filled",
    coil: "Dual Mesh 0.8Ω Pro-Airflow",
    flavorNotes: ["Blueberry", "Neon Raspberry", "Sub-Zero Ice"],
    flavorCategory: "fruity",
    flavorProfile: {
      sweetness: 85,
      ice: 90,
      richness: 75,
      throatHit: 70
    },
    description: "The Aura Titan 15,000 sets a new benchmark in disposable vaping. Featuring a real-time smart OLED screen displaying active battery and e-liquid percentages, dual mesh coils for rich vapor production, and smooth ergonomic contours.",
    inStock: true,
    features: [
      "Real-time OLED display (Battery & Juice %)",
      "Turbo Mode switch for amplified clouds",
      "Type-C ultra-fast 30-min recharge",
      "Ergonomic soft-touch rubberized grip"
    ]
  },
  {
    id: "vape-aeterna-pod-mod",
    name: "Aeterna Nexus Pod System",
    category: "pod-system",
    categoryName: "Pod System",
    tagline: "Aircraft-Grade Aluminum Refillable Pod Mod with Smart Wattage",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.95,
    reviewsCount: 518,
    badge: "Editor's Choice",
    badgeType: "featured",
    image: "assets/images/vape_pod_system.jpg",
    puffCount: "Unlimited (Refillable)",
    battery: "1200mAh All-Day Battery",
    nicotineStrength: ["Compatible with 0mg - 50mg"],
    eLiquidCapacity: "3.5ml Magnetic Cartridge",
    coil: "Smart Resistance Sensing (0.4Ω - 1.2Ω)",
    flavorNotes: ["Refillable with Any E-Liquid", "Optimal Nic-Salt Delivery"],
    flavorCategory: "device",
    flavorProfile: {
      sweetness: 70,
      ice: 50,
      richness: 90,
      throatHit: 80
    },
    description: "Engineered from aerospace-grade brushed alloy, the Aeterna Nexus combines luxury aesthetics with smart-chip wattage adaptation. Features leak-proof magnetic pod locking and 3-stage precision airflow control for both MTL and RDL styles.",
    inStock: true,
    features: [
      "Precision Stepless Airflow Dial",
      "Smart Auto-Draw & Haptic Button Activation",
      "Magnetic Pod Bay with Gold-plated Pins",
      "Anti-Leak Quadruple Silicone Gasket"
    ]
  },
  {
    id: "pods-nexus-mesh-3pack",
    name: "Nexus Pro 0.6Ω Mesh Pods (3-Pack)",
    category: "pods",
    categoryName: "Replacement Pods",
    tagline: "Leak-Resistant Cartridges with Integrated Honeycomb Mesh",
    price: 13.99,
    originalPrice: 17.99,
    rating: 4.8,
    reviewsCount: 227,
    badge: "Essential",
    badgeType: "sale",
    image: "assets/images/pods_pack.svg",
    puffCount: "Approx. 4,500 Puffs per Pod",
    battery: "Compatible with Nexus System",
    nicotineStrength: ["Refill with Salt or Freebase"],
    eLiquidCapacity: "3.5ml Top-Fill Chamber",
    coil: "0.6Ω Honeycomb Kanthal Mesh",
    flavorNotes: ["Max Flavor Clarity", "Thick Vapor Production"],
    flavorCategory: "pods",
    flavorProfile: {
      sweetness: 80,
      ice: 60,
      richness: 85,
      throatHit: 75
    },
    description: "Engineered specifically for the Nexus Pod series. Each pod incorporates an ultra-dense organic Japanese cotton wick and honeycomb mesh core, delivering pristine flavor fidelity down to the very last drop without burnt hits.",
    inStock: true,
    features: [
      "Patented SSS Leak-Proof Technology",
      "Easy Top-Fill silicone port without pod removal",
      "Transparent 360-degree e-liquid inspection window",
      "Magnetic snaps with tactile click lock"
    ]
  },
  {
    id: "eliquid-cosmic-berry",
    name: "Cosmic Berry Freeze (60ml)",
    category: "e-liquid",
    categoryName: "Flavor Bottle",
    tagline: "Wild Mountain Berries Blended with Arctic Menthol Blast",
    price: 18.99,
    originalPrice: 22.99,
    rating: 4.92,
    reviewsCount: 460,
    badge: "Top Rated",
    badgeType: "hot",
    image: "assets/images/bottle_cosmic_berry.svg",
    puffCount: "60ml (Approx. 18,000 Puffs)",
    battery: "N/A (Liquid)",
    nicotineStrength: ["3mg Freebase", "6mg Freebase", "0mg Nicotine-Free"],
    eLiquidCapacity: "60ml Chubby Gorilla Bottle",
    coil: "Optimal for 0.15Ω - 0.8Ω Sub-Ohm & Pods",
    flavorNotes: ["Blackberry", "Blue Raspberry", "Acai", "Menthol Chill"],
    flavorCategory: "icy",
    flavorProfile: {
      sweetness: 90,
      ice: 95,
      richness: 70,
      throatHit: 65
    },
    description: "An astronomical burst of tart blackberries, ripe blueberries, and sweet blue raspberries, followed by an exhilarating sub-zero arctic menthol exhale. Formulated with 70VG/30PG for massive cloud density and crisp taste.",
    inStock: true,
    features: [
      "70% VG / 30% PG Premium Cloud Ratio",
      "USP Grade Pharmaceutical Nicotine & Kosher Glycerin",
      "Child-resistant cap with precision drip nozzle",
      "Crafted in certified cleanroom laboratory"
    ]
  },
  {
    id: "eliquid-watermelon-lime",
    name: "Watermelon Lime Splash (60ml)",
    category: "e-liquid",
    categoryName: "Flavor Bottle",
    tagline: "Sun-Ripened Crisp Watermelon with Tangy Key Lime Zest",
    price: 18.99,
    originalPrice: 22.99,
    rating: 4.88,
    reviewsCount: 312,
    badge: "Fresh",
    badgeType: "new",
    image: "assets/images/bottle_watermelon_lime.svg",
    puffCount: "60ml (Approx. 18,000 Puffs)",
    battery: "N/A (Liquid)",
    nicotineStrength: ["3mg Freebase", "6mg Freebase", "0mg Nicotine-Free"],
    eLiquidCapacity: "60ml Chubby Gorilla Bottle",
    coil: "Optimal for Sub-Ohm & Pod Systems",
    flavorNotes: ["Crisp Watermelon", "Persian Lime", "Agave Nectar"],
    flavorCategory: "fruity",
    flavorProfile: {
      sweetness: 82,
      ice: 45,
      richness: 60,
      throatHit: 70
    },
    description: "Quench your senses with ultra-crisp red watermelon nectar balanced against vibrant, tangy freshly squeezed lime juice. A refreshing all-day vape profile that keeps coils clean and flavor crisp.",
    inStock: true,
    features: [
      "Zero artificial sweetener buildup",
      "Ultra-smooth throat hit formulation",
      "Vibrant fruit aroma that doesn't linger heavily",
      "Certified diacetyl-free recipe"
    ]
  },
  {
    id: "eliquid-vanilla-bourbon",
    name: "Golden Reserve Vanilla Bourbon (60ml)",
    category: "e-liquid",
    categoryName: "Flavor Bottle",
    tagline: "Aged Kentucky Oak Cask Tobacco with Madagascan Vanilla Custard",
    price: 21.99,
    originalPrice: 26.99,
    rating: 4.97,
    reviewsCount: 640,
    badge: "Luxury",
    badgeType: "featured",
    image: "assets/images/bottle_vanilla_bourbon.svg",
    puffCount: "60ml (Approx. 18,000 Puffs)",
    battery: "N/A (Liquid)",
    nicotineStrength: ["6mg Freebase", "12mg Freebase", "3mg Freebase"],
    eLiquidCapacity: "60ml Amber Glass Edition",
    coil: "Optimal for MTL & RDL Coils (0.6Ω - 1.2Ω)",
    flavorNotes: ["Cured Virginia Tobacco", "Oak Bourbon", "Madagascar Vanilla", "Brown Butter"],
    flavorCategory: "tobacco",
    flavorProfile: {
      sweetness: 65,
      ice: 0,
      richness: 98,
      throatHit: 90
    },
    description: "Crafted for the discerning palate. Naturally extracted cured Virginia and Burley tobacco leaves steeped in charred oak bourbon barrels, layered with decadent Madagascan vanilla bean custard and toasted caramel nuances.",
    inStock: true,
    features: [
      "Aged 90 days in oak barrel steeping vats",
      "Complex multi-layered taste profile",
      "Satisfying full-bodied authentic throat hit",
      "Dark amber UV-protective bottle packaging"
    ]
  },
  {
    id: "eliquid-tokyo-lychee",
    name: "Tokyo Lychee Guava Mist (30ml Nic-Salt)",
    category: "e-liquid",
    categoryName: "Flavor Bottle",
    tagline: "Exotic Asian Lychee & Pink Guava Infused with Rapid Nic-Salt",
    price: 16.99,
    originalPrice: 20.99,
    rating: 4.89,
    reviewsCount: 388,
    badge: "Nic Salt",
    badgeType: "hot",
    image: "assets/images/bottle_tokyo_lychee.svg",
    puffCount: "30ml (Approx. 9,000 Puffs)",
    battery: "N/A (Liquid)",
    nicotineStrength: ["25mg Nic Salt", "50mg Nic Salt"],
    eLiquidCapacity: "30ml Precision Dripper",
    coil: "Designed for Low-Wattage Pods (0.8Ω - 1.4Ω)",
    flavorNotes: ["Floral Lychee", "Tropical Pink Guava", "Sub-Zero Menthol"],
    flavorCategory: "icy",
    flavorProfile: {
      sweetness: 88,
      ice: 85,
      richness: 65,
      throatHit: 85
    },
    description: "A mouthwatering fusion of fragrant floral Tokyo lychee fruit and lush pink guava pulp with a sharp, invigorating icy finish. Specifically formulated with smooth nicotine salts for instant satisfaction in low-wattage pod devices.",
    inStock: true,
    features: [
      "50% VG / 50% PG rapid wicking formula",
      "Ultra-smooth nicotine salt satisfaction",
      "Perfect for pod systems and ultra-portable kits",
      "Tamper-evident shrink wrapped seal"
    ]
  },
  {
    id: "pods-prefilled-salt-4pack",
    name: "Aura Pre-Filled Salt Pods (4-Pack)",
    category: "pods",
    categoryName: "Replacement Pods",
    tagline: "Pre-filled Plug & Play Pods in Assorted Signature Blends",
    price: 17.99,
    originalPrice: 21.99,
    rating: 4.78,
    reviewsCount: 195,
    badge: "Convenient",
    badgeType: "new",
    image: "assets/images/pods_pack.svg",
    puffCount: "1,200 Puffs per Pod (4,800 Total)",
    battery: "Fits Aura & Nexus Pod Batteries",
    nicotineStrength: ["50mg Nic Salt", "20mg Nic Salt"],
    eLiquidCapacity: "2.0ml Pre-filled x 4",
    coil: "1.0Ω Ceramic PureTaste Core",
    flavorNotes: ["Lush Ice", "Mango Tango", "Blue Razz", "Cool Mint"],
    flavorCategory: "fruity",
    flavorProfile: {
      sweetness: 85,
      ice: 80,
      richness: 70,
      throatHit: 80
    },
    description: "Zero mess, zero refilling. Simply snap in a pre-filled Aura Salt Pod and enjoy instant, smooth vapor. Each pack includes four individually sealed pods with leak-resistant silicone gaskets and ceramic coils.",
    inStock: true,
    features: [
      "4 distinct or matching pods in blister pack",
      "Ceramic heating technology for pure flavor",
      "Zero maintenance - dispose and replace",
      "Color-coded flavor rings for easy ID"
    ]
  }
];

// Flavor categories metadata for quick filtering
const FLAVOR_CATEGORIES = [
  { id: "all", name: "All Flavors", icon: "✨" },
  { id: "icy", name: "Icy & Menthol", icon: "❄️" },
  { id: "fruity", name: "Fruity & Sweet", icon: "🍓" },
  { id: "tobacco", name: "Rich Tobacco & Custard", icon: "🍂" },
  { id: "device", name: "Devices & Hardware", icon: "⚡" },
  { id: "pods", name: "Pods & Cartridges", icon: "🔋" }
];

// Customer Reviews Data
const REVIEWS_DATA = [
  {
    author: "Julian K.",
    verified: true,
    rating: 5,
    date: "2 days ago",
    product: "Aura Titan 15,000 Puffs",
    comment: "The battery and juice display is game changing. No more guessing when your disposable is about to die. Dual mesh coil produces insanely thick, flavorful clouds!"
  },
  {
    author: "Marcus V.",
    verified: true,
    rating: 5,
    date: "1 week ago",
    product: "Golden Reserve Vanilla Bourbon (60ml)",
    comment: "Hands down the best dessert tobacco on the market. You can genuinely taste the oak wood and smooth bourbon note on the exhale. Absolutely top shelf quality."
  },
  {
    author: "Elena R.",
    verified: true,
    rating: 5,
    date: "2 weeks ago",
    product: "Aeterna Nexus Pod System",
    comment: "The brushed gunmetal finish feels super premium in the hand. Zero leaking from the pods after 3 weeks of daily use. Airflow control is buttery smooth."
  },
  {
    author: "Chloe T.",
    verified: true,
    rating: 5,
    date: "3 weeks ago",
    product: "Cosmic Berry Freeze (60ml)",
    comment: "The menthol blast is so crisp and clean without overpowering the sweet berry flavor. Reordering my 3rd bottle right now!"
  }
];
