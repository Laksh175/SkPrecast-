import React, { useEffect } from 'react';
import { Product } from '../components/products';

const ProductsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="w-full">
      <Product />
    </div>
  );
};

export default ProductsPage;
