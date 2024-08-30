import axios from 'axios';

const API_URL = 'https://cdn.drcode.ai/interview-materials/products.json';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching product data');
  }
};