import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container, CircularProgress, Typography, Box } from '@mui/material';
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
        const productsArray = Object.values(data.products); // Convert products object to array
        setProducts(productsArray);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <Container>
        <CssBaseline />
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <CssBaseline />
        <Typography variant="h4" component="h1" gutterBottom>
          Error: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<ProductList products={products} />} />
        <Route path="/product/:id" element={<ProductDetails products={products} />} />
      </Routes>
    </Router>
  );
};

export default App;