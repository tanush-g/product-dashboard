import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const ProductList = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [popularityRange, setPopularityRange] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const productsPerPage = 20;

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterAndSortProducts(e.target.value, sortOption, priceRange, popularityRange);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
    filterAndSortProducts(searchTerm, e.target.value, priceRange, popularityRange);
  };

  const handlePriceRange = (e) => {
    setPriceRange(e.target.value);
    filterAndSortProducts(searchTerm, sortOption, e.target.value, popularityRange);
  };

  const handlePopularityRange = (e) => {
    setPopularityRange(e.target.value);
    filterAndSortProducts(searchTerm, sortOption, priceRange, e.target.value);
  };

  const filterAndSortProducts = (searchTerm, sortOption, priceRange, popularityRange) => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      filtered = filtered.filter((product) =>
        maxPrice ? product.price >= minPrice && product.price < maxPrice : product.price >= minPrice
      );
    }

    if (popularityRange) {
      const [minPopularity, maxPopularity] = popularityRange.split('-').map(Number);
      filtered = filtered.filter((product) =>
        maxPopularity ? product.popularity >= minPopularity && product.popularity < maxPopularity : product.popularity >= minPopularity
      );
    }

    if (sortOption === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'popularity-asc') {
      filtered.sort((a, b) => a.popularity - b.popularity);
    } else if (sortOption === 'popularity-desc') {
      filtered.sort((a, b) => b.popularity - a.popularity);
    }

    setFilteredProducts(filtered);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (event, value) => setCurrentPage(value);

  const handleClickOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product Dashboard
        </Typography>
        <TextField
          label="Search products..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          margin="normal"
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Sort By</InputLabel>
          <Select value={sortOption} onChange={handleSort} label="Sort By">
            <MenuItem value="">Sort By</MenuItem>
            <MenuItem value="price-asc">Price (Low to High)</MenuItem>
            <MenuItem value="price-desc">Price (High to Low)</MenuItem>
            <MenuItem value="popularity-asc">Popularity (Low to High)</MenuItem>
            <MenuItem value="popularity-desc">Popularity (High to Low)</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Price Range</InputLabel>
          <Select value={priceRange} onChange={handlePriceRange} label="Price Range">
            <MenuItem value="">All Prices</MenuItem>
            <MenuItem value="0-5000">0-5000</MenuItem>
            <MenuItem value="5000-10000">5000-10000</MenuItem>
            <MenuItem value="10000-20000">10000-20000</MenuItem>
            <MenuItem value="20000-">20000+</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Popularity Range</InputLabel>
          <Select value={popularityRange} onChange={handlePopularityRange} label="Popularity Range">
            <MenuItem value="">All Popularities</MenuItem>
            <MenuItem value="0-10000">0-10000</MenuItem>
            <MenuItem value="10000-30000">10000-30000</MenuItem>
            <MenuItem value="30000-50000">30000-50000</MenuItem>
            <MenuItem value="50000-">50000+</MenuItem>
          </Select>
        </FormControl>
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Popularity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <TableRow key={product.id} onClick={() => handleClickOpen(product)} style={{ cursor: 'pointer' }}>
                    <TableCell>
                      <Link to="#" onClick={(e) => e.preventDefault()}>{product.title}</Link>
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.popularity}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3">No products found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={Math.ceil(filteredProducts.length / productsPerPage)}
            page={currentPage}
            onChange={paginate}
            color="primary"
          />
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby="product-dialog-title">
        <DialogTitle id="product-dialog-title">{selectedProduct?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h6">Price: {selectedProduct?.price}</Typography>
            <Typography variant="h6">Popularity: {selectedProduct?.popularity}</Typography>
            <Typography variant="body1">Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductList;