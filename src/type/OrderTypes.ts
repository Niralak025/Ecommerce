import { CartItem } from './CartTypes';

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
};

export interface Order {
  id: string;
  order_date: string;
  items: CartItem[];
  orderNumber: string;
  total_price: number;
}

export interface OrderState {
  orders: Order[];
}
