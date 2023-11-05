import axios from 'axios';

import { PostControlValueParams, WsParams } from '@src/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getInstantValueData = async ({ app, site, sector }: WsParams) => {
  return await axios
    .get(`${BASE_URL}/${app}/device/machine?site=${site}&sector=${sector}`)
    .then(res => res.data);
};

export const postInstantValue = async ({
  app,
  data,
}: PostControlValueParams) => {
  return await axios
    .post(`${BASE_URL}/${app}/device/control/value`, data)
    .then(res => res.data);
};
