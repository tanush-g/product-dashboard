import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import { fetchProducts } from './services/productService';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log('Fetched products:', data); // Debugging log
        const productsArray = Object.values(data.products); // Convert products object to array
        setProducts(productsArray);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err); // Debugging log
        setError(err.message);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList products={products} />} />
        <Route path="/product/:id" element={<ProductDetails products={products} />} />
      </Routes>
    </Router>
  );
};

export default App;