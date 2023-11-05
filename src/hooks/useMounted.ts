import { useEffect, useState } from 'react';

/**
 * 렌더링 여부 반환
 * */
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};
