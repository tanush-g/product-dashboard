import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Paper } from '@mui/material';

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Product not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box my={4}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h6" component="p">
            Price: {product.price}
          </Typography>
          <Typography variant="h6" component="p">
            Popularity: {product.popularity}
          </Typography>
          <Typography variant="body1" component="p">
            Description: {product.description || 'No description available'}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProductDetails;