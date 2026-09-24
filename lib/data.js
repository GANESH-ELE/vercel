// =============================================================
// LOCAL DEMO CATALOG DATA  (DEMO DATA \u2014 replace with CMS later)
// -------------------------------------------------------------
// This is the ONLY place product / category / brand data lives.
// The UI never hardcodes catalog data. To integrate Sanity later,
// replace the getters at the bottom with async CMS queries that
// return the same shapes described in lib/types.js.
// =============================================================

// ---- Image URLs (royalty-free demo images) ----
const IMG = {
  showroom: 'https://images.pexels.com/photos/12340557/pexels-photo-12340557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  materials: 'https://images.unsplash.com/photo-1637241612956-b7309005288b?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  warehouse: 'https://images.unsplash.com/photo-1771531072574-af6ed6b954c0?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  warehouse2: 'https://images.unsplash.com/photo-1787422429897-ad354751e61c?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  warehouse3: 'https://images.unsplash.com/photo-1787422430123-344b233a0626?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  plumb1: 'https://images.unsplash.com/photo-1454988501794-2992f706932e?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  plumb2: 'https://images.pexels.com/photos/29301874/pexels-photo-29301874.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  plumb3: 'https://images.unsplash.com/photo-1642797735471-3e90055c5ff9?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  tools: 'https://images.unsplash.com/photo-1426927308491-6380b6a9936f?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  faucet1: 'https://images.unsplash.com/photo-1623111771733-d3ab4d26ce41?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  faucet2: 'https://images.unsplash.com/photo-1542855368-ca6ea825bca2?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  faucet3: 'https://images.pexels.com/photos/30560253/pexels-photo-30560253.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  faucet4: 'https://images.pexels.com/photos/12196323/pexels-photo-12196323.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  sanitary1: 'https://images.unsplash.com/photo-1596180744691-d19a1b90b53c?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  sanitary2: 'https://images.unsplash.com/photo-1769763917830-7b9c8317329d?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  sanitary3: 'https://images.pexels.com/photos/7031566/pexels-photo-7031566.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  sink1: 'https://images.unsplash.com/photo-1595514535116-d0401260e7cf?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  toilet1: 'https://images.unsplash.com/photo-1589824783837-6169889fa20f?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  toilet2: 'https://images.unsplash.com/photo-1569597967185-cd6120712154?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
};

export const AVAILABILITY = {
  AVAILABLE: 'Available',
  MADE_TO_ORDER: 'Made to Order',
  ENQUIRE: 'Enquire for Availability',
};

// ---- Categories (10) ----
export const categories = [
  { id: 'c1', name: 'Plumbing', slug: 'plumbing', icon: 'Wrench',
    description: 'Pumps, valves, connectors and everything to keep water flowing smoothly at home and on site.',
    image: IMG.plumb1 },
  { id: 'c2', name: 'Pipes & Fittings', slug: 'pipes-and-fittings', icon: 'GitBranch',
    description: 'PVC, CPVC and UPVC pipes with a full range of elbows, couplers and fittings.',
    image: IMG.plumb3 },
  { id: 'c3', name: 'Sanitaryware', slug: 'sanitaryware', icon: 'Bath',
    description: 'Water closets, wash basins and complete sanitaryware from trusted brands.',
    image: IMG.sanitary1 },
  { id: 'c4', name: 'Bathroom Fittings', slug: 'bathroom-fittings', icon: 'ShowerHead',
    description: 'Premium taps, mixers, showers and bathroom accessories with a modern finish.',
    image: IMG.faucet1 },
  { id: 'c5', name: 'Electrical', slug: 'electrical', icon: 'Zap',
    description: 'Wires, cables, switches, MCBs and electrical essentials for safe installations.',
    image: IMG.materials },
  { id: 'c6', name: 'Hardware', slug: 'hardware', icon: 'Hammer',
    description: 'Locks, hinges, fasteners and general hardware for doors, windows and furniture.',
    image: IMG.tools },
  { id: 'c7', name: 'Berger Paints', slug: 'berger-paints', icon: 'PaintBucket',
    description: 'Interior and exterior emulsions, primers and finishes from Berger Paints.',
    image: IMG.warehouse2 },
  { id: 'c8', name: 'Water Tanks', slug: 'water-tanks', icon: 'Droplets',
    description: 'Durable overhead and loft water storage tanks in multiple capacities.',
    image: IMG.plumb2 },
  { id: 'c9', name: 'Lights & Fans', slug: 'lights-and-fans', icon: 'Fan',
    description: 'Energy-efficient LED lighting and ceiling fans for every room.',
    image: IMG.warehouse3 },
  { id: 'c10', name: 'Tools & Accessories', slug: 'tools-and-accessories', icon: 'Drill',
    description: 'Power tools, hand tools, adhesives and sealants for professionals and DIY.',
    image: IMG.tools },
];

