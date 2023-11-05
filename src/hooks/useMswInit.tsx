import { useState, useEffect } from 'react';

import { initBrowser } from '@src/mocks';

const NODE_ENV = process.env.NODE_ENV;

const isDevelopment = (mockingEnv?: string) => mockingEnv === 'development';

/**
 * msw 연결 시점 반환
 * */
export const useMswInit = () => {
  const [shouldRender, setShouldRender] = useState(!isDevelopment(NODE_ENV));

  useEffect(() => {
    const setup = async () => {
      await initBrowser();
      setShouldRender(true);
    };

    if (isDevelopment(NODE_ENV)) {
      setup();
    }
  }, []);

  return shouldRender;
};
