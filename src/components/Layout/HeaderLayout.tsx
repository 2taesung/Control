import React from 'react';
import { styled } from 'styled-components';

import { baseFlex } from '@src/styles/mixins';

import MUIHeader from './MUIHeader';

type ListLayoutProps = {
  children: React.ReactNode;
};

export function HeaderLayout({ children }: ListLayoutProps) {
  return (
    <>
      <MUIHeader />
      <Layout>{children}</Layout>
    </>
  );
}

const Layout = styled.div`
  ${baseFlex}

  flex-wrap: wrap;
  align-items: flex-start;
  position: relative;
  top: 64px;

  height: 100vh;
`;
