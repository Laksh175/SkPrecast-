// ============================================================================
// SK PRECAST INDUSTRIES - CENTRALIZED ABOUT US DATA
// ============================================================================

// 1. Hero Banner Data
export const aboutHeroData = {
  breadcrumbs: [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about-us' }
  ],
  title: 'About SK Precast Industries',
  subtitle: "Deeply rooted in Palwal, Haryana — India's trusted precast concrete wall manufacturer and infrastructure partner delivering high-load RCC perimeter systems across the nation.",
  highlights: [
    { id: 1, label: 'Est. 2020 • Palwal Yard', icon: 'Building2' },
    { id: 2, label: 'High-Density M-30 / M-35 Concrete', icon: 'Award' },
    { id: 3, label: 'GST Registered: 06AEGFS8126M1ZK', icon: 'ShieldCheck' }
  ]
};

// 2. Company Story & Contact Overview Data
export const aboutCompanyData = {
  badge: 'About Our Company',
  paragraph1: 'Deeply rooted in Palwal Haryana, India, Sk Precast Industries is one of the well-known manufacturers and supplier of various types of RCC and concrete Compound Walls.',
  paragraph2: 'Newly established in the year 2020 and working under the hardship of Mr Vivek Koladiya our supervisor is the vivid mind behind the performance of our company. With his advanced approach in this field, we have been able to meet the demands of a big number of wholesale dealer’s retailers.',
  productRangeHeading: 'Our Product Range',
  productRangeText: 'We manufacture and export a various range of RCC Compound Walls like RCC Readymade Compound Wall, RCC Precast Compound Wall, RCC Panel Build Compound Wall and solar plant boundary wall etc. We obtain the raw material from reliable vendors and process them with our proficient staff by supplying them with tried and tested methods.',
  contactCard: {
    badge: 'Contact Us',
    companyName: 'SK Precast Industries',
    address: 'Opp. Adani CNG Pump, Delhi-Mathura Road Near Hanuman Mandir, Palwal, Haryana - 121102, India',
    phones: ['+91-8238902687', '+91-9896908099'],
    email: 'info@skprecast-industries.com'
  }
};

// 3. Mission & Vision Data
export const missionVisionData = {
  mission: {
    title: 'Our Mission',
    text: 'Supply a reliable and high-quality Product & service to the client best proficiently and cost-effectively.'
  },
  vision: {
    title: 'Our Vision',
    text: 'Our vision is to be the selected supplier of our dealers and spread across the nation as a prominent manufacturer and exporter.'
  }
};

