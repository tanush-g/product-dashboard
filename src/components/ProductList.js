import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    console.log('Products received in ProductList:', products); // Debugging log
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <Link to={`/product/${product.id}`}>{product.title}</Link>
                </td>
                <td>{product.price}</td>
                <td>{product.popularity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;