import { allProductsData } from './productsData';

// ----------------------------------------------------------------------------
// 1. HERO SECTION DATA
// ----------------------------------------------------------------------------
export const heroSectionData = {
  badge: "India's Trusted Precast Concrete Manufacturer",
  heading: {
    line1: "Low Cost, High Strength",
    line2: "Precast Walls —",
    line3: "Get The Best Quality Today!"
  },
  description: "High-strength, weather-resistant precast compound & boundary walls built for industrial, commercial, and residential boundaries. Our fast modular on-site installation saves up to 60% construction time and delivers certified ISO-grade high-tensile RCC durability with zero maintenance.",
  whatsappButton: {
    text: "Connect on WhatsApp",
    link: "https://api.whatsapp.com/send?phone=918238902687&text=Hello%20SK%20Precast%20Industries,%20I%20am%20interested%20in%20Precast%20Concrete%20Boundary%20Wall%20%26%20RCC%20Folding%20Compound%20Wall%20solutions%20from%20your%20Palwal%20manufacturing%20plant.%20Please%20share%20factory%20price%20list%20and%20catalogue."
  },
  bgImage: "/assets/images/hero-page-banner.jpeg",
  bgImages: [
    "/assets/images/hero-page-banner.jpeg",
    "/assets/images/hero-section-image2.jpeg",
    "/assets/images/hero-banner-image3.jpeg",
    "/assets/images/home-banner-image4.jpeg"
  ],
  highlights: [
    { 
      id: 1,
      line1: 'Direct',
      line2: 'Factory', 
      label: 'Palwal, Haryana Unit',
      valueColor: 'text-[#e59b37]'
    },
    { 
      id: 2,
      line1: 'Heavy-Duty',
      line2: 'RCC', 
      label: 'Pre-Stressed Steel Wire',
      valueColor: 'text-[#e59b37]'
    },
    { 
      id: 3,
      line1: 'Fast',
      line2: 'Modular', 
      label: 'Quick Site Installation',
      valueColor: 'text-[#e59b37]'
    },
    { 
      id: 4,
      line1: 'GST',
      line2: 'Verified', 
      label: '06AEGFS8126M1ZK',
      valueColor: 'text-[#e59b37]'
    }
  ]
};

// ----------------------------------------------------------------------------
// 2. PRODUCT RANGE DATA
// ----------------------------------------------------------------------------
export const productRangeHeaderData = {
  title: 'Our Product Range',
  subtitle: 'Discover India’s trusted RCC precast concrete solutions crafted with premium raw materials, superior load-bearing strength, and rapid installation engineering.'
};

export const productRangeData = [
  {
    id: 'compound-wall',
    title: 'Compound Wall',
    image: '/assets/images/product-range-1.jpeg',
    items: [
      'Concrete Folding Compound Wall',
      'Concrete Precast Single Panel Wall',
      'Factory Boundary Wall',
      'Heavy Readymade Boundary Wall'
    ]
  },
  {
    id: 'boundary-wall',
    title: 'Boundary Wall',
    image: '/assets/images/wall-image-2-home.jpeg',
    items: [
      'Cement Boundary Wall',
      'Concrete Boundary Wall',
      'Concrete Prestressed Boundary Walls',
      'Precast Boundary Wall'
    ]
  },
  {
    id: 'cement-wall',
    title: 'Cement Wall',
    image: '/assets/images/wall-image-3-home.jpeg',
    items: [
      'Pre Fabricated Cement Wall',
      'RCC Cement Wall'
    ]
  },
  {
    id: 'other-products',
    title: 'Other Products',
    image: '/assets/images/wall-image-4-home.jpeg',
    items: [
      'Precast Wall',
      'RCC Folding Wall',
      'RCC Wall',
      'Readymade Walls'
    ]
  }
];

