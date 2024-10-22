import createSlug from '../utils/createSlug';

export const fetchProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data.map((item) => ({
      ...item,
      slug: createSlug(item.title),
      displayPrice: item.price.toFixed(2),
    }));
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};
