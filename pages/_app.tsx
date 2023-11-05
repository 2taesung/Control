import type { ReactElement, ReactNode } from 'react';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { themeAtom } from '@src/atoms/themeAtom';
import { MainLayout } from '@src/components/Layout';
import { useMswInit } from '@src/hooks/useMswInit';
import { initServer } from '@src/mocks';
import GlobalStyle from '@src/styles/globalStyle';
import { defaultTheme, darkTheme } from '@src/styles/theme';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

initServer();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { suspense: true } },
      }),
  );
  const shouldRender = useMswInit();
  const isDefaultTheme = useAtomValue(themeAtom);

  const getLayout = Component.getLayout ?? (page => page);

  const currentTheme = isDefaultTheme ? defaultTheme : darkTheme;

  if (!shouldRender) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={currentTheme}>
          <GlobalStyle />
          <MainLayout>{getLayout(<Component {...pageProps} />)}</MainLayout>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
