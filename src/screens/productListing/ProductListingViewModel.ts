import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ApiService } from '../../api/ApiService';
import WSCall from '../../api/ApiClient';
import { setLoading } from '../../redux/appSlice';
import { Product } from '../../type/ProductTypes';

export const useProductListing = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const getProducts = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      setError(null);

      await new Promise<void>((resolve, reject) => {
        WSCall.getResponse(
          ApiService.GET_PRODUCTS,
          {},
          'get',
          (data: Product[], err: any) => {
            if (err) {
              console.error('Error fetching products:', err);
              setError('Failed to fetch products');
              reject(err);
              return;
            }
            setProducts(data || []);
            resolve();
          },
        );
      });
    } catch (err) {
      console.error('Error in fetchProducts:', err);
      setError('An error occurred while fetching products');
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const refreshProducts = useCallback(() => {
    return getProducts();
  }, [getProducts]);

  return {
    products,
    isLoading: products.length === 0 && !error,
    error,
    refreshProducts,
    getProducts,
  };
};