// ----------------------------------------------------------------------------
// 3. WALL MANUFACTURING UNIT SLIDER DATA
// ----------------------------------------------------------------------------
export const manufacturingSliderHeaderData = {
  title: 'Wall Manufacturing Unit',
  subtitle: 'Take an inside look at our state-of-the-art precast manufacturing facility in Palwal, Haryana, equipped with high-precision casting beds and automated curing technology.'
};

export const manufacturingSliderData = [
  { id: 1, image: '/assets/images/manufacturing/mfg-1.jpg', alt: 'Precast Wall Manufacturing & Casting Yard Palwal' },
  { id: 2, image: '/assets/images/manufacturing/mfg-2.jpg', alt: 'Automated Casting & Slab Production Line Palwal' },
  { id: 3, image: '/assets/images/manufacturing/mfg-3.jpg', alt: 'Precast Material Dispatch & Logistics Truck' },
  { id: 4, image: '/assets/images/manufacturing/mfg-4.jpg', alt: 'Heavy-Duty Casting Beds & Concrete Compaction' },
  { id: 5, image: '/assets/images/manufacturing/mfg-5.jpg', alt: 'Steel Casting Beds & Column Molds Facility' },
  { id: 6, image: '/assets/images/manufacturing/mfg-6.jpg', alt: 'Cured Precast Panels & Palletized Yard Storage' },
];

// ----------------------------------------------------------------------------
// 4. ABOUT US HOME SECTION DATA
// ----------------------------------------------------------------------------
export const aboutHomeSectionData = {
  tag: 'About Us',
  heading: "India's Trusted Manufacturer of RCC Precast Solutions",
  paragraph: "Deeply rooted in Palwal, Haryana, SK Precast Industries is a premier manufacturer and supplier of heavy-duty RCC and concrete compound walls. Established in 2020 under the visionary leadership of Mr. Vivek Koladiya, our company delivers tried-and-tested precast concrete infrastructure to wholesale dealers, retailers, and industrial clients across the nation.",
  image: '/assets/images/about-us-home.jpeg',
  stats: [
    {
      id: 'gst',
      label: 'Tax Registered',
      title: 'GST No',
      value: '06AEGFS8126M1ZK',
      isMono: true,
      icon: 'ReceiptText'
    },
    {
      id: 'turnover',
      label: 'Scale & Volume',
      title: 'Annual Turnover',
      value: 'More Than Rs. 1 Crore',
      isMono: false,
      icon: 'PiggyBank'
    }
  ],
  button: {
    text: 'Discover More',
    link: '/about-us'
  }
};

