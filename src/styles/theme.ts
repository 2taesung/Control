import { DefaultTheme } from 'styled-components';

import {
  TypographyT,
  DefaultColorsT,
  DarkColorsT,
} from '@src/types/globalTheme';

/* 컬러, 사이즈 규격 figma 참조 */
export const typography: TypographyT = {
  size: {
    head_h1: '9.6rem',
    head_h2: '6rem',
    head_h3: '4.8rem',
    head_h4: '3.4rem',
    head_h5: '2.8rem',
    head_h6: '2.4rem',
    subTitle_sub1: '2rem',
    subTitle_sub2: '1.6rem',
    subTitle_sub3: '1.4rem',
    body_body1: '1.6rem',
    body_body2: '1.4rem',
    button_large: '1.6rem',
    button_medium: '1.4rem',
    label_large: '1.6rem',
    label_medium: '1.6rem',
    label_small: '1.4rem',
  },
} as const;

export const colors: DefaultColorsT = {
  background_bg1: '#f7f7f7',
  background_bg2: '#f2f2f2',
  background_bg3: '#ededed',
  background_ui: '#e8e8e8',
  background_opposite: '#333333',
  text_body: '#1a1a1a',
  text_opposite: '#ffffff',
  text_subTitle: '#4d4d4d',
  text_hint: '#999999',
  text_disable: '#bfbfbf',
  text_link: '#1973c2',
  text_primary: '#009e87',
  primary: '#009e87',
  secondary: '#66c5b7',
  border_divider: '#cccccc',
  border_uiBorder: '#e0e0e0',
  accent_warn: '#6256cd',
  accent_error: '#ff4f90',
} as const;

const darkThemeColors: DarkColorsT = {
  background_bg1: '#333333',
  background_bg2: '#f2f2f2',
  background_bg3: '#ededed',
  background_ui: '#e8e8e8',
  background_opposite: '#333333',
  text_body: '#ffffff',
  text_opposite: '#1a1a1a',
  text_subTitle: '#4d4d4d',
  text_hint: '#999999',
  text_disable: '#bfbfbf',
  text_link: '#1973c2',
  text_primary: '#009e87',
  primary: '#009e87',
  secondary: '#66c5b7',
  border_divider: '#cccccc',
  border_uiBorder: '#e0e0e0',
  accent_warn: '#6256cd',
  accent_error: '#ff4f90',
} as const;

/*
 * 기본 색상 theme -> ligth 모드용
 * */
export const defaultTheme: DefaultTheme = {
  colors,
  typography,
};

export const darkTheme: DefaultTheme = {
  colors: darkThemeColors,
  typography,
};

export type DefaultThemeT = typeof defaultTheme;
