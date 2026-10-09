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
    name: 'Flotech Engineering Pvt. Ltd',
    initials: 'FE',
    role: 'Farmhouse Owner, Tigoun',
    rating: '5.0',
    relativeTime: '9 months ago',
    statsText: '1 review · 1 photo',
    image: '/assets/Reviews/image-1.webp',
    imageCaption: 'Farmhouse Precast Compound Wall at Tigoun, Faridabad',
    content: 'Our farmhouse at Tigoun was secured with a precast compound wall from SK Precast Industries. The wall panels are strong, durable, and weather-resistant. The RCC wall installation was completed on schedule, and the team maintained professionalism throughout. The finished boundary wall looks neat and elegant. I highly recommend SK Precast Industries for anyone in Tigoun who wants a precast readymade boundary wall or precast wall.'
  },
  {
    id: 2,
    name: 'Pura lal Chouhan',
    initials: 'PC',
    role: '15-Acre Project Owner, Palwal',
    rating: '5.0',
    relativeTime: 'a month ago',
    content: 'We got our 15-acre project in Palwal completed by SK Precast Industries. The quality of the precast material, finishing, and installation work was excellent. The team was professional, responsive, and completed the work properly.\n\nHighly recommended for Precast Boundary Walls in Palwal. Great quality and reliable service! 👍'
  },
  {
    id: 3,
    name: 'Dhruv Talaviya',
    initials: 'DT',
    role: 'Plot & Project Owner',
    rating: '5.0',
    relativeTime: '6 months ago',
    statsText: '1 review · 1 photo',
    image: '/assets/Reviews/image-2.webp',
    imageCaption: 'Boundary Wall Project by SK Precast Industries',
    content: 'SK Precast Industries completed our boundary wall project on time and with excellent quality. The material used was very strong and durable. Their team is cooperative and highly professional. I wholeheartedly recommend them.'
  },
  {
    id: 4,
    name: 'Balram Gehalod',
    initials: 'BG',
    role: 'Client, Palwal',
    rating: '5.0',
    relativeTime: '6 months ago',
    content: 'I needed a precast compound wall, and SK Precast completed the entire work in just 3 days. Their team is highly responsible and technically sound.'
  },
  {
    id: 5,
    name: 'Adesh Chaudhary',
    initials: 'AC',
    role: 'Residential Plot Owner, Palwal',
    rating: '5.0',
    relativeTime: '11 months ago',
    content: 'I had a Precast RCC Readymade Wall installed for my residential plot by SK Precast Industries Palwal, and I am very satisfied. The panels are reinforced with steel, giving the wall incredible strength. Installation was smooth, quick, and professional. Unlike brick walls, which can be messy and time-consuming, this solution was fast and reliable. I also love the clean, uniform finish. I strongly recommend SK Precast Industries for anyone looking for a durable, stylish, and affordable precast compound wall.'
  },
  {
    id: 6,
    name: 'Alpesh Nasit',
    initials: 'AN',
    role: 'Boundary Wall Project Owner',
    rating: '5.0',
    relativeTime: 'a year ago',
    statsText: '2 reviews · 1 photo',
    image: '/assets/Reviews/image-7.webp',
    imageCaption: 'Precast Wall Project by SK Precast Industries',
    content: 'Just got this project of mine completed from SK Precast, i saw his work on Justdial and i am really impressed with the work they did.. they are very friendly and does the job in a great way.. thanks again..'
  },
  {
    id: 7,
    name: 'ghanshyam kavani',
    initials: 'GK',
    role: 'Commercial Client',
    rating: '5.0',
    relativeTime: 'a year ago',
    content: 'Excellent quality and service! The precast boundary walls are durable, well-made, and installed with precision. Highly professional team and timely delivery. Very satisfied with SK Precast Industries'
  },
  {
    id: 8,
    name: 'Manish kumar sharma',
    initials: 'MS',
    role: 'Commercial Project Head',
    rating: '5.0',
    relativeTime: '4 months ago',
    content: 'We had a great experience working with SK Precast Walls. The quality of the precast wall materials supplied was excellent, and deliveries were made as committed. What truly sets them apart is their after-sales support. Even after completion of the supply, their team extended full cooperation for rework requirements and provided prompt assistance whenever needed. Their personal involvement, responsiveness, and commitment to customer satisfaction are highly appreciated. A reliable vendor with quality products and exceptional service. Highly recommended for anyone looking for precast wall solutions.'
  },
  {
    id: 9,
    name: 'Manoj yadav',
    initials: 'MY',
    role: 'Warehouse Project Owner',
    rating: '5.0',
    relativeTime: '11 months ago',
    statsText: '1 review · 1 photo',
    image: '/assets/Reviews/image-5.webp',
    imageCaption: 'Prestressed Boundary Wall for Warehouse by SK Precast Industries',
    content: 'I got a Prestressed Wall made for my warehouse. The finishing and strength are top-class. The team took care of every small detail. The price was fair for the quality provided. Very professional and trustworthy service.'
  }
];

