import { styled } from 'styled-components';

import { Apps } from '@src/types';

import InstantContent from '../control/InstantContent';

export default function InstantSection({ currentApp }: { currentApp: Apps }) {
  return (
    <SectionDiv>
      <MainSectionTitle>즉시제어</MainSectionTitle>
      <InstantContent currentApp={currentApp} />
    </SectionDiv>
  );
}

const SectionDiv = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 30px;

  background-color: #fff;
`;

const MainSectionTitle = styled.p`
  padding: 30px;

  background-color: #fff;

  color: rgba(96, 96, 96, 1);
  font-size: 20px;
`;
