export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  description: string;
}

export interface CartState {
  cartItems: CartItem[];
  totalAmount: number;
  totalItems: number;
}
