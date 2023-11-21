import axios from 'axios';

import { Apps, WsParams } from '@src/types';
import { PostScheduleDataParamDataT } from '@src/types/schedule';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getScheduleData = async ({ app, site, sector }: WsParams) => {
  return await axios
    .get(`${BASE_URL}/${app}/device/schedule?site=${site}&sector=${sector}`)
    .then(res => res.data);
};

type PostScheduleDataParam = {
  app: Apps;
  data: PostScheduleDataParamDataT;
};

export const postScheduleData = async ({
  app,
  data,
}: PostScheduleDataParam) => {
  return await axios
    .post(`${BASE_URL}/${app}/device/control/schedule`, data)
    .then(res => res.data);
};