export const aboutSectionData = {
  tag: 'About SK Precast Industries',
  title: 'About SK Precast Industries',
  paragraph1: "Deeply rooted in Palwal Haryana, India, Sk Precast Industries is one of the well-known manufacturers and supplier of various types of RCC and concrete Compound Walls.",
  paragraph2: "Newly established in the year 2020 and working under the hardship of Mr Vivek Koladiya our supervisor is the vivid mind behind the performance of our company. With his advanced approach in this field, we have been able to meet the demands of a big number of wholesale dealer’s retailers.",
  productRangeHeading: "Our Product Range",
  productRangeText: "We manufacture and export a various range of RCC Compound Walls like RCC Readymade Compound Wall, RCC Precast Compound Wall, RCC Panel Build Compound Wall and solar plant boundary wall etc. We obtain the raw material from reliable vendors and process them with our proficient staff by supplying them with tried and tested methods.",
  vision: {
    title: 'Our Vision',
    text: 'Our vision is to be the selected supplier of our dealers and spread across the nation as a prominent manufacturer and exporter.'
  },
  mission: {
    title: 'Our Mission',
    text: 'Supply a reliable and high-quality Product & service to the client best proficiently and cost-effectively.'
  },
  whyUs: {
    title: 'Why Choose Us?',
    subtitle: 'We have a vast list of happy clients who believe our company due to the following factors:',
    factors: [
      {
        id: 1,
        number: '01',
        title: 'Massive distribution network across the world',
        description: 'Prompt logistics & broad delivery reach across regional and national hubs.',
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
        points: [
          '100% transparent client dealings and commitments',
          'Dedicated support from quotation to site installation',
          'Ethical standards with GST verified compliance'
        ]
      }
    ]
  },
  coreValues: [
    {
      title: 'Quality Excellence',
      description: 'High-density machine-vibrated RCC reinforced with prestressed steel wire for maximum structural load capacity.'
    },
    {
      title: 'Client Value',
      description: 'Direct factory pricing from our Palwal casting yard with zero middleman or trader commissions for maximum project savings.'
    },
    {
      title: 'Reliable Collaboration',
      description: 'End-to-end partnership with infrastructure developers, contractors, and solar plants for on-time site installation.'
    },
    {
      title: 'Nationwide Trust',
      description: 'ISO certified quality benchmarks, 06AEGFS8126M1ZK GST verified compliance, and prompt dispatch across India.'
    }
  ],
  image1: '/assets/images/about-image.jpg',
  image2: '/assets/images/slider-wall-1.jpg',
  stats: [
    {
      id: 'founder',
      label: 'Leadership',
      title: 'Founder & CEO',
      value: 'Mr. Vivek Koladiya',
      isMono: false
    },
    {
      id: 'established',
      label: 'Track Record',
      title: 'Established',
      value: 'Year 2020',
      isMono: false
    },
    {
      id: 'gst',
      label: 'Tax Registered',
      title: 'GST No',
      value: '06AEGFS8126M1ZK',
      isMono: true
    },
    {
      id: 'turnover',
      label: 'Scale & Volume',
      title: 'Annual Turnover',
      value: 'More Than Rs. 1 Crore',
      isMono: false
    }
  ]
};

// ----------------------------------------------------------------------------
// 5. POPULAR PRODUCTS DATA (11 Verified Products with Live Prices & MOQs)
// ----------------------------------------------------------------------------
export const popularProductsHeaderData = {
  title: 'Popular Products',
  subtitle: 'Explore our most demanded precast concrete and RCC boundary wall solutions trusted by infrastructure developers, contractors, and property owners across India.'
};

