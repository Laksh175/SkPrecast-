import React from 'react';
import ProductDetailPageComponent from '../components/products/ProductDetailPage';

const ProductDetailPage = ({ slug }) => {
  return (
    <div className="w-full">
      <ProductDetailPageComponent slug={slug} />
    </div>
  );
};

export default ProductDetailPage;
