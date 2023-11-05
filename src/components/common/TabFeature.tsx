import React from 'react';
import { styled } from 'styled-components';

import { TabKey } from '@src/types';

type TabFeatureProps = {
  setTabSelected: (value: TabKey) => void;
};

export default function TabFeature({ setTabSelected }: TabFeatureProps) {
  const isTabKey = (value: string): value is TabKey => {
    return value === 'control' || value === 'monitor';
  };

  const handleTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tabValue = e.currentTarget.innerText;

    if (isTabKey(tabValue)) {
      setTabSelected(tabValue);
    }
  };

  return (
    <FeatureSection>
      <button onClick={handleTab}>control</button>
      <button onClick={handleTab}>monitor</button>
    </FeatureSection>
  );
}

const FeatureSection = styled.section`
  width: 520px;
  height: 64px;
`;
