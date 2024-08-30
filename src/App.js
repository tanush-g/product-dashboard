import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchProducts } from './services/productService';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log('Fetched products:', data); // Debugging log
        setProducts(data);
      } catch (error) {
        console.error('Error in useEffect:', error); // Debugging log
        setError(error.message);
      }
    };
    getProducts();
  }, []);

  return (
    <Router>
      <div className="App">
        {error && <div className="error">{error}</div>}
        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route path="/product/:id" element={<ProductDetails products={products} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;