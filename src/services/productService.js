import axios from 'axios';

const API_URL = 'https://cors-anywhere.herokuapp.com/https://cdn.drcode.ai/interview-materials/products.json';

export const fetchProducts = async () => {
  try {
    console.log('Fetching products from API...'); // Debugging log
    const response = await axios.get(API_URL);
    console.log('API response:', response.data); // Debugging log
    return response.data;
  } catch (error) {
    console.error('Error fetching product data:', error); // Debugging log
    throw new Error('Error fetching product data');
  }
};