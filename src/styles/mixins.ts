import React from 'react';
import { css } from 'styled-components';

export type baseFlexT = React.CSSProperties;

export const baseFlex = css<baseFlexT>(
  ({
    flexDirection = 'row',
    justifyContent = 'center',
    alignItems = 'center',
    flexWrap = 'wrap',
  }) => ({
    display: 'flex',
    flexDirection,
    justifyContent,
    alignItems,
    flexWrap,
  }),
);

/*
 * w -> width
 * h -> height
 * */
export type whT = {
  w?: string;
  h?: string;
};

export const wh = css<whT>(({ w = 'auto', h = 'auto' }) => ({
  width: w,
  height: h,
}));
