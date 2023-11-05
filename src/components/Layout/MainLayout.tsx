import Head from 'next/head';
import React from 'react';
import { styled } from 'styled-components';

type MainLayoutProps = {
  children: React.ReactNode;
};

/**
 * title과 배경 색상 밑 크기 조절용
 * */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>Control</title>
      </Head>
      <Layout>{children}</Layout>
    </>
  );
}

const Layout = styled.div`
  min-width: 100vw;
  min-height: 100vh;

  background-color: ${({ theme }) => theme.colors.background_bg1};
`;