const rawPopularProducts = [
  {
    id: 1,
    name: 'RCC Wall',
    slug: 'rcc-wall',
    image: '/assets/images/rcc-wall.jpg',
    description: 'High-strength RCC boundary walls engineered for heavy load resistance and site security.',
    price: '₹ 80.00 - 250.00 / Square Feet',
    moq: '1000 Square Feet',
    unit: 'Square Feet'
  },
  {
    id: 2,
    name: 'Readymade Boundary Wall',
    slug: 'readymade-boundary-wall',
    image: '/assets/images/wall-image-3-home.jpeg',
    description: 'Modular precast readymade boundary walls built for fast and cost-effective site setup.',
    price: '₹ 80.00 - 250.00 / Feet',
    moq: '250 Feet',
    unit: 'Square Feet'
  },
  {
    id: 3,
    name: 'Prefab RCC Readymade Precast Compound Wall',
    slug: 'prefab-rcc-readymade-precast-compound-wall',
    image: '/assets/images/prefab-rcc-readymade-precast-compound-wall.jpg',
    description: 'Factory-cured prefab compound walls offering seamless interlocking and weatherproofing.',
    price: '₹ 80.00 - 250.00 / Square Feet',
    moq: '1000 Square Feet',
    unit: 'Square Feet'
  },
  {
    id: 4,
    name: 'RCC Readymade Compound Wall',
    slug: 'rcc-readymade-compound-wall',
    image: '/assets/images/rcc-readymade-compound-wall.jpg',
    description: 'Premium RCC readymade compound walls for residential plots and industrial fencing.',
    price: '₹ 80.00 - 250.00 / Square Feet',
    moq: '1000 Square Feet',
    unit: 'Square Feet'
  },
  {
    id: 5,
    name: 'RCC Compound Wall',
    slug: 'rcc-compound-wall',
    image: '/assets/images/rcc-compound-wall.jpg',
    description: 'Heavy-duty reinforced concrete compound walls tailored for permanent perimeter fencing.',
    price: '₹ 80.00 - 250.00 / Square Feet',
    moq: '1000 Square Feet',
    unit: 'Square Feet'
  },
  {
    id: 6,
    name: 'RCC Folding Compound Wall',
    slug: 'rcc-folding-compound-wall',
    image: '/assets/images/heavy-readymade-boundary-wall-2.jpg',
    description: 'Interlocking folding precast panels offering flexible and quick on-site installation.',
    price: '₹ 80.00 - 250.00 / Square Feet',
    moq: '250 Feet',
    unit: 'Feet'
  },
  {
    id: 7,
    name: 'Readymade Compound Wall',
    slug: 'readymade-compound-wall',
    image: '/assets/images/industrial-compound-wall-square.jpg',
    description: 'Maintenance-free readymade walls engineered with high-density vibrated concrete.',
    price: '₹ 80.00 - 250.00 / Square Feet',
    moq: '500 Feet',
    unit: 'Feet'
  },
  {
    id: 8,
    name: 'Readymade Walls',
    slug: 'readymade-walls',
    image: '/assets/images/readymade-walls.jpg',
    description: 'Universal readymade wall slabs and columns suitable for farmhouses and industrial yards.',
    price: '₹ 80.00 - 250.00 / Square Feet',
    moq: '1000 Square Feet',
    unit: 'Square Feet'
  },
  {
    id: 9,
    name: 'RCC Folding Wall',
    slug: 'rcc-folding-wall',
    image: '/assets/images/rcc-folding-wall.jpg',
    description: 'Heavy-duty precast folding panels designed for high wind resistance and durability.',
    price: '₹ 80.00 - 250.00 / piece',
    moq: '100 piece',
    unit: 'piece'
  },
  {
    id: 10,
    name: 'Precast Wall',
    slug: 'precast-wall',
    image: '/assets/images/precast-wall.jpg',
    description: 'High-density vibrated precast concrete walls for warehousing and commercial complexes.',
    price: '₹ 80.00 - 250.00 / Square Feet',
    moq: '1000 Square Feet',
    unit: 'Square Feet'
  },
  {
    id: 11,
    name: 'Solar Plant Boundary Wall',
    slug: 'solar-plant-boundary-wall',
    image: '/assets/images/concrete-folding-compound-wall.jpg',
    description: 'Specialized heavy-duty security walls engineered for large-scale solar power plants.',
    price: '₹ 80.00 - 250.00 / feet',
    moq: '1000 Square Feet',
    unit: 'Square Feet'
  }
];

export const popularProductsData = rawPopularProducts.map((item) => {
  const matched = allProductsData.find((p) => p.slug === item.slug);
  return {
    ...item,
    name: matched?.name || item.name,
    image: matched?.image || item.image,
    price: matched?.price || item.price,
    moq: matched?.moq || item.moq,
    unit: matched?.unit || item.unit
  };
});

// ----------------------------------------------------------------------------
// 6. WHY CHOOSE US DATA
// ----------------------------------------------------------------------------
export const whyChooseUsHeaderData = {
  title: 'Why Choose SK Precast Industries?',
  subtitle: "Here's why developers, contractors, and property owners choose us for precast boundary walls:"
};

