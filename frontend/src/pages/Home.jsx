import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import HeroSection from '../components/Home/HeroSection';

const ProductRange = lazy(() => import('../components/Home/ProductRange'));
const ManufacturingUnitSlider = lazy(() => import('../components/Home/ManufacturingUnitSlider'));
const AboutSection = lazy(() => import('../components/Home/AboutSection'));
const PopularProducts = lazy(() => import('../components/Home/PopularProducts'));
const WhyChooseUs = lazy(() => import('../components/Home/WhyChooseUs'));
const Testimonials = lazy(() => import('../components/Home/Testimonials'));
const ContactSection = lazy(() => import('../components/Home/ContactSection'));

const LazySection = ({ children, minHeight = '280px' }) => {
  const hasHash = typeof window !== 'undefined' && Boolean(window.location.hash);
  const [isVisible, setIsVisible] = useState(hasHash);
  const ref = useRef(null);

  useEffect(() => {
    if (isVisible) return;
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? 'auto' : minHeight }}>
      {isVisible ? (
        <Suspense fallback={<div style={{ minHeight }} />}>
          {children}
        </Suspense>
      ) : null}
    </div>
  );
};

const Home = () => {
  return (
    <div className="w-full">
      {/* 0. Main Top Hero Section (Synchronous above-the-fold) */}
      <HeroSection />

      {/* 1. Product Range Section (Lazy loaded near-fold) */}
      <LazySection minHeight="420px">
        <ProductRange />
      </LazySection>

      {/* 2. Wall Manufacturing Unit Slider (Lazy loaded before entering viewport) */}
      <LazySection minHeight="360px">
        <ManufacturingUnitSlider />
      </LazySection>

      {/* 3. About Us Section */}
      <LazySection minHeight="450px">
        <AboutSection />
      </LazySection>

      {/* 4. Popular Products Section */}
      <LazySection minHeight="480px">
        <PopularProducts />
      </LazySection>

      {/* 5. Why Choose Us Section */}
      <LazySection minHeight="420px">
        <WhyChooseUs />
      </LazySection>

      {/* 6. Client Testimonials Section */}
      <LazySection minHeight="420px">
        <Testimonials />
      </LazySection>

      {/* 7. Contact Form Section */}
      <LazySection minHeight="500px">
        <ContactSection />
      </LazySection>
    </div>
  );
};

export default Home;
