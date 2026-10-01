import React from 'react';
import {
  HeroSection,
  ProductRange,
  ManufacturingUnitSlider,
  AboutSection,
  PopularProducts,
  WhyChooseUs,
  Testimonials,
  ContactSection
} from '../components/Home';

const Home = () => {
  return (
    <div className="w-full">
      {/* 0. Main Top Hero Section */}
      <HeroSection />

      {/* 1. Product Range Section */}
      <ProductRange />

      {/* 2. Wall Manufacturing Unit Slider (Full width) */}
      <ManufacturingUnitSlider />

      {/* 3. About Us Section (Original Circular Orbital Layout) */}
      <AboutSection />

      {/* 4. Popular Products Section (3 per row, 6 initial + Load More) */}
      <PopularProducts />

      {/* 5. Why Choose Us Section (Connected Staggered Floating Cards) */}
      <WhyChooseUs />

      {/* 6. Client Testimonials Section (Dual-Column Vertical Scrolling + Initials Avatar) */}
      <Testimonials />

      {/* 7. Contact Form Section (Split Layout with Wall Image & Verified Product Dropdown) */}
      <ContactSection />
    </div>
  );
};

export default Home;
