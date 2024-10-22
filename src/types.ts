export interface Product {
  id: number;
  title: string;
  price: number;
  displayPrice: string;
  description: string;
  category: string;
  image: string;
  slug: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}
