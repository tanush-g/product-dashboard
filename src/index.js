import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';
import App from './App';
import { ProductProvider } from './context/ProductContext';

const theme = createTheme();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ProductProvider>
      <App />
    </ProductProvider>
  </ThemeProvider>,
  document.getElementById('root')
);