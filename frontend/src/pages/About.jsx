import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AboutHeroBanner, AboutContentSection } from '../components/About';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 16,
    filter: 'blur(6px)'
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.15
    }
  }
};

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="w-full"
    >
      {/* 1. About Hero Banner with Breadcrumbs */}
      <AboutHeroBanner />

      {/* 2. Full About Us Content Section */}
      <AboutContentSection />
    </motion.div>
  );
};

export default About;
