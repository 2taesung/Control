import { SITE_DISPLAY } from '@src/constants/display/SITE_DISPLAY';

export type Sites = keyof typeof SITE_DISPLAY;

export type SiteAuthorityT = {
  [key in Sites]: boolean;
};

type SiteInfo = {
  kr: '명동';
  en: 'Myeongdong';
  location: string;
};

export type SiteData = {
  md: SiteInfo;
};