// 4. Products Categories with Dropdowns (Row 1 on About Page)
export const dropdownCategoriesData = [
  {
    id: 'compound-wall',
    title: 'Compound Wall',
    iconName: 'Building2',
    count: '17 Products',
    products: [
      { id: 'cw-1', title: 'Readymade Compound Wall', link: '/readymade-compound-wall.htm' },
      { id: 'cw-2', title: 'Precast Heavy Duty Compound Wall', link: '/precast-heavy-duty-compound-wall.htm' },
      { id: 'cw-3', title: 'RCC Industrial One Piece Compound Wall', link: '/rcc-industrial-one-piece-compound-wall.htm' },
      { id: 'cw-4', title: 'Panel Build RCC Precast Compound Wall', link: '/panel-build-rcc-precast-compound-wall.htm' },
      { id: 'cw-5', title: 'Single Mould RCC Precast Compound Wall', link: '/single-mould-rcc-precast-compound-wall.htm' },
      { id: 'cw-6', title: 'Concrete Precast Single Panel Wall', link: '/concrete-precast-single-panel-wall.htm' },
      { id: 'cw-7', title: 'Heavy Readymade Boundary Wall', link: '/heavy-readymade-boundary-wall.htm' },
      { id: 'cw-8', title: 'Factory Boundary Wall', link: '/factory-boundary-wall.htm' },
      { id: 'cw-9', title: 'Precast Heavy Duty Boundary Wall', link: '/precast-heavy-duty-boundary-wall.htm' },
      { id: 'cw-10', title: 'Panel Build RCC Compound Wall', link: '/panel-build-rcc-compound-wall.htm' },
      { id: 'cw-11', title: 'Concrete Folding Compound Wall', link: '/concrete-folding-compound-wall.htm' },
      { id: 'cw-12', title: 'Industrial Compound Wall', link: '/industrial-compound-wall.htm' },
      { id: 'cw-13', title: 'Prefab RCC Readymade Precast Compound Wall', link: '/prefab-rcc-readymade-precast-compound-wall.htm' },
      { id: 'cw-14', title: 'RCC Readymade Compound Wall', link: '/rcc-readymade-compound-wall.htm' },
      { id: 'cw-15', title: 'RCC Compound Wall', link: '/rcc-compound-wall.htm' },
      { id: 'cw-16', title: 'RCC Folding Compound Wall', link: '/rcc-folding-compound-wall.htm' },
      { id: 'cw-17', title: 'Precast Compound Walls', link: '/precast-compound-walls.htm' }
    ]
  },
  {
    id: 'boundary-wall',
    title: 'Boundary Wall',
    iconName: 'Shield',
    count: '7 Products',
    products: [
      { id: 'bw-1', title: 'Concrete Boundary Wall', link: '/concrete-boundary-wall.htm' },
      { id: 'bw-2', title: 'Precast Boundary Wall', link: '/precast-boundary-wall.htm' },
      { id: 'bw-3', title: 'RCC Boundary Wall', link: '/rcc-boundary-wall.htm' },
      { id: 'bw-4', title: 'Readymade Boundary Wall', link: '/readymade-boundary-wall.htm' },
      { id: 'bw-5', title: 'Solar Plant Boundary Wall', link: '/solar-plant-boundary-wall.htm' },
      { id: 'bw-6', title: 'Cement Boundary Wall', link: '/cement-boundary-wall.htm' },
      { id: 'bw-7', title: 'Concrete Prestressed Boundary Walls', link: '/concrete-prestressed-boundary-walls.htm' }
    ]
  },
  {
    id: 'cement-wall',
    title: 'Cement Wall',
    iconName: 'Landmark',
    count: '2 Products',
    products: [
      { id: 'cm-1', title: 'RCC Cement Wall', link: '/rcc-cement-wall.htm' },
      { id: 'cm-2', title: 'Pre Fabricated Cement Wall', link: '/pre-fabricated-cement-wall.htm' }
    ]
  },
  {
    id: 'other-products',
    title: 'Other Products',
    iconName: 'PlusCircle',
    count: '4 Products',
    products: [
      { id: 'op-1', title: 'RCC Wall', link: '/rcc-wall.htm' },
      { id: 'op-2', title: 'Precast Wall', link: '/precast-wall.htm' },
      { id: 'op-3', title: 'RCC Folding Wall', link: '/rcc-folding-wall.htm' },
      { id: 'op-4', title: 'Readymade Walls', link: '/readymade-walls.htm' }
    ]
  }
];

// 5. Standalone Products (Row 2 on About Page)
export const standaloneProductsData = [
  { id: 'sp-1', title: 'Precast Concrete Wall', iconName: 'Sparkles', link: '/precast-concrete-wall.htm' },
  { id: 'sp-2', title: 'Precast Wall Panels', iconName: 'Layers', link: '/precast-wall-panels.htm' },
  { id: 'sp-3', title: 'RCC Precast Columns', iconName: 'Box', link: '/rcc-precast-columns.htm' },
  { id: 'sp-4', title: 'Industrial Boundary Wall', iconName: 'Factory', link: '/industrial-boundary-wall.htm' },
  { id: 'sp-5', title: 'Farm House Boundary Wall', iconName: 'Home', link: '/farm-house-boundary-wal.htm' }
];

