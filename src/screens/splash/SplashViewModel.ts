import { useEffect, useState } from 'react';

/**
 * Splash ViewModel:
 * Pretends to load resources (e.g., fonts, API bootstrap) before showing Home.
 * Replace the timeout with real async setup for your app.
 */
export default function useSplashViewModel() {
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return { isReady };
}