export const whyChooseUsData = [
  {
    id: 1,
    title: 'In-House Manufacturing',
    description: 'Direct factory pricing from our Palwal casting yard with zero middleman or trader commissions.',
    iconKey: 'Factory',
    iconColor: 'text-amber-700',
    pinBack: 'bg-amber-600/90',
    pinFront: 'bg-gradient-to-br from-[#fef08a] via-[#facc15] to-[#ca8a04] shadow-[0_4px_12px_rgba(250,204,21,0.5)]',
    cardBg: 'bg-[#fffef0]',
    cardBorder: 'border-yellow-200/90',
    tilt: 'lg:-rotate-[4.5deg] hover:lg:rotate-0',
    offset: 'lg:translate-y-0'
  },
  {
    id: 2,
    title: 'High-Strength Concrete',
    description: 'Machine-vibrated high-density concrete reinforced with high-tensile prestressed steel wire.',
    iconKey: 'ShieldCheck',
    iconColor: 'text-amber-800',
    pinBack: 'bg-amber-800',
    pinFront: 'bg-gradient-to-br from-[#fed7aa] via-[#f97316] to-[#c2410c] shadow-[0_4px_12px_rgba(249,115,22,0.45)]',
    cardBg: 'bg-[#fffbf2]',
    cardBorder: 'border-amber-200/80',
    tilt: 'lg:rotate-[5.5deg] hover:lg:rotate-0',
    offset: 'lg:translate-y-12'
  },
  {
    id: 3,
    title: '3x Rapid Installation',
    description: 'Modular interlocking panels installed in days instead of months, saving up to 40% on labor costs.',
    iconKey: 'Zap',
    iconColor: 'text-amber-800',
    pinBack: 'bg-amber-800',
    pinFront: 'bg-gradient-to-br from-[#fed7aa] via-[#f97316] to-[#c2410c] shadow-[0_4px_12px_rgba(249,115,22,0.45)]',
    cardBg: 'bg-[#fffbf2]',
    cardBorder: 'border-amber-200/80',
    tilt: 'lg:-rotate-[4deg] hover:lg:rotate-0',
    offset: 'lg:translate-y-2'
  },
  {
    id: 4,
    title: 'Zero Maintenance',
    description: 'Smooth factory-cured concrete finish requiring zero plastering, weatherproofing, or recurring painting.',
    iconKey: 'Sparkles',
    iconColor: 'text-amber-700',
    pinBack: 'bg-yellow-700',
    pinFront: 'bg-gradient-to-br from-[#fef08a] via-[#eab308] to-[#a16207] shadow-[0_4px_12px_rgba(234,179,8,0.45)]',
    cardBg: 'bg-[#fffdf2]',
    cardBorder: 'border-yellow-200/80',
    tilt: 'lg:rotate-[5deg] hover:lg:rotate-0',
    offset: 'lg:translate-y-16'
  }
];

// ----------------------------------------------------------------------------
// 7. CLIENT TESTIMONIALS DATA (10 Authentic Reviews)
// ----------------------------------------------------------------------------
export const testimonialsHeaderData = {
  title: "Real Stories of Trust,",
  highlight: "Strength & Precast Excellence.",
  subtitle: "Discover why industrial developers, farmhouse owners, and infrastructure contractors across Delhi NCR & Haryana trust SK Precast Industries for their perimeter boundary walls.",
  stats: [
    {
      id: 1,
      value: "2020",
      label: "Est. Year / 5+ Yrs Trust",
      color: "text-amber-400"
    },
    {
      id: 2,
      value: "4.9 / 5.0",
      label: "Customer Satisfaction",
      color: "text-amber-400"
    }
  ]
};

