import useSWR from 'swr';
import { useMemo } from 'react';

// Define a fetcher function using the Fetch API
const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('An error occurred while fetching data');
  }
  return response.json();
};

// Define your API endpoints here
const endpoints = {
  product: {
    list: '/api/products',        // Update with your actual endpoint
    details: '/api/products',     // Update with your actual endpoint
    search: '/api/products/search' // Update with your actual endpoint
  }
};

// ----------------------------------------------------------------------

// Hook to get all products
export function useGetProducts() {
  const URL = endpoints.product.list;

  const { data, error } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      products: data?.products || [],
      productsLoading: !data && !error,
      productsError: error,
      productsEmpty: !data || !data.products.length,
    }),
    [data, error]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

// Hook to get a single product by ID
export function useGetProduct(productId) {
  const URL = productId ? `${endpoints.product.details}/${productId}` : null;

  const { data, error } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      product: data?.product,
      productLoading: !data && !error,
      productError: error,
    }),
    [data, error]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

// Hook to search for products
export function useSearchProducts(query) {
  const URL = query ? `${endpoints.product.search}?query=${encodeURIComponent(query)}` : null;

  const { data, error } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: !data && !error,
      searchError: error,
      searchEmpty: !data || !data.results.length,
    }),
    [data, error]
  );

  return memoizedValue;
}
