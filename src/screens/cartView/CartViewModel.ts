import { useState } from 'react';

export default function useHomeViewModel() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  return {
    amount,
    loading,
  };
}
