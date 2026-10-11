import { MenuItem, Article, Destination } from "@/types";

export const NAVIGATION_MENU: MenuItem[] = [
  {
    id: "nav-1",
    title: "Destinations",
    href: "/destinations",
    type: "destination",
    children: [
      {
        id: "nav-1-1",
        title: "Europe",
        href: "/destinations/europe",
        children: [
          { id: "nav-1-1-1", title: "Switzerland Alps", href: "/destinations/europe/switzerland" },
          { id: "nav-1-1-2", title: "Italy Amalfi Coast", href: "/destinations/europe/italy" },
          { id: "nav-1-1-3", title: "Iceland Fjords", href: "/destinations/europe/iceland" },
        ],
      },
      {
        id: "nav-1-2",
        title: "Asia",
        href: "/destinations/asia",
        children: [
          { id: "nav-1-2-1", title: "Kyoto & Tokyo, Japan", href: "/destinations/asia/japan" },
          { id: "nav-1-2-2", title: "Bali, Indonesia", href: "/destinations/asia/bali" },
          { id: "nav-1-2-3", title: "Vietnam Highlands", href: "/destinations/asia/vietnam" },
        ],
      },
      {
        id: "nav-1-3",
        title: "Africa & Middle East",
        href: "/destinations/africa",
        children: [
          { id: "nav-1-3-1", title: "Moroccan Sahara", href: "/destinations/africa/morocco" },
          { id: "nav-1-3-2", title: "Serengeti Safari", href: "/destinations/africa/tanzania" },
        ],
      },
    ],
  },
  {
    id: "nav-2",
    title: "Travel Guides",
    href: "/guides",
    type: "category",
    children: [
      { id: "nav-2-1", title: "Solo Expeditions", href: "/guides/solo-travel" },
      { id: "nav-2-2", title: "Luxury Escapes", href: "/guides/luxury" },
      { id: "nav-2-3", title: "Budget & Backpacking", href: "/guides/budget" },
      { id: "nav-2-4", title: "Visa & Digital Nomad Tips", href: "/guides/digital-nomad" },
    ],
  },
  {
    id: "nav-3",
    title: "Knowledge & Tips",
    href: "/knowledge",
    type: "category",
    children: [
      { id: "nav-3-1", title: "Travel Photography & Video Gear", href: "/knowledge/photography" },
      { id: "nav-3-2", title: "Packing Masterclasses", href: "/knowledge/packing" },
      { id: "nav-3-3", title: "Flight Hacks & Miles", href: "/knowledge/flight-hacks" },
    ],
  },
  {
    id: "nav-4",
    title: "Visual Stories",
    href: "/galleries",
    type: "page",
  },
  {
    id: "nav-5",
    title: "About",
    href: "/about",
    type: "page",
  },
];

