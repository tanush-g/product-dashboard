import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
    };
    getProducts();
  }, []);

  return (
    <Router>
      <div className="App">
        {error && <div className="error">{error}</div>}
        <Switch>
          <Route path="/" exact>
            <ProductList products={products} />
          </Route>
          <Route path="/product/:id" component={ProductDetails} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;