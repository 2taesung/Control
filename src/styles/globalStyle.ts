import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
/* 스타일 컴포넌트 제공 노멀라이즈 css */
  ${normalize}
  body{
    font-family: Montserrat, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif !important;
  }

  *{
    box-sizing: border-box
  }

  html{
    /* overflow: hidden; */
    font-size: 10px;
  }
`;

export default GlobalStyle;