export const testimonialsCol1 = [
  {
    id: 1,
    name: 'Manish kumar sharma',
    initials: 'MS',
    role: 'Commercial Project Head',
    rating: '5.0',
    relativeTime: '4 months ago',
    content: 'We had a great experience working with SK Precast Walls. The quality of the precast wall materials supplied was excellent, and deliveries were made as committed. What truly sets them apart is their after-sales support. Even after completion of the supply, their team extended full cooperation for rework requirements and provided prompt assistance whenever needed. Their personal involvement, responsiveness, and commitment to customer satisfaction are highly appreciated. A reliable vendor with quality products and exceptional service. Highly recommended for anyone looking for precast wall solutions.'
  },
  {
    id: 2,
    name: 'Chandubhai Makwana',
    initials: 'CM',
    role: 'Contractor & Builder',
    rating: '5.0',
    relativeTime: '2 years ago',
    content: 'Great job done by Mr. Vivek Patel he was very professional & soft spoken. Quality of material is best as far as I know SK Precast is best in Compound Wall manufacturing.'
  },
  {
    id: 3,
    name: 'Rahul Boricha',
    initials: 'RB',
    role: 'Project Head',
    rating: '5.0',
    relativeTime: 'a year ago',
    content: 'SK Precast Industries truly offers premium quality timely service, ensuring secure and durable precast boundary walls that exceed customer expectations !'
  },
  {
    id: 4,
    name: 'Adesh Chaudhary',
    initials: 'AC',
    role: 'Residential Plot Owner, Palwal',
    rating: '5.0',
    relativeTime: '11 months ago',
    content: 'I had a Precast RCC Readymade Wall installed for my residential plot by SK Precast Industries Palwal, and I am very satisfied. The panels are reinforced with steel, giving the wall incredible strength. Installation was smooth, quick, and professional. Unlike brick walls, which can be messy and time-consuming, this solution was fast and reliable. I also love the clean, uniform finish. I strongly recommend SK Precast Industries for anyone looking for a durable, stylish, and affordable precast compound wall.'
  },
  {
    id: 5,
    name: 'ghanshyam kavani',
    initials: 'GK',
    role: 'Commercial Client',
    rating: '5.0',
    relativeTime: 'a year ago',
    content: 'Excellent quality and service! The precast boundary walls are durable, well-made, and installed with precision. Highly professional team and timely delivery. Very satisfied with SK Precast Industries'
  }
];

export const testimonialsCol2 = [
  {
    id: 6,
    name: 'Pura lal Chouhan',
    initials: 'PC',
    role: '15-Acre Project Owner, Palwal',
    rating: '5.0',
    relativeTime: 'a month ago',
    content: 'We got our 15-acre project in Palwal completed by SK Precast Industries. The quality of the precast material, finishing, and installation work was excellent. The team was professional, responsive, and completed the work properly.\n\nHighly recommended for Precast Boundary Walls in Palwal. Great quality and reliable service! 👍'
  },
  {
    id: 7,
    name: 'Balram Gehalod',
    initials: 'BG',
    role: 'Client, Palwal',
    rating: '5.0',
    relativeTime: '6 months ago',
    content: 'I needed a precast compound wall, and SK Precast completed the entire work in just 3 days. Their team is highly responsible and technically sound.'
  },
  {
    id: 8,
    name: 'Bharat Gour',
    initials: 'BG',
    role: 'Farmhouse Owner, Faridabad',
    rating: '5.0',
    relativeTime: '7 months ago',
    content: 'We had a Precast Concrete Wall made for our farmhouse near Faridabad. The concrete quality is excellent, surface smooth, and alignment perfect. The entire project was completed before the promised date. Honest and hardworking team — totally satisfied!'
  },
  {
    id: 9,
    name: 'Arun Arun parihar',
    initials: 'AP',
    role: 'Farmhouse & Plot Owner, Haryana',
    rating: '5.0',
    relativeTime: '8 months ago',
    content: 'I got my farmhouse boundary wall done by SK Precast Industries Palwal, and I am extremely happy with their work. The precast RCC wall panels are smooth, uniform, and weather-resistant. Their engineers supervised everything carefully. It’s not only strong but also gives a very neat look to the property. Compared to brickwork, precast walls from SK Precast save time, money, and maintenance costs. Highly recommended for farmhouse and plot fencing anywhere in Haryana.'
  },
  {
    id: 10,
    name: 'Rinay Nasit',
    initials: 'RN',
    role: 'Satisfied Customer',
    rating: '5.0',
    relativeTime: 'a year ago',
    content: 'SK Precast Industries is one of the best for precast compound walls. Their quality is excellent, and they complete the work on time. Their behavior is very good—they take care of the customer and are very cooperative. I am very satisfied with their work. Definitely recommend!'
  }
];

