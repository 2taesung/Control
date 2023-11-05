import React from 'react';
import styled from 'styled-components';

import MUIHeader from '@src/components/Layout/MUIHeader';
import { baseFlex, wh } from '@src/styles/mixins';

import type { baseFlexT, whT } from '@src/styles/mixins';

type MonitorLayoutProps = {
  children: React.ReactNode;
};

export function MonitorLayout({ children }: MonitorLayoutProps) {
  return (
    <Layout
      justifyContent="flex-start"
      alignItems="flex-start"
      w="100vw"
      h="100vh"
    >
      <MUIHeader />
      {children}
    </Layout>
  );
}

const Layout = styled.div<baseFlexT & whT>`
  ${baseFlex}
  ${wh}
  flex-direction: column;
  max-width: 100vw;
  max-height: 100vh;
  padding: 40px;

  background-color: ${({ theme }) => theme.colors.background_bg1};
`;