export const FEATURED_ARTICLES: Article[] = [
  {
    id: "art-1",
    title: "The Ultimate Guide to Traversing the Swiss Alps: Hidden High-Altitude Trails",
    slug: "ultimate-swiss-alps-hiking-guide",
    summary:
      "From Grindelwald to the shadow of the Matterhorn, discover panoramic mountain passes, crystal-clear glacial lakes, and sustainable alpine hut experiences.",
    content: `
# The High Alps: Where Sky Meets Granite

Few landscapes on Earth stir the soul like the Swiss Alps. Whether you are stepping off the cogwheel train in Kleine Scheidegg or strapping on crampons for a sunrise glacier crossing, the sheer scale of the peaks commands reverence.

## Packing Smart for High Elevation
When hiking above 2,500 meters, mountain weather can shift within minutes. Ensure your pack contains:
* Breathable merino wool base layers
* Hardshell 3-layer Gore-Tex rain jacket
* High-SPF mineral sunscreen and UV-rated sunglasses
* Offline satellite maps and an emergency GPS beacon

> "In the mountains, there are only two rules: respect the terrain, and never rush the descent."

## The Scenic Hut-to-Hut Circuit
Alpine huts (SAC Hütten) provide hearty mountain dinners and comfortable dorms overlooking sea-of-clouds sunsets. Booking 2–3 months ahead is essential for peak summer months (July–September).
    `,
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
    videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    category: { name: "Adventure & Hiking", slug: "adventure-hiking" },
    destination: { name: "Switzerland", slug: "switzerland", country: "Switzerland" },
    tags: ["Hiking", "Alps", "Photography", "Europe", "Budget Tips"],
    author: {
      id: "auth-1",
      name: "Elena Vance",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "Senior Alpine Correspondent",
      bio: "Geographer and mountain photographer with over 12 seasons in the European Alps.",
    },
    publishedAt: "Oct 10, 2026",
    readingTime: "7 min read",
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "art-2",
    title: "Autumn in Kyoto: Temples, Moss Gardens and Secret Bamboo Groves",
    slug: "autumn-in-kyoto-temple-guide",
    summary:
      "A serene walkthrough of Kyoto's lesser-known zen sanctuaries, traditional tea ceremonies, and how to photograph autumn maple leaves without the crowds.",
    content: `
# Golden Hour Across the Ancient Capital

Kyoto during late autumn is a symphony of fiery reds, deep ambers, and moss greens. While Kiyomizu-dera and Fushimi Inari draw massive crowds, the real magic resides in northern Kyoto's quieter enclaves.

## 3 Underrated Zen Sanctuaries
1. **Ruriko-in:** Famed for its polished lacquer table reflecting maple foliage in dreamlike symmetry.
2. **Enko-ji:** Climb behind the main hall for an elevated panoramic view over Kyoto basin bathed in morning mist.
3. **Giou-ji:** A secluded thatched temple surrounded by deep velvet moss under ancient maple canopies.
    `,
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80",
    category: { name: "Cultural Expeditions", slug: "cultural-expeditions" },
    destination: { name: "Kyoto", slug: "kyoto", country: "Japan" },
    tags: ["Japan", "Temples", "Culture", "Autumn", "Photography"],
    author: {
      id: "auth-2",
      name: "Kenji Sato",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      role: "Culture & Culinary Editor",
    },
    publishedAt: "Oct 08, 2026",
    readingTime: "5 min read",
    isFeatured: false,
    isTrending: true,
  },
  {
    id: "art-3",
    title: "Nomad Life in Bali: The 2026 Comprehensive Cost & Co-Working Blueprint",
    slug: "bali-digital-nomad-guide-2026",
    summary:
      "From Canggu's bustling cafes to Ubud's quiet co-working hubs: broadband speeds, villa rent breakdown, visa requirements, and health insurance advice.",
    content: `
# Bali for Remote Creatives: Reality vs Expectation

Bali continues to attract creators, coders, and founders from around the globe. But between scooter traffic and visa nuances, navigating the island smoothly requires local know-how.

## Average Monthly Budget (Canggu & Pererenan)
* **Private Villa / Modern Guest House:** $750 - $1,400 / month
* **Co-Working Space Membership:** $140 - $220 / month
* **Cafes & Health Food:** $400 - $650 / month
* **Scooter Rental + Fuel:** $70 - $110 / month
    `,
    coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80",
    category: { name: "Digital Nomad", slug: "digital-nomad" },
    destination: { name: "Bali", slug: "bali", country: "Indonesia" },
    tags: ["Digital Nomad", "Bali", "Remote Work", "Cost of Living"],
    author: {
      id: "auth-3",
      name: "Marcus Thorne",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      role: "Nomad Logistics Lead",
    },
    publishedAt: "Oct 05, 2026",
    readingTime: "9 min read",
    isFeatured: false,
    isTrending: true,
  },
  {
    id: "art-4",
    title: "Road Tripping Iceland's Ring Road: Waterfalls, Canyons & Geothermal Spas",
    slug: "iceland-ring-road-roadtrip-itinerary",
    summary:
      "Everything you need to know about renting a 4x4 camper, budgeting grocery stops, finding natural hot springs, and catching the Northern Lights.",
    content: `
# 10 Days in the Land of Fire and Ice

Driving Route 1 is one of the world's quintessential road trips. Waterfalls thunder off basalt cliffs, glaciers creep toward black sand beaches, and steaming geothermal pools invite you to unwind after long drives.
    `,
    coverImage: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1600&q=80",
    category: { name: "Road Trips", slug: "road-trips" },
    destination: { name: "Iceland", slug: "iceland", country: "Iceland" },
    tags: ["Iceland", "Road Trip", "Camping", "Northern Lights"],
    author: {
      id: "auth-1",
      name: "Elena Vance",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "Senior Alpine Correspondent",
    },
    publishedAt: "Oct 01, 2026",
    readingTime: "8 min read",
    isFeatured: false,
    isTrending: false,
  },
  {
    id: "art-5",
    title: "Mastering Mirrorless Travel Photography: What's In My Camera Bag in 2026",
    slug: "travel-photography-gear-guide-2026",
    summary:
      "A minimalist yet powerful camera kit for traveling light: lightweight full-frame bodies, versatile f/2.8 zoom lenses, ND filters, and backup workflows.",
    content: `
# Less Weight, Better Captures

The biggest trap for aspiring travel photographers is overpacking lenses. The best camera is the one you actually want to carry up a mountain at 4:30 AM.
    `,
    coverImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=80",
    category: { name: "Knowledge & Gear", slug: "knowledge-gear" },
    tags: ["Photography", "Gear", "Tips", "Mirrorless"],
    author: {
      id: "auth-2",
      name: "Kenji Sato",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      role: "Culture & Culinary Editor",
    },
    publishedAt: "Sep 28, 2026",
    readingTime: "6 min read",
    isFeatured: false,
    isTrending: false,
  },
];

export const TOP_DESTINATIONS: Destination[] = [
  {
    id: "dest-1",
    name: "Switzerland",
    slug: "switzerland",
    region: "Europe",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    articleCount: 14,
    description: "Towering alpine spires, pristine mountain railways, and tranquil turquoise lakes.",
  },
  {
    id: "dest-2",
    name: "Japan",
    slug: "japan",
    region: "Asia",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    articleCount: 22,
    description: "Ancient heritage harmonized with futuristic metropolises, culinary art, and zen gardens.",
  },
  {
    id: "dest-3",
    name: "Indonesia",
    slug: "indonesia",
    region: "Asia",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    articleCount: 18,
    description: "Emerald rice terraces, spiritual island culture, and world-class tropical surf breaks.",
  },
  {
    id: "dest-4",
    name: "Iceland",
    slug: "iceland",
    region: "Europe",
    country: "Iceland",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80",
    articleCount: 11,
    description: "Sublime volcanic landscapes, dancing aurora skies, and steaming glacial river pools.",
  },
];
