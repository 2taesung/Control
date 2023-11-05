import { lazy, Suspense } from 'react';
import styled from 'styled-components';

import { Apps } from '@src/types';

const componentMap = {
  hum: lazy(() => import('@/src/components/uc/UC_InstantContainer')),
  uc: lazy(() => import('@/src/components/uc/UC_InstantContainer')),
  ef: lazy(() => import('@/src/components/uc/UC_InstantContainer')),
};

export default function InstantContent({ currentApp }: { currentApp: Apps }) {
  const Component = componentMap[currentApp];

  if (!Component) {
    return <div>Invalid app type</div>;
  }

  return (
    <MainCardLayout className="div-flex-column">
      <Suspense fallback={false}>
        <Component currentApp={currentApp} />
      </Suspense>
    </MainCardLayout>
  );
}

const MainCardLayout = styled.div`
  justify-content: flex-start;
  background-color: #fff;
`;
