import Link from 'next/link';
import { useRouter } from 'next/router';
import { styled } from 'styled-components';

import { HeaderLayout } from '@src/components/Layout/HeaderLayout';
import MUICard from '@src/components/MUICard';
import { APP_LIST, APPS_ROUTE_SUFFIX } from '@src/constants/APPS';
import { baseFlex } from '@src/styles/mixins';

export default function Apps() {
  const { query } = useRouter();
  const { site } = query;

  return (
    <HeaderLayout>
      <Layout>
        {APP_LIST.map(appName => {
          return (
            <Link
              href={{
                pathname: `${APPS_ROUTE_SUFFIX}${appName}`,
                query: { site, app: appName },
              }}
              key={appName}
            >
              <MUICard title={appName} />
            </Link>
          );
        })}
      </Layout>
    </HeaderLayout>
  );
}

const Layout = styled.div`
  ${baseFlex};
`;