// ----------------------------------------------------------------------------
// 8. CONTACT FORM & SHOWCASE DATA
// ----------------------------------------------------------------------------
export const contactSectionHeaderData = {
  badge: "Reach Out To Us",
  title: "Let's Get In Touch.",
  email: "info@skprecast-industries.com",
  phone: "+91-8238902687",
  showcase: {
    image: "/assets/images/form-image.jpeg",
    badge: "Palwal Unit, Haryana",
    title: "Direct Manufacturer Pricing",
    description: "Get high-density vibrated precast boundary walls delivered directly from our Palwal plant across Delhi NCR & North India.",
    features: [
      { id: 1, text: "Quick Quote in 30 Mins", icon: "Clock", highlight: true },
      { id: 2, text: "Pan-India Supply", icon: "MapPin", highlight: false }
    ]
  }
};

export const allProductsList = [
  "Cement Boundary Wall",
  "Concrete Boundary Wall",
  "Concrete Folding Compound Wall",
  "Concrete Precast Single Panel Wall",
  "Concrete Prestressed Boundary Walls",
  "Factory Boundary Wall",
  "Farm House Boundary Wall",
  "Heavy Readymade Boundary Wall",
  "Industrial Boundary Wall",
  "Industrial Compound Wall",
  "Panel Build RCC Compound Wall",
  "Panel Build RCC Precast Compound Wall",
  "Pre Fabricated Cement Wall",
  "Precast Boundary Wall",
  "Precast Compound Walls",
  "Precast Concrete Wall",
  "Precast Heavy Duty Boundary Wall",
  "Precast Heavy Duty Compound Wall",
  "Precast Wall",
  "Precast Wall Panels",
  "Prefab RCC Readymade Precast Compound Wall",
  "RCC Boundary Wall",
  "RCC Cement Wall",
  "RCC Compound Wall",
  "RCC Folding Compound Wall",
  "RCC Folding Wall",
  "RCC Industrial One Piece Compound Wall",
  "RCC Precast Columns",
  "RCC Readymade Compound Wall",
  "RCC Wall",
  "Readymade Boundary Wall",
  "Readymade Compound Wall",
  "Readymade Walls",
  "Single Mould RCC Precast Compound Wall",
  "Solar Plant Boundary Wall",
  "Other / Custom Precast Product"
];

export const countriesList = [
  "India",
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo, The Democratic Republic of The",
  "Cook Islands",
  "Costa Rica",
  "Cote D'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "France, Metropolitan",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard and McDonald Islands",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and The Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and The South Sandwich Islands",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St. Helena",
  "St. Pierre and Miquelon",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen Islands",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "United States Minor Outlying Islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City State (Holy See)",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna Islands",
  "Western Sahara",
  "Yemen",
  "Yugoslavia",
  "Zambia",
  "Zimbabwe"
];