// ---- Brands (9) ----
export const brands = [
  { id: 'b1', name: 'Berger', slug: 'berger', description: 'Trusted paints and coatings for beautiful, long-lasting interiors and exteriors.', image: IMG.warehouse2 },
  { id: 'b2', name: 'Finolex', slug: 'finolex', description: 'Renowned for reliable electrical wires, cables and PVC piping systems.', image: IMG.materials },
  { id: 'b3', name: 'Astral', slug: 'astral', description: 'High-performance CPVC and UPVC plumbing pipe and fitting systems.', image: IMG.plumb3 },
  { id: 'b4', name: 'Cera', slug: 'cera', description: 'Modern sanitaryware, faucets and complete bathroom solutions.', image: IMG.sanitary1 },
  { id: 'b5', name: 'Jaquar', slug: 'jaquar', description: 'Premium bath fittings, showers and wellness products.', image: IMG.faucet1 },
  { id: 'b6', name: 'Havells', slug: 'havells', description: 'Fans, lighting, switchgear and electrical consumer products.', image: IMG.warehouse3 },
  { id: 'b7', name: 'Sintex', slug: 'sintex', description: 'Durable water storage tanks and plastic building products.', image: IMG.plumb2 },
  { id: 'b8', name: 'Crompton', slug: 'crompton', description: 'Water pumps, fans and lighting engineered for performance.', image: IMG.plumb1 },
  { id: 'b9', name: 'Bosch', slug: 'bosch', description: 'Professional-grade power tools and accessories.', image: IMG.tools },
];

