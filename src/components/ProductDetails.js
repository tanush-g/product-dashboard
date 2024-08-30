import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>Price: {product.price}</p>
      <p>Popularity: {product.popularity}</p>
      <p>Description: {product.description || 'No description available'}</p>
    </div>
  );
};

export default ProductDetails;