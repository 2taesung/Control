import styled from 'styled-components';

import { baseFlex } from '@src/styles/mixins';

export const PageLayout = styled.div`
  ${baseFlex}

  flex-shrink: 0;
  align-content: flex-start;
  justify-content: center;

  min-height: 100vh;
  padding-bottom: 100px;

  background-color: rgba(237, 237, 237, 1);

  box-sizing: border-box;
`;

export const Wrapper = styled.section`
  width: 594px;
`;

export const FeatureSection = styled.section`
  width: 520px;
  height: 64px;
`;

export const ContentSection = styled.section`
  width: 1094px;
  margin-top: 10px;
`;

export const MonitoringPage = styled.div`
  align-items: flex-start;
  justify-content: space-between;

  width: 1200px;
`;

export const ControlPage = styled.div`
  align-items: flex-start;
  justify-content: space-between;

  width: 1200px;
`;

export const MonitoringSection = styled.section`
  width: 1194px;
  height: 436px;
  margin-top: 10px;
  border-radius: 4px;

  background-color: #ffffff;
`;

export const DetailSection = styled.section`
  margin-top: 20px;
`;
