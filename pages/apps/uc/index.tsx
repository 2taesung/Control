import React, { useState } from 'react';

import SectorList from '@src/components/common/SectorList';
import TabFeature from '@src/components/common/TabFeature';
import { HeaderLayout } from '@src/components/Layout';
import * as Styled from '@src/components/Layout/styled/ControlMonitoring.style';
import MainSection from '@src/components/uc/MainSection';
import { TabKey } from '@src/types';

type ContentSectionType = {
  [key in TabKey]: JSX.Element;
};

const contentSection: ContentSectionType = {
  control: (
    <Styled.ControlPage>
      <MainSection />
    </Styled.ControlPage>
  ),
  monitor: <Styled.MonitoringPage>monitoring</Styled.MonitoringPage>,
};

export default function UC() {
  const [tabSelected, setTabSelected] = useState<TabKey>('control');

  return (
    <HeaderLayout>
      <SectorList />
      <Styled.PageLayout>
        <Styled.Wrapper>
          <TabFeature setTabSelected={setTabSelected} />
          <Styled.ContentSection>
            {contentSection[tabSelected]}
          </Styled.ContentSection>
        </Styled.Wrapper>
      </Styled.PageLayout>
    </HeaderLayout>
  );
}