// ---- Products (16) ----
export const products = [
  {
    id: 'p1', name: 'Finolex FR PVC Insulated Wire 1.5 sq.mm', slug: 'finolex-fr-pvc-wire-1-5-sqmm',
    brand: 'finolex', category: 'electrical',
    shortDescription: 'Flame-retardant single-core copper wire for domestic wiring.',
    description: 'Finolex FR PVC insulated 1.5 sq.mm single core copper conductor wire designed for reliable, safe household and commercial wiring. Flame retardant insulation with excellent conductivity and long service life.',
    image: IMG.materials, gallery: [IMG.materials, IMG.warehouse, IMG.showroom],
    availability: AVAILABILITY.AVAILABLE, featured: true, newArrival: false, popular: true,
    specifications: [
      { label: 'Conductor', value: '99.97% pure electrolytic copper' },
      { label: 'Cross Section', value: '1.5 sq.mm' },
      { label: 'Insulation', value: 'FR PVC' },
      { label: 'Voltage Rating', value: '1100 V' },
      { label: 'Length', value: '90 metres per coil' },
    ],
    relatedProductIds: ['p2', 'p3', 'p16'], sku: 'FIN-WIRE-15', productCode: 'EL-1001',
    tags: ['wire', 'copper', 'electrical', 'cable', 'wiring'],
  },
  {
    id: 'p2', name: 'Havells Ceiling Fan 1200mm', slug: 'havells-ceiling-fan-1200mm',
    brand: 'havells', category: 'lights-and-fans',
    shortDescription: 'High-speed 1200mm ceiling fan with premium finish.',
    description: 'Havells 1200mm ceiling fan delivering high air delivery with silent operation and an aerodynamically designed blade. Elegant finish that complements modern interiors.',
    image: IMG.warehouse3, gallery: [IMG.warehouse3, IMG.showroom],
    availability: AVAILABILITY.AVAILABLE, featured: true, newArrival: true, popular: false,
    specifications: [
      { label: 'Sweep', value: '1200 mm' },
      { label: 'Speed', value: '380 RPM' },
      { label: 'Air Delivery', value: '230 CMM' },
      { label: 'Power', value: '72 W' },
      { label: 'Warranty', value: '2 years' },
    ],
    relatedProductIds: ['p3', 'p1', 'p16'], sku: 'HAV-FAN-1200', productCode: 'LF-2001',
    tags: ['fan', 'ceiling fan', 'havells', 'cooling'],
  },
  {
    id: 'p3', name: 'Havells LED Panel Light 18W', slug: 'havells-led-panel-light-18w',
    brand: 'havells', category: 'lights-and-fans',
    shortDescription: 'Slim recessed LED panel with cool daylight output.',
    description: 'Energy-efficient 18W round LED panel light with uniform, glare-free illumination. Ideal for false ceilings in homes, offices and showrooms.',
    image: IMG.warehouse3, gallery: [IMG.warehouse3, IMG.warehouse2],
    availability: AVAILABILITY.AVAILABLE, featured: false, newArrival: true, popular: false,
    specifications: [
      { label: 'Wattage', value: '18 W' },
      { label: 'Colour Temperature', value: '6500K Cool Daylight' },
      { label: 'Luminous Flux', value: '1600 lm' },
      { label: 'Mounting', value: 'Recessed' },
    ],
    relatedProductIds: ['p2', 'p1'], sku: 'HAV-LED-18', productCode: 'LF-2002',
    tags: ['light', 'led', 'panel', 'lighting'],
  },
  {
    id: 'p4', name: 'Astral CPVC Pipe 3/4 inch', slug: 'astral-cpvc-pipe-3-4-inch',
    brand: 'astral', category: 'pipes-and-fittings',
    shortDescription: 'Hot & cold water CPVC pipe, corrosion free.',
    description: 'Astral CPVC pipe engineered for hot and cold water plumbing. Corrosion resistant, leak proof and suitable for concealed and open plumbing systems.',
    image: IMG.plumb3, gallery: [IMG.plumb3, IMG.plumb1, IMG.plumb2],
    availability: AVAILABILITY.AVAILABLE, featured: true, newArrival: false, popular: false,
    specifications: [
      { label: 'Size', value: '3/4 inch (20 mm)' },
      { label: 'Material', value: 'CPVC' },
      { label: 'Standard', value: 'SDR 11' },
      { label: 'Length', value: '3 metres' },
      { label: 'Application', value: 'Hot & Cold Water' },
    ],
    relatedProductIds: ['p5', 'p6', 'p16'], sku: 'AST-CPVC-34', productCode: 'PF-3001',
    tags: ['pipe', 'cpvc', 'plumbing', 'fitting', 'water'],
  },
  {
    id: 'p5', name: 'Finolex PVC Pipe 4 inch', slug: 'finolex-pvc-pipe-4-inch',
    brand: 'finolex', category: 'pipes-and-fittings',
    shortDescription: 'Heavy-duty PVC drainage & sewerage pipe.',
    description: 'Finolex 4 inch PVC pipe suitable for drainage, sewerage and rainwater applications. Tough, lightweight and easy to install with a smooth bore for free flow.',
    image: IMG.plumb1, gallery: [IMG.plumb1, IMG.plumb3, IMG.plumb2],
    availability: AVAILABILITY.AVAILABLE, featured: false, newArrival: false, popular: true,
    specifications: [
      { label: 'Size', value: '4 inch (110 mm)' },
      { label: 'Material', value: 'uPVC' },
      { label: 'Type', value: 'SWR Drainage' },
      { label: 'Length', value: '3 metres' },
    ],
    relatedProductIds: ['p4', 'p6'], sku: 'FIN-PVC-4', productCode: 'PF-3002',
    tags: ['pipe', 'pvc', 'drainage', 'swr', 'plumbing'],
  },
  {
    id: 'p6', name: 'Astral CPVC Elbow 90\u00b0', slug: 'astral-cpvc-elbow-90',
    brand: 'astral', category: 'pipes-and-fittings',
    shortDescription: 'Leak-proof 90-degree CPVC elbow fitting.',
    description: 'Precision moulded CPVC 90-degree elbow for directional change in hot and cold water plumbing lines. Solvent-weld joint for a strong, leak-proof connection.',
    image: IMG.plumb2, gallery: [IMG.plumb2, IMG.plumb3, IMG.plumb1],
    availability: AVAILABILITY.MADE_TO_ORDER, featured: false, newArrival: false, popular: false,
    specifications: [
      { label: 'Size', value: '3/4 inch (20 mm)' },
      { label: 'Angle', value: '90 degrees' },
      { label: 'Material', value: 'CPVC' },
      { label: 'Joint', value: 'Solvent weld' },
    ],
    relatedProductIds: ['p4', 'p5'], sku: 'AST-ELB-90', productCode: 'PF-3003',
    tags: ['fitting', 'elbow', 'cpvc', 'plumbing'],
  },
  {
    id: 'p7', name: 'Jaquar Single Lever Basin Mixer', slug: 'jaquar-single-lever-basin-mixer',
    brand: 'jaquar', category: 'bathroom-fittings',
    shortDescription: 'Chrome single-lever basin mixer with modern lines.',
    description: 'Jaquar single lever basin mixer with a durable chrome finish and smooth ceramic cartridge for precise water and temperature control. A premium centrepiece for any modern washbasin.',
    image: IMG.faucet1, gallery: [IMG.faucet1, IMG.faucet2, IMG.faucet3],
    availability: AVAILABILITY.AVAILABLE, featured: true, newArrival: false, popular: true,
    specifications: [
      { label: 'Type', value: 'Single Lever' },
      { label: 'Finish', value: 'Chrome' },
      { label: 'Cartridge', value: '40 mm ceramic' },
      { label: 'Mounting', value: 'Deck / Basin' },
      { label: 'Warranty', value: '5 years' },
    ],
    relatedProductIds: ['p8', 'p10', 'p9'], sku: 'JAQ-BM-SL', productCode: 'BF-4001',
    tags: ['tap', 'faucet', 'mixer', 'basin', 'bathroom'],
  },
  {
    id: 'p8', name: 'Jaquar Wall Mixer with Shower', slug: 'jaquar-wall-mixer-with-shower',
    brand: 'jaquar', category: 'bathroom-fittings',
    shortDescription: 'Wall mixer with overhead shower arrangement.',
    description: 'Jaquar wall mixer with provision for overhead shower, offering reliable hot and cold mixing with an elegant chrome finish for a complete shower experience.',
    image: IMG.faucet2, gallery: [IMG.faucet2, IMG.faucet4, IMG.faucet1],
    availability: AVAILABILITY.AVAILABLE, featured: false, newArrival: true, popular: false,
    specifications: [
      { label: 'Type', value: 'Wall Mixer' },
      { label: 'Finish', value: 'Chrome' },
      { label: 'Inlet', value: '1/2 inch' },
      { label: 'Warranty', value: '5 years' },
    ],
    relatedProductIds: ['p7', 'p9'], sku: 'JAQ-WM-OH', productCode: 'BF-4002',
    tags: ['mixer', 'shower', 'wall mixer', 'bathroom', 'faucet'],
  },
  {
    id: 'p9', name: 'Cera Wall-Hung Water Closet', slug: 'cera-wall-hung-water-closet',
    brand: 'cera', category: 'sanitaryware',
    shortDescription: 'Space-saving wall-hung WC with soft-close seat.',
    description: 'Cera wall-hung water closet with a contemporary design, easy-clean rimless bowl and soft-close seat cover. Perfect for compact modern bathrooms.',
    image: IMG.toilet1, gallery: [IMG.toilet1, IMG.sanitary1, IMG.sanitary2],
    availability: AVAILABILITY.MADE_TO_ORDER, featured: true, newArrival: false, popular: false,
    specifications: [
      { label: 'Type', value: 'Wall Hung' },
      { label: 'Flushing', value: 'Rimless' },
      { label: 'Seat', value: 'Soft-close' },
      { label: 'Material', value: 'Vitreous China' },
    ],
    relatedProductIds: ['p10', 'p11', 'p7'], sku: 'CERA-WC-WH', productCode: 'SW-5001',
    tags: ['toilet', 'wc', 'water closet', 'sanitaryware', 'cera'],
  },
  {
    id: 'p10', name: 'Cera Table Top Wash Basin', slug: 'cera-table-top-wash-basin',
    brand: 'cera', category: 'sanitaryware',
    shortDescription: 'Designer counter-top wash basin.',
    description: 'Cera table-top wash basin with a sleek profile that sits elegantly on any vanity counter. Glazed vitreous china for easy cleaning and lasting shine.',
    image: IMG.sink1, gallery: [IMG.sink1, IMG.sanitary1, IMG.sanitary3],
    availability: AVAILABILITY.AVAILABLE, featured: false, newArrival: false, popular: true,
    specifications: [
      { label: 'Type', value: 'Table Top / Counter' },
      { label: 'Material', value: 'Vitreous China' },
      { label: 'Shape', value: 'Rectangular' },
      { label: 'Finish', value: 'Glossy White' },
    ],
    relatedProductIds: ['p9', 'p11', 'p7'], sku: 'CERA-WB-TT', productCode: 'SW-5002',
    tags: ['basin', 'wash basin', 'sink', 'sanitaryware', 'cera'],
  },
  {
    id: 'p11', name: 'Cera One-Piece Closet', slug: 'cera-one-piece-closet',
    brand: 'cera', category: 'sanitaryware',
    shortDescription: 'Seamless one-piece closet with dual flush.',
    description: 'Cera one-piece water closet with an integrated dual-flush cistern, delivering a clean seamless look and efficient water usage.',
    image: IMG.toilet2, gallery: [IMG.toilet2, IMG.sanitary2, IMG.sanitary1],
    availability: AVAILABILITY.AVAILABLE, featured: false, newArrival: true, popular: false,
    specifications: [
      { label: 'Type', value: 'One Piece' },
      { label: 'Flushing', value: 'Dual Flush' },
      { label: 'Trap', value: 'S-Trap' },
      { label: 'Material', value: 'Vitreous China' },
    ],
    relatedProductIds: ['p9', 'p10'], sku: 'CERA-WC-1P', productCode: 'SW-5003',
    tags: ['toilet', 'closet', 'one piece', 'sanitaryware', 'cera'],
  },
  {
    id: 'p12', name: 'Sintex Water Tank 1000L', slug: 'sintex-water-tank-1000l',
    brand: 'sintex', category: 'water-tanks',
    shortDescription: 'Triple-layer 1000 litre overhead water tank.',
    description: 'Sintex 1000 litre triple-layer water storage tank engineered to keep water fresh and safe. UV-stabilised and food-grade with excellent durability against harsh weather.',
    image: IMG.plumb2, gallery: [IMG.plumb2, IMG.warehouse, IMG.showroom],
    availability: AVAILABILITY.AVAILABLE, featured: true, newArrival: false, popular: true,
    specifications: [
      { label: 'Capacity', value: '1000 litres' },
      { label: 'Layers', value: 'Triple Layer' },
      { label: 'Material', value: 'Food-grade LLDPE' },
      { label: 'Type', value: 'Overhead' },
    ],
    relatedProductIds: ['p16', 'p5', 'p4'], sku: 'SNT-TANK-1000', productCode: 'WT-6001',
    tags: ['water tank', 'storage', 'sintex', 'overhead'],
  },
  {
    id: 'p13', name: 'Berger Silk Luxury Emulsion 20L', slug: 'berger-silk-luxury-emulsion-20l',
    brand: 'berger', category: 'berger-paints',
    shortDescription: 'Premium interior emulsion with a silky sheen.',
    description: 'Berger Silk Luxury Emulsion gives interior walls a rich, smooth silky finish with excellent washability and a wide palette of shades. Low odour and long-lasting colour.',
    image: IMG.warehouse2, gallery: [IMG.warehouse2, IMG.showroom],
    availability: AVAILABILITY.AVAILABLE, featured: true, newArrival: false, popular: false,
    specifications: [
      { label: 'Finish', value: 'Silk / Sheen' },
      { label: 'Coverage', value: 'Up to 150 sq.ft/L (2 coats)' },
      { label: 'Pack Size', value: '20 litres' },
      { label: 'Application', value: 'Interior Walls' },
    ],
    relatedProductIds: ['p14'], sku: 'BRG-SILK-20', productCode: 'PT-7001',
    tags: ['paint', 'emulsion', 'interior', 'berger', 'silk'],
  },
  {
    id: 'p14', name: 'Berger WeatherCoat Exterior 10L', slug: 'berger-weathercoat-exterior-10l',
    brand: 'berger', category: 'berger-paints',
    shortDescription: 'All-weather exterior wall protection.',
    description: 'Berger WeatherCoat exterior emulsion protects walls against rain, heat and dust while retaining colour brilliance. Ideal for Mangaluru\u2019s coastal climate.',
    image: IMG.warehouse2, gallery: [IMG.warehouse2, IMG.warehouse3],
    availability: AVAILABILITY.AVAILABLE, featured: false, newArrival: true, popular: false,
    specifications: [
      { label: 'Finish', value: 'Matt' },
      { label: 'Pack Size', value: '10 litres' },
      { label: 'Protection', value: 'Anti-algal, waterproof' },
      { label: 'Application', value: 'Exterior Walls' },
    ],
    relatedProductIds: ['p13'], sku: 'BRG-WC-10', productCode: 'PT-7002',
    tags: ['paint', 'exterior', 'weatherproof', 'berger'],
  },
  {
    id: 'p15', name: 'Bosch Impact Drill Machine', slug: 'bosch-impact-drill-machine',
    brand: 'bosch', category: 'tools-and-accessories',
    shortDescription: 'Powerful impact drill for masonry & wood.',
    description: 'Bosch impact drill machine with variable speed and forward/reverse for drilling into concrete, masonry, wood and metal. Compact, durable and comfortable to grip.',
    image: IMG.tools, gallery: [IMG.tools, IMG.warehouse],
    availability: AVAILABILITY.AVAILABLE, featured: false, newArrival: false, popular: true,
    specifications: [
      { label: 'Power', value: '650 W' },
      { label: 'Chuck', value: '13 mm' },
      { label: 'No-load Speed', value: '0\u20132800 RPM' },
      { label: 'Modes', value: 'Drill + Impact' },
    ],
    relatedProductIds: ['p6', 'p1'], sku: 'BOSCH-ID-650', productCode: 'TL-8001',
    tags: ['drill', 'tool', 'power tool', 'bosch', 'impact'],
  },
  {
    id: 'p16', name: 'Crompton Water Pump 1HP', slug: 'crompton-water-pump-1hp',
    brand: 'crompton', category: 'plumbing',
    shortDescription: 'Self-priming 1HP domestic water pump.',
    description: 'Crompton 1HP self-priming monoblock water pump delivering strong, consistent flow for domestic overhead tank filling and general water transfer.',
    image: IMG.plumb1, gallery: [IMG.plumb1, IMG.plumb2],
    availability: AVAILABILITY.AVAILABLE, featured: true, newArrival: true, popular: false,
    specifications: [
      { label: 'Power', value: '1 HP' },
      { label: 'Type', value: 'Self-priming Monoblock' },
      { label: 'Max Head', value: '34 m' },
      { label: 'Outlet', value: '25 mm' },
    ],
    relatedProductIds: ['p12', 'p4', 'p5'], sku: 'CRM-PUMP-1HP', productCode: 'PL-9001',
    tags: ['pump', 'water pump', 'motor', 'plumbing', 'crompton'],
  },
];