export const countryCodes = [
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼' },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲' },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾' },
  { code: 'NP', name: 'Nepal', dialCode: '+977', flag: '🇳🇵' },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩' },
  { code: 'LK', name: 'Sri Lanka', dialCode: '+94', flag: '🇱🇰' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩' },
  { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭' },
  { code: 'VN', name: 'Vietnam', dialCode: '+84', flag: '🇻🇳' },
  { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭' },
  { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷' },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷' },
  { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺' },
  { code: 'AF', name: 'Afghanistan', dialCode: '+93', flag: '🇦🇫' },
  { code: 'AL', name: 'Albania', dialCode: '+355', flag: '🇦🇱' },
  { code: 'DZ', name: 'Algeria', dialCode: '+213', flag: '🇩🇿' },
  { code: 'AD', name: 'Andorra', dialCode: '+376', flag: '🇦🇩' },
  { code: 'AO', name: 'Angola', dialCode: '+244', flag: '🇦🇴' },
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹' },
  { code: 'AZ', name: 'Azerbaijan', dialCode: '+994', flag: '🇦🇿' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
  { code: 'BT', name: 'Bhutan', dialCode: '+975', flag: '🇧🇹' },
  { code: 'BG', name: 'Bulgaria', dialCode: '+359', flag: '🇧🇬' },
  { code: 'KH', name: 'Cambodia', dialCode: '+855', flag: '🇰🇭' },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
  { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴' },
  { code: 'HR', name: 'Croatia', dialCode: '+385', flag: '🇭🇷' },
  { code: 'CY', name: 'Cyprus', dialCode: '+357', flag: '🇨🇾' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420', flag: '🇨🇿' },
  { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮' },
  { code: 'GR', name: 'Greece', dialCode: '+30', flag: '🇬🇷' },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852', flag: '🇭🇰' },
  { code: 'HU', name: 'Hungary', dialCode: '+36', flag: '🇭🇺' },
  { code: 'IS', name: 'Iceland', dialCode: '+354', flag: '🇮🇸' },
  { code: 'IR', name: 'Iran', dialCode: '+98', flag: '🇮🇷' },
  { code: 'IQ', name: 'Iraq', dialCode: '+964', flag: '🇮🇶' },
  { code: 'IL', name: 'Israel', dialCode: '+972', flag: '🇮🇱' },
  { code: 'JO', name: 'Jordan', dialCode: '+962', flag: '🇯🇴' },
  { code: 'KZ', name: 'Kazakhstan', dialCode: '+7', flag: '🇰🇿' },
  { code: 'LB', name: 'Lebanon', dialCode: '+961', flag: '🇱🇧' },
  { code: 'LU', name: 'Luxembourg', dialCode: '+352', flag: '🇱🇺' },
  { code: 'MV', name: 'Maldives', dialCode: '+960', flag: '🇲🇻' },
  { code: 'MT', name: 'Malta', dialCode: '+356', flag: '🇲🇹' },
  { code: 'MU', name: 'Mauritius', dialCode: '+230', flag: '🇲🇺' },
  { code: 'MC', name: 'Monaco', dialCode: '+377', flag: '🇲🇨' },
  { code: 'MA', name: 'Morocco', dialCode: '+212', flag: '🇲🇦' },
  { code: 'MM', name: 'Myanmar', dialCode: '+95', flag: '🇲🇲' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰' },
  { code: 'PA', name: 'Panama', dialCode: '+507', flag: '🇵🇦' },
  { code: 'PE', name: 'Peru', dialCode: '+51', flag: '🇵🇪' },
  { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
  { code: 'RO', name: 'Romania', dialCode: '+40', flag: '🇷🇴' },
  { code: 'RS', name: 'Serbia', dialCode: '+381', flag: '🇷🇸' },
  { code: 'SK', name: 'Slovakia', dialCode: '+421', flag: '🇸🇰' },
  { code: 'SI', name: 'Slovenia', dialCode: '+386', flag: '🇸🇮' },
  { code: 'TW', name: 'Taiwan', dialCode: '+886', flag: '🇹🇼' },
  { code: 'TZ', name: 'Tanzania', dialCode: '+255', flag: '🇹🇿' },
  { code: 'UG', name: 'Uganda', dialCode: '+256', flag: '🇺🇬' },
  { code: 'UA', name: 'Ukraine', dialCode: '+380', flag: '🇺🇦' },
  { code: 'UY', name: 'Uruguay', dialCode: '+598', flag: '🇺🇾' },
  { code: 'UZ', name: 'Uzbekistan', dialCode: '+998', flag: 'UZ' },
  { code: 'VE', name: 'Venezuela', dialCode: '+58', flag: '🇻🇪' },
  { code: 'YE', name: 'Yemen', dialCode: '+967', flag: '🇾🇪' },
  { code: 'ZM', name: 'Zambia', dialCode: '+260', flag: '🇿🇲' },
  { code: 'ZW', name: 'Zimbabwe', dialCode: '+263', flag: '🇿🇼' }
];