export const testimonialsCol2 = [
  {
    id: 10,
    name: 'Bharat Gour',
    initials: 'BG',
    role: 'Farmhouse Owner, Faridabad',
    rating: '5.0',
    relativeTime: '7 months ago',
    content: 'We had a Precast Concrete Wall made for our farmhouse near Faridabad. The concrete quality is excellent, surface smooth, and alignment perfect. The entire project was completed before the promised date. Honest and hardworking team — totally satisfied!'
  },
  {
    id: 12,
    name: 'Arun Arun parihar',
    initials: 'AP',
    role: 'Farmhouse & Plot Owner, Haryana',
    rating: '5.0',
    relativeTime: '8 months ago',
    content: 'I got my farmhouse boundary wall done by SK Precast Industries Palwal, and I am extremely happy with their work. The precast RCC wall panels are smooth, uniform, and weather-resistant. Their engineers supervised everything carefully. It’s not only strong but also gives a very neat look to the property. Compared to brickwork, precast walls from SK Precast save time, money, and maintenance costs. Highly recommended for farmhouse and plot fencing anywhere in Haryana.'
  },
  {
    id: 13,
    name: 'Jitendra God',
    initials: 'JG',
    role: 'Commercial Boundary Client',
    rating: '5.0',
    relativeTime: '11 months ago',
    statsText: '1 review · 1 photo',
    image: '/assets/Reviews/image-3.webp',
    imageCaption: 'Precast RCC Readymade Wall Installation',
    content: 'I recently had a Precast RCC Readymade Wall installed by SK Precast Industries, and I am very impressed. The wall panels are strong, durable, and reinforced with steel bars, making them much sturdier than traditional brick walls. The installation was done quickly without any hassle. Highly recommended for precast boundary wall construction.'
  },
  {
    id: 14,
    name: 'Dishant',
    initials: 'DS',
    role: 'Plot Owner, Palwal',
    rating: '4.9',
    relativeTime: 'Verified Client',
    content: "I ordered a precast wall for my residential plot in Palwal from SK Precast Industries, and I'm very satisfied. The RCC panels are solid, well-finished and delivered on time. The installation was completed in just two days."
  },
  {
    id: 15,
    name: 'Arjun Kharol',
    initials: 'AK',
    role: 'Commercial Client, Delhi NCR',
    rating: '5.0',
    relativeTime: 'Verified Client',
    content: 'The owner of SK Precast, Vivek Patel, is exceptional in his dealings–polite, professional, and always ready with the right response. We had compound wall installation done smoothly without any hassle. Highly recommended for heavy-duty boundary wall solutions!'
  },
  {
    id: 16,
    name: 'Rakesh Ji',
    initials: 'RJ',
    role: 'Farmhouse Owner, Hodal',
    rating: '5.0',
    relativeTime: '11 months ago',
    statsText: '1 review · 1 photo',
    image: '/assets/Reviews/image-4.webp',
    imageCaption: 'Farmhouse Precast Compound Wall near Hodal, Haryana',
    content: 'We required a precast wall for our farmhouse near Hodal. SK Precast Industries provided professional service with high-quality RCC wall panels. The wall was installed quickly, and the finish is excellent. The precast compound wall gives a strong and modern look to the property. I strongly recommend SK Precast Industries for anyone in Hodal who wants a durable boundary wall or precast readymade wall at a reasonable cost.'
  },
  {
    id: 17,
    name: 'R Patel',
    initials: 'RP',
    role: 'Farmhouse Owner, Palwal',
    rating: '5.0',
    relativeTime: 'Verified Client',
    content: 'Best precast compound wall manufacturer in Palwal. We got 800 running feet of boundary wall installed for our farmhouse in under 4 days. Strong material, smooth finish, and economical pricing.'
  },
  {
    id: 18,
    name: 'Krishna Yadav',
    initials: 'KY',
    role: 'Factory Owner, Delhi NCR',
    rating: '5.0',
    relativeTime: '7 months ago',
    statsText: '2 reviews · 5 photos',
    content: 'I got a Precast Compound Wall built for my factory in Delhi NCR. The team arrived on time, worked very politely, and completed the job within two days. The quality is excellent — even after heavy rain, not a single crack appeared. Honest people and truly professional service!'
  },
  {
    id: 19,
    name: 'Shantosh Khaarol',
    initials: 'SK',
    role: 'Farmhouse Owner, Palwal',
    rating: '5.0',
    relativeTime: '7 months ago',
    statsText: '1 review',
    content: 'We ordered a Precast Readymade Boundary Wall for our farmhouse near Palwal. The material reached the site the same day, and the installation team finished the work perfectly. The owner personally visited the site — very committed and trustworthy service.'
  },
  {
    id: 20,
    name: 'Nasit Meet (K)',
    initials: 'NM',
    role: 'Plot Owner, Village Project',
    rating: '5.0',
    relativeTime: 'a year ago',
    statsText: '2 reviews',
    content: 'I had purchased a small plot in my village. Soon, thefts began, and I realized I needed a strong boundary wall. I contacted SK Precast Industries. The best part? They installed the entire precast compound wall in just 2 days. It’s been over a year, not a single panel has moved. Now people ask me, “Where did you get it from?” Truly a peace-giving experience.'
  },
  {
    id: 21,
    name: 'Kaluram Padihar',
    initials: 'KP',
    role: 'Satisfied Customer',
    rating: '5.0',
    relativeTime: '6 months ago',
    statsText: '1 review',
    content: 'We got a precast readymade wall installed by SK Precast Industries. Timely delivery, solid RCC slabs, and great finishing. Very satisfying service.'
  },
  {
    id: 22,
    name: 'Gordhan Bhatiya',
    initials: 'GB',
    role: 'Satisfied Customer',
    rating: '5.0',
    relativeTime: '7 months ago',
    statsText: '1 review',
    content: 'Good work and best quality sk precast good finishing'
  },
  {
    id: 23,
    name: 'Pankaj Sharma',
    initials: 'PS',
    role: 'Civil Infrastructure Client',
    rating: '5.0',
    relativeTime: 'a year ago',
    statsText: '2 reviews',
    content: 'Awesome experience with the firm... All the specifications were as per IS standard & quality, finishing was outstanding... Thanks to SK Industries'
  },
  {
    id: 24,
    name: 'Mansi Enterprises',
    initials: 'ME',
    role: 'Commercial Partner',
    rating: '5.0',
    relativeTime: '2 years ago',
    statsText: '1 review',
    content: 'Sk precast industries boundary wall bahut finsing sa Kam karta hai jis bhai ko karana hai yaha sa Kara Lana serve bhi bhaut acchi hai rate bhi or parito sa Kam hai'
  },
  {
    id: 25,
    name: 'Chandubhai Makwana',
    initials: 'CM',
    role: 'Contractor & Builder',
    rating: '5.0',
    relativeTime: '2 years ago',
    statsText: '2 reviews · 1 photo',
    image: '/assets/Reviews/image-6.webp',
    imageCaption: 'SK Precast Compound Wall Quality by Chandubhai Makwana',
    content: 'Great job done by Mr. Vivek Patel he was very professional & soft spoken. Quality of material is best as far as I know SK Precast is best in Compound Wall manufacturing.'
  },
  {
    id: 26,
    name: 'Rinay Nasit',
    initials: 'RN',
    role: 'Satisfied Customer',
    rating: '5.0',
    relativeTime: 'a year ago',
    content: 'SK Precast Industries is one of the best for precast compound walls. Their quality is excellent, and they complete the work on time. Their behavior is very good—they take care of the customer and are very cooperative. I am very satisfied with their work. Definitely recommend!'
  },
  {
    id: 27,
    name: 'sagar dagar',
    initials: 'SD',
    role: 'Satisfied Customer',
    rating: '5.0',
    relativeTime: '2 years ago',
    statsText: '2 reviews',
    content: 'SK Precast wall best quality products and they are providing such a good quality work at affordable price.'
  },
  {
    id: 28,
    name: 'Pravina Chauhan',
    initials: 'PC',
    role: 'Satisfied Customer',
    rating: '5.0',
    relativeTime: 'a year ago',
    statsText: '2 reviews',
    content: 'members are very loyal and Heard working .all workers are so and do work very perfectly 💪 , your team and your work very'
  },
  {
    id: 29,
    name: 'Koladiya Surbhi',
    initials: 'KS',
    role: 'Satisfied Customer',
    rating: '5.0',
    relativeTime: '2 years ago',
    statsText: '1 review',
    content: 'Material quality is superb, awesome intime service and value for money stay connect with this team'
  },
  {
    id: 30,
    name: 'Kishan Bhatti',
    initials: 'KB',
    role: 'Satisfied Customer',
    rating: '5.0',
    relativeTime: '2 years ago',
    statsText: '5 reviews',
    content: 'Exemplifying premium quality in every precast boundary wall!'
  },
  {
    id: 31,
    name: 'Aasharam Parajapat',
    initials: 'AP',
    role: 'Satisfied Customer',
    rating: '5.0',
    relativeTime: '2 years ago',
    statsText: '1 review',
    content: 'Experience premium quality boundary with SK Precast'
  },
  {
    id: 32,
    name: 'HK PRECAST',
    initials: 'HK',
    role: 'Sonipat Farmhouse Owner',
    rating: '5.0',
    relativeTime: '11 months ago',
    statsText: '2 reviews · 4 photos',
    image: '/assets/Reviews/image-8.webp',
    imageCaption: 'Precast Readymade Boundary Wall at Sonipat Farmhouse',
    content: 'We had SK Precast Industries install a precast readymade boundary wall at our Sonipat farmhouse. The RCC wall panels are extremely strong, uniform, and neatly finished. The installation process was quick and organized. The precast compound wall adds a premium look to the property and provides excellent security. Anyone in Sonipat or nearby areas seeking a durable precast wall should contact SK Precast Industries.'
  },
  {
    id: 33,
    name: 'Rakshu Baldha',
    initials: 'RB',
    role: 'Satisfied Customer',
    rating: '5.0',
    relativeTime: 'a year ago',
    statsText: '3 reviews · 13 photos',
    content: 'When I had to fence my land, it was rainy season. Labor wasn’t available, and I almost gave up. But SK Precast Industries said, "Our solution works even in rain." With cranes and panels, they finished the precast boundary wall in 3 days. I didn’t just save time — I learned that with the right people, you also get the right results.'
  },
  {
    id: 34,
    name: 'SHUKLA SHIVAGNA',
    initials: 'SS',
    role: 'Satisfied Customer',
    rating: '5.0',
    relativeTime: 'a year ago',
    statsText: '4 reviews',
    content: 'SK Precast Industries truly offers premium quality and timely service, ensuring secure and durable precast walls that exceed customer expectations and provide long-lasting benefits.'
  },
  {
    id: 35,
    name: 'Jitendra Nasit',
    initials: 'JN',
    role: 'Satisfied Customer',
    rating: '5.0',
    relativeTime: '2 years ago',
    statsText: '1 review',
    content: 'SK Precast Industries has a team of experienced staff who excel in crafting durable precast boundary walls.'
  },
  {
    id: 36,
    name: 'Rahul Boricha',
    initials: 'RB',
    role: 'Project Head',
    rating: '5.0',
    relativeTime: 'a year ago',
    statsText: '2 reviews · 4 photos',
    image: '/assets/Reviews/image-9.webp',
    imageCaption: 'Precast Boundary Wall Project by Rahul Boricha',
    content: 'SK Precast Industries truly offers premium quality timely service, ensuring secure and durable precast boundary walls that exceed customer expectations !'
  },
  {
    id: 37,
    name: 'vishal dabasara',
    initials: 'VD',
    role: 'Property Owner, Delhi NCR',
    rating: '5.0',
    relativeTime: '11 months ago',
    statsText: '3 reviews · 4 photos',
    content: 'SK Precast Industries delivered a top-quality compound wall for my property in Delhi NCR. The panels are strong, durable, and reinforced properly. The team was professional, punctual, and made sure everything was installed perfectly. I am extremely satisfied with the overall work and service.'
  },
  {
    id: 38,
    name: 'Jitendar Yadav',
    initials: 'JY',
    role: 'Commercial Site Owner, Haryana',
    rating: '5.0',
    relativeTime: '11 months ago',
    statsText: '2 reviews · 2 photos',
    image: '/assets/Reviews/image-10.webp',
    imageCaption: 'Precast Readymade Boundary Wall by Jitendar Yadav',
    content: 'We had SK Precast Industries install a precast readymade boundary wall at our site. The RCC panels are strong, uniform, and perfectly aligned. The installation was fast, and the finished wall looks clean, elegant, and highly durable. We explored designer precast options with decorative finishes, and the result was excellent. Compared to traditional brick walls, this solution saved us time and cost while giving a premium look. SK Precast Industries is the most reliable choice for anyone in Haryana or NCR needing a precast wall.'
  },
  {
    id: 39,
    name: 'Shankarlal Kharol',
    initials: 'SK',
    role: 'Folding Wall Client, Delhi',
    rating: '5.0',
    relativeTime: 'a year ago',
    statsText: '1 review · 3 photos',
    image: '/assets/Reviews/image-11.webp',
    imageCaption: 'Precast Folding Wall Installation in Delhi by Shankarlal Kharol',
    content: 'Sk precast solution best folding wall service provider in delhi. Good quality wall. Installation of Precast wall completed on time. I wish him very best.'
  },
  {
    id: 40,
    name: 'Deepak Saini',
    initials: 'DS',
    role: 'Farmhouse Owner, Khedi Kala Faridabad',
    rating: '5.0',
    relativeTime: 'a year ago',
    statsText: '2 reviews · 7 photos',
    content: 'SK Precast has boundaries visible in many places in Faridabad. I had seen the wall in Sector 80 with numbers written on site. I had work in Khedi Kala for a farmhouse precast wall, and the work was done with great precision and attention to detail. I sincerely thank you from the bottom of my heart.'
  },
  {
    id: 41,
    name: 'Vibhuti Suvagiya',
    initials: 'VS',
    role: 'Residential Plot Owner',
    rating: '5.0',
    relativeTime: '11 months ago',
    statsText: '1 review',
    content: 'There was empty space in front of our house. One night, some intruders broke what little fencing we had. I knew I had to secure it. SK Precast visited the site, brought the material next day, and in just 48 hours the precast compound wall stood strong. That space is now a peaceful family garden.'
  },
  {
    id: 42,
    name: 'Karan Lohina',
    initials: 'KL',
    role: 'Client, Palwal',
    rating: '5.0',
    relativeTime: 'a year ago',
    statsText: '2 reviews · 1 photo',
    image: '/assets/Reviews/image-12.webp',
    imageCaption: 'Precast Compound Wall in Palwal by Karan Lohina',
    content: 'Good service, the precast compound wall in Palwal looks robust and secure!'
  },
  {
    id: 43,
    name: 'Naiytik Dabasara',
    initials: 'ND',
    role: 'Property Owner',
    rating: '5.0',
    relativeTime: '11 months ago',
    statsText: '1 review',
    content: 'After installing the precast readymade wall, my property became safe and visually appealing. It’s a strong and weather-resistant wall.'
  },
  {
    id: 44,
    name: 'Jaydip Ribadiya',
    initials: 'JR',
    role: 'Satisfied Customer',
    rating: '5.0',
    relativeTime: '2 years ago',
    statsText: '2 reviews · 6 photos',
    content: "SK Precast Industries' commitment to delivering premium precast wall quality has made them a standout in Haryana's construction industry, especially in Palwal and Faridabad!"
  },
  {
    id: 45,
    name: 'Nirpa Koladiya',
    initials: 'NK',
    role: 'Satisfied Customer',
    rating: '5.0',
    relativeTime: '2 years ago',
    statsText: '1 review',
    content: "SK Precast Industries stands out as the premier choice for precast walls in Palwal and Faridabad, elevating Haryana's construction standards!"
  },
  {
    id: 46,
    name: 'Harshit Makwana',
    initials: 'HM',
    role: 'Satisfied Customer',
    rating: '5.0',
    relativeTime: '2 years ago',
    statsText: '1 review',
    content: "SK Precast Industries' precast walls are a testament to their commitment to excellence and customer satisfaction in Faridabad!"
  },
  {
    id: 47,
    name: 'Navaghan Gajera',
    initials: 'NG',
    role: 'Satisfied Customer, Palwal',
    rating: '5.0',
    relativeTime: '2 years ago',
    statsText: '1 review · 1 photo',
    image: '/assets/Reviews/image-13.webp',
    imageCaption: 'Precast Compound Wall by Navaghan Gajera',
    content: 'Polite professional comment: The precast compound walls in Palwal look robust and secure. SK Precast Industries has done an excellent job in highlighting their features and benefits.'
  },
  {
    id: 48,
    name: 'मुकेश राठोर',
    initials: 'MR',
    role: 'Satisfied Customer',
    rating: '5.0',
    relativeTime: 'a year ago',
    statsText: '1 review',
    content: '“Compared to others, your precast walls contain more steel and cement—I have seen this myself. Thank you, SK Precast.”'
  },
  {
    id: 49,
    name: 'Ashok Baghel',
    initials: 'AB',
    role: 'Satisfied Customer, Palwal',
    rating: '5.0',
    relativeTime: '11 months ago',
    statsText: '2 reviews · 1 photo',
    content: 'Best quality in precast boundary wall in palwal'
  },
  {
    id: 50,
    name: 'bhargav satasiya',
    initials: 'BS',
    role: 'Satisfied Customer, Palwal',
    rating: '5.0',
    relativeTime: '2 years ago',
    statsText: '2 reviews',
    content: 'Secure with strength and style Best precast compound walls in Palwal, quality and timely delivery'
  },
  {
    id: 51,
    name: 'Vipul Koladiya',
    initials: 'VK',
    role: 'Satisfied Customer, Palwal',
    rating: '5.0',
    relativeTime: '2 years ago',
    statsText: '1 review',
    content: 'Best precast compound walls in Palwal, great quality and timely delivery guaranteed'
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
