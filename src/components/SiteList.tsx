import Link from 'next/link';
import { styled } from 'styled-components';

import { baseFlex } from '@src/styles/mixins';

import MUICard from './MUICard';

export default function SiteList() {
  const siteNames = ['md'];

  return (
    <Layout>
      {siteNames.map(siteName => {
        return (
          <Link
            href={{
              pathname: '/apps',
              query: { site: siteName },
            }}
            key={siteName}
          >
            <MUICard title={siteName} />
          </Link>
        );
      })}
    </Layout>
  );
}

const Layout = styled.div`
  ${baseFlex};
`;