// =============================================================
// DATA ACCESS LAYER (swap these for CMS queries later)
// =============================================================

export function getAllProducts() {
  return products;
}
export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || null;
}
export function getProductsByCategory(slug) {
  return products.filter((p) => p.category === slug);
}
export function getProductsByBrand(slug) {
  return products.filter((p) => p.brand === slug);
}
export function getRelatedProducts(product, limit = 4) {
  if (!product) return [];
  const byId = (product.relatedProductIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);
  if (byId.length >= limit) return byId.slice(0, limit);
  const extra = products.filter(
    (p) => p.category === product.category && p.id !== product.id && !byId.includes(p)
  );
  return [...byId, ...extra].slice(0, limit);
}
export function getSameBrandProducts(product, limit = 4) {
  if (!product) return [];
  return products.filter((p) => p.brand === product.brand && p.id !== product.id).slice(0, limit);
}
export function getAlternativeProducts(product, limit = 4) {
  if (!product) return [];
  return products
    .filter((p) => p.category === product.category && p.brand !== product.brand && p.id !== product.id)
    .slice(0, limit);
}
export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}
export function getNewArrivals() {
  return products.filter((p) => p.newArrival);
}
export function getPopularProducts() {
  return products.filter((p) => p.popular);
}
export function getAllCategories() {
  return categories;
}
export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug) || null;
}
export function getAllBrands() {
  return brands;
}
export function getBrandBySlug(slug) {
  return brands.find((b) => b.slug === slug) || null;
}
export function getBrandName(slug) {
  const b = brands.find((x) => x.slug === slug);
  return b ? b.name : slug;
}
export function getCategoryName(slug) {
  const c = categories.find((x) => x.slug === slug);
  return c ? c.name : slug;
}

// Simple client-side search across many fields.
export function searchProducts(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const haystack = [
      p.name, p.brand, getBrandName(p.brand), p.category, getCategoryName(p.category),
      p.sku, p.productCode, p.shortDescription, p.description,
      ...(p.tags || []),
      ...(p.specifications || []).map((s) => `${s.label} ${s.value}`),
    ].join(' ').toLowerCase();
    return haystack.includes(q);
  });
}
