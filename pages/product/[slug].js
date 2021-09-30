import React from 'react';
import { useRouter } from 'next/router';
import dataStore from '../../utils/data';

export default function ProductScreen() {
  const router = useRouter();
  const { slug } = router.query;
  const product = dataStore.products.find((a) => a.slug === slug);
  if (!product) {
    return (
      <div>
        <h1>Product Not Found</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>{product.name}</h1>
    </div>
  );
}
