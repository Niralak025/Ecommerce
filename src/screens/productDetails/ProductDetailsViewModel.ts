import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ApiService } from '../../api/ApiService';
import WSCall from '../../api/ApiClient';
import { setLoading } from '../../redux/appSlice';
import { Product } from '../../type/ProductTypes';

export const useProductDetails = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  return {
    products,
    isLoading: products.length === 0 && !error,
    error,
  };
};