// 6. Explore Our Range Slider Products
export const exploreRangeProductsData = [
  {
    id: 'er-1',
    title: 'RCC Folding Wall',
    image: '/assets/images/slider-wall-1.jpg',
    link: '/rcc-folding-wall.htm',
    subtitle: 'Modular Heavy-Duty Wall'
  },
  {
    id: 'er-2',
    title: 'Precast Concrete Wall',
    image: '/assets/images/slider-wall-2.jpg',
    link: '/precast-concrete-wall.htm',
    subtitle: 'Reinforced Precast Barrier'
  },
  {
    id: 'er-3',
    title: 'Precast Wall',
    image: '/assets/images/slider-wall-3.jpg',
    link: '/precast-wall.htm',
    subtitle: 'Commercial Precast Solution'
  },
  {
    id: 'er-4',
    title: 'Prefab RCC Readymade Precast Compound Wall',
    image: '/assets/images/slider-wall-4.jpg',
    link: '/prefab-rcc-readymade-precast-compound-wall.htm',
    subtitle: 'Precision Engineered Wall'
  },
  {
    id: 'er-5',
    title: 'Readymade Walls',
    image: '/assets/images/slider-wall-5.jpg',
    link: '/readymade-walls.htm',
    subtitle: 'Rapid Installation Wall'
  },
  {
    id: 'er-6',
    title: 'RCC Readymade Compound Wall',
    image: '/assets/images/slider-wall-6.jpg',
    link: '/rcc-readymade-compound-wall.htm',
    subtitle: 'High-Durability Boundary Wall'
  }
];

// 7. Why Choose Us Factors Data for Arc Section
export const whyChooseUsFactorsData = [
  {
    id: 1,
    number: '01',
    title: 'Massive distribution network across the world',
    description: 'Prompt logistics & broad delivery reach across regional and national hubs.',
    iconName: 'Globe',
    points: [
      'Prompt logistics & delivery reach across national hubs',
      'Reliable fleet network ensuring zero transit delays',
      'Direct delivery to project sites across India'
    ]
  },
  {
    id: 2,
    number: '02',
    title: 'Large warehouse',
    description: 'Massive yard inventory ready for immediate, uninterrupted project dispatches.',
    iconName: 'Warehouse',
    points: [
      'Massive yard inventory ready for immediate dispatch',
      'High-capacity curing and precast panel storage',
      'Uninterrupted bulk supply for infrastructure projects'
    ]
  },
  {
    id: 3,
    number: '03',
    title: 'Wide range of quality permitted equipment',
    description: 'Advanced industrial casting molds and high-frequency vibration technology.',
    iconName: 'ShieldCheck',
    points: [
      'Advanced industrial casting molds and vibration tech',
      'High-grade prestressed steel wire reinforcement',
      'Strict compression strength & durability testing'
    ]
  },
  {
    id: 4,
    number: '04',
    title: 'Well-structured infrastructure',
    description: 'Specialized precast casting yard equipped for high-volume daily manufacturing.',
    iconName: 'Building2',
    points: [
      'Specialized casting yard in Palwal, Haryana',
      'Scalable daily manufacturing production capacity',
      'Proficient technical staff overseeing quality casting'
    ]
  },
  {
    id: 5,
    number: '05',
    title: 'Realistic price range',
    description: 'Competitive direct factory pricing without any middleman markups.',
    iconName: 'Tag',
    points: [
      'Competitive direct factory pricing with zero middleman',
      'Transparent cost structure for bulk & wholesale orders',
      'Maximum budget savings with tested concrete durability'
    ]
  },
  {
    id: 6,
    number: '06',
    title: 'Expedient business policy',
    description: 'Transparent client dealings, ethical standards, and dependable project commitments.',
    iconName: 'FileCheck',
    points: [
      '100% transparent client dealings and commitments',
      'Dedicated support from quotation to site installation',
      'Ethical standards with GST verified compliance'
    ]
  }
];
